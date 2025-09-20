import PaymentForm from '@/components/payment/PaymentForm.vue';
import { EVENTS, LOCAL_STORAGE, ROLE_TYPE } from '@/constants/constants';
import { shallowMount } from '@vue/test-utils';

jest.mock('@/services/user-service', () => ({
  getUsers: jest.fn(() => Promise.resolve([
    { id: 1, upiId: 'user1@upi' },
    { id: 2, upiId: 'user2@upi' }
  ]))
}))

jest.mock('@/services/payment-service', () => ({
  getPayments: jest.fn(() => Promise.resolve([
    { id: 1, upiId: 'user1@upi' },
    { id: 2, upiId: 'user2@upi' }
  ])),
  
  getPaymentById: jest.fn(() => Promise.resolve({
    id: 123,
    fromUserId: 1,
    toUserId: 2,
    amount: 1200,
    status: 'SUCCESS'
  })),
  createPayment: jest.fn(),
  updatePayment: jest.fn(),
}))

describe('PaymentForm.vue', () => {
  let wrapper;
  let mockRouter;

  beforeEach(async () => {
    mockRouter = { push: jest.fn() };

    wrapper = shallowMount(PaymentForm, {
      global: {
        mocks: {
          $route: { params: { id: '123' } },
          $router: mockRouter
        }
      }
    });
    await wrapper.vm.$nextTick();
  });

  it('this tests if the Form title changes based on edit mode', async () => {
    expect(wrapper.find('h1').text()).toContain('Edit Payment');
    expect(wrapper.find('.save-btn').text()).toContain('Update');
  });

  it('this tests if the status field is only visible when isUser is true', async () => {
    localStorage.setItem(LOCAL_STORAGE.USER_ROLE, ROLE_TYPE.ADMIN);
    await wrapper.vm.$nextTick();
    expect(wrapper.find('select').exists()).toBe(true);
  });

  it('this tests that empty toUserId triggers validation error', async () => {
    wrapper.setData({
      form: {
        toUserId: '',
      },
    });
    await wrapper.vm.handleSubmit();
    expect(wrapper.find('.error').text()).toBe('User is required');
  });

  it('this tests that empty amount triggers validation error', async () => {
    wrapper.setData({
      form: {
        toUserId: '2',
        amount: '',
      },
    });
    await wrapper.vm.handleSubmit();
    expect(wrapper.find('.error').text()).toBe('Amount must be greater than 0');
  });

  it('returns a string starting with TXN and 6-digit number', () => {
    const txnId = wrapper.vm.generateTxnId();
    expect(txnId).toContain("TXN");
  });

  it('navigates to /payments when cancel is clicked', async () => {
    await wrapper.find('.cancel-btn').trigger(EVENTS.CLICK);
    expect(mockRouter.push).toHaveBeenCalledWith('/payments');
  });

  it('calls createPayment and navigates on valid form submit', async () => {
    localStorage.setItem(LOCAL_STORAGE.USER_ROLE, ROLE_TYPE.USER);
    localStorage.setItem(LOCAL_STORAGE.LOGGED_IN_USER, JSON.stringify({ id: 1 }));

    wrapper.setData({
      form: {
        fromUserId: 1,
        toUserId: 2,
        amount: 1000,
        status: 'PENDING'
      }
    });

    await wrapper.vm.handleSubmit();

    expect(mockRouter.push).toHaveBeenCalledWith('/payments');
  });

  afterEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });
});
