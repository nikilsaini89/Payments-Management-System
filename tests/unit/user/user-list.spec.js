import { shallowMount } from '@vue/test-utils'
import UserList from '@/components/user/UserList.vue'

jest.mock('@/services/data-service', () => ({
  getUsers: jest.fn(() =>
    Promise.resolve([
      { id: 1, name: 'Nikil', email: 'nikil@mail.com', upiId: 'nikil@upi' },
      { id: 2, name: 'Harsh', email: 'harsh@mail.com', upiId: 'harsh@upi' }
    ])
  )
}))

describe('UserList.vue', () => {
  let mockRouter

  beforeEach(() => {
    mockRouter = { push: jest.fn() }
  })

  it('renders users from getUsers in the table', async () => {
    const wrapper = shallowMount(UserList, {
      global: { mocks: { $router: mockRouter } }
    })

    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()

    const rows = wrapper.findAll('tbody tr')
    expect(rows).toHaveLength(2)

    expect(rows[0].text()).toContain('Nikil')
    expect(rows[0].text()).toContain('nikil@mail.com')
    expect(rows[0].text()).toContain('nikil@upi')

    expect(rows[1].text()).toContain('Harsh')
    expect(rows[1].text()).toContain('harsh@mail.com')
    expect(rows[1].text()).toContain('harsh@upi')
  })

  it('navigates to /users/new when Add User button is clicked', async () => {
    const wrapper = shallowMount(UserList, {
      global: { mocks: { $router: mockRouter } }
    })

    await wrapper.find('.add-btn').trigger('click')

    expect(mockRouter.push).toHaveBeenCalledWith('/users/new')
  })
})
