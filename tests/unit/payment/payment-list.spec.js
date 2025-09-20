import PaymentList from "@/components/payment/PaymentList.vue"
import { mount } from "@vue/test-utils"
import { LOCAL_STORAGE, ROLE_TYPE } from '@/constants/constants'

jest.mock('@/services/data-service', () => ({
  getPayments: jest.fn(() => Promise.resolve([
    { id: 1, fromUserId: 1, toUserId: 2, amount: 100, status: 'SUCCESS' }
  ])),
  getUsers: jest.fn(() => Promise.resolve([
    { id: 1, name: 'User 1', upiId: 'user1@upi' },
    { id: 2, name: 'User 2', upiId: 'user2@upi' }
  ]))
}))

describe('PaymentList.vue - Simple Tests', () => {
  let wrapper

  beforeEach(async () => {
    localStorage.setItem(LOCAL_STORAGE.USER_ROLE, ROLE_TYPE.USER)
    localStorage.setItem(LOCAL_STORAGE.LOGGED_IN_USER, JSON.stringify({
        id: 1,
        name: 'User 1',
        upiId: 'user1@upi'
    }))
    wrapper = mount(PaymentList, {
      global: { mocks: { $router: { push: jest.fn() } } }
    })
    await wrapper.vm.$nextTick()
  })

  it('shows create button for USER role', () => {
    expect(wrapper.find('.create-btn').exists()).toBe(true)
    expect(wrapper.find('.create-btn').text()).toContain('+ Create Payment')
  })


  it('renders the header title', () => {
    expect(wrapper.find('h1').text()).toBe('Payments List');
  });


  it('does not show update button for USER role', () => {
    expect(wrapper.find('.update-btn').exists()).toBe(false);
  });

  it('renders table row for a payment', () => {
    const row = wrapper.find('tbody tr');
    expect(row.exists()).toBe(true);
    expect(row.text()).toContain('User 1');
    expect(row.text()).toContain('User 2');
    expect(row.text()).toContain('SUCCESS');
    expect(row.text()).toContain('Rs. 100');
  });
})
