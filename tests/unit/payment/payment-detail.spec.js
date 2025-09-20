import { shallowMount } from '@vue/test-utils'
import PaymentDetail from '@/components/payment/PaymentDetail.vue'
import { LOCAL_STORAGE } from '@/constants/constants'
import flushPromises from 'flush-promises'

jest.mock('@/services/user-service', () => ({
  getUsers: jest.fn(() => Promise.resolve([
    { id: 1, upiId: 'user1@upi' },
    { id: 2, upiId: 'user2@upi' }
  ]))
}))

describe('PaymentDetail.vue', () => {
  afterEach(() => {
    localStorage.clear()
  })

  it('renders payment details when localStorage has data', async () => {
    const mockPayment = {
      id: '201',
      fromUserId: 1,
      toUserId: 2,
      amount: 1200,
      status: 'SUCCESS',
      method: 'UPI',
      referenceId: 'TXN201001',
      timestamp: '2025-08-01T12:30:00Z'
    }

    localStorage.setItem(LOCAL_STORAGE.SELECTED_PAYMENT, JSON.stringify(mockPayment))

    const wrapper = shallowMount(PaymentDetail)
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.payment-detail').exists()).toBe(true)
    expect(wrapper.text()).toContain('Payment Details')
    expect(wrapper.text()).toContain('₹1200')
    expect(wrapper.text()).toContain('SUCCESS')
    expect(wrapper.find('.no-data').exists()).toBe(false)
  })

  it('shows no-data message when no payment details in localStorage', () => {
    const wrapper = shallowMount(PaymentDetail)
    expect(wrapper.find('.no-data').exists()).toBe(true)
    expect(wrapper.text()).toContain('No payment details found.')
  })

  it('displays correct UPI IDs for fromUserId and toUserId', async () => {
    const mockPayment = {
      id: '202',
      fromUserId: 1,
      toUserId: 2,
      amount: 500,
      status: 'PENDING',
      method: 'CARD',
      referenceId: 'TXN202001',
      timestamp: '2025-08-02T10:00:00Z'
    }

    localStorage.setItem(LOCAL_STORAGE.SELECTED_PAYMENT, JSON.stringify(mockPayment))

    const wrapper = shallowMount(PaymentDetail)
    await flushPromises()

    const rows = wrapper.findAll('.detail-row .value')
    expect(rows.at(1).text()).toBe('user1@upi') 
    expect(rows.at(2).text()).toBe('user2@upi') 
  })

  it('applies correct CSS class for payment status', async () => {
    const mockPayment = {
      id: '203',
      fromUserId: 1,
      toUserId: 2,
      amount: 900,
      status: 'FAILED',
      method: 'NETBANKING',
      referenceId: 'TXN203001',
      timestamp: '2025-08-03T14:00:00Z'
    }

    localStorage.setItem(LOCAL_STORAGE.SELECTED_PAYMENT, JSON.stringify(mockPayment))

    const wrapper = shallowMount(PaymentDetail)

    const statusElement = wrapper.find('.detail-row .value.failed')
    expect(statusElement.exists()).toBe(true)
    expect(statusElement.text()).toBe('FAILED')
  })
})
