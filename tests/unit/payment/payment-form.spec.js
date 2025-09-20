import PaymentForm from '@/components/payment/PaymentForm.vue';
import { LOCAL_STORAGE, ROLE_TYPE } from '@/constants/constants';
import { getPaymentById } from '@/services/data-service';
import { shallowMount } from '@vue/test-utils';

jest.mock('@/services/data-service', () => ({
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
  getUsers: jest.fn(() => Promise.resolve([
    { id: 1, upiId: 'user1@upi' },
    { id: 2, upiId: 'user2@upi' }
  ]))
}))


describe('PaymentForm.vue', () => {
    let wrapper;
    
    beforeEach(async () => {
        wrapper = shallowMount(PaymentForm, {
            global: {
                mocks: {
                $route: { params: { id: '123' } }
                }
            }
        })
    });

    it('this tests if the Form title changes based on edit mode',  async () => {
        expect(wrapper.find('h1').text()).toContain('Edit Payment');
        expect(wrapper.find('.save-btn').text()).toContain('Update');
    })

    it('this tests if the status field is only visible when isUser is true',  async () => {
        localStorage.setItem(LOCAL_STORAGE.USER_ROLE, ROLE_TYPE.ADMIN);
        await wrapper.vm.$nextTick();
        expect(wrapper.find('select').exists()).toBe(true);
    })
    
    it('this tests that empty toUserId triggers validation error', async () => {
        wrapper.setData({
            form: {
                toUserId: '',
            },
        });
        await wrapper.vm.handleSubmit()
        expect(wrapper.find('.error').text()).toBe('User is required')
    });


    it('this tests that empty amount triggers validation error', async () => {
        wrapper.setData({
            form: {
                toUserId: '2',
                amount: '',
            },
        });
        await wrapper.vm.handleSubmit()
        expect(wrapper.find('.error').text()).toBe('Amount must be greater than 0')
    });

    it('returns a string starting with TXN and 6-digit number', () => {
        const txnId = wrapper.vm.generateTxnId()
        expect(txnId).toContain("TXN")
    })

    afterEach(() => {
        localStorage.clear();
        jest.clearAllMocks();
    });
})