import { shallowMount } from '@vue/test-utils'
import UserForm from '@/components/user/UserForm.vue'
import flushPromises from 'flush-promises'

jest.mock('@/services/data-service', () => ({
  getUsers: jest.fn(() => Promise.resolve([{ id: 1 }])),
  createUser: jest.fn(() => Promise.resolve())
}))

import { getUsers, createUser } from '@/services/data-service'

describe('UserForm.vue', () => {
  let mockRouter

  beforeEach(() => {
    mockRouter = { push: jest.fn() }
    jest.clearAllMocks()
  })

  it('shows validation errors when required fields are empty', async () => {
    const wrapper = shallowMount(UserForm, {
      global: { mocks: { $router: mockRouter, $route: { params: {} } } }
    })

    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.vm.errors.name).toBe('Name is required')
    expect(wrapper.vm.errors.email).toBe('Invalid email')
    expect(wrapper.vm.errors.upiId).toBe('UPI Id is required')
    expect(wrapper.vm.errors.password).toBe('Invalid password')
  })

  it('calls createUser and navigates on valid form submit', async () => {
    const wrapper = shallowMount(UserForm, {
      global: { mocks: { $router: mockRouter, $route: { params: {} } } }
    })

    await wrapper.setData({
      form: {
        name: 'Nikil',
        email: 'nikil@test.com',
        upiId: 'nikil@upi',
        password: '12345'
      }
    })

    await wrapper.find('form').trigger('submit.prevent')
    await flushPromises()

    expect(getUsers).toHaveBeenCalled()
    expect(createUser).toHaveBeenCalledWith({
      id: 2, 
      name: 'Nikil',
      email: 'nikil@test.com',
      upiId: 'nikil@upi',
      password: '12345'
    })
    expect(mockRouter.push).toHaveBeenCalledWith('/users')
  })
})
