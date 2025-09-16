// src/services/dataService.js
import axios from 'axios'

const API_URL = 'http://localhost:3000'

// ---------------- USERS ----------------
export const getUsers = async () => {
  const res = await axios.get(`${API_URL}/users`)
  return res.data
}

export const getUserById = async (id) => {
  const res = await axios.get(`${API_URL}/users/${id}`)
  return res.data
}

export const createUser = async (user) => {
  const res = await axios.post(`${API_URL}/users`, user)
  return res.data
}

export const updateUser = async (id, user) => {
  const res = await axios.put(`${API_URL}/users/${id}`, user)
  return res.data
}

// ---------------- PAYMENTS ----------------
export const getPayments = async () => {
  const res = await axios.get(`${API_URL}/payments`)
  return res.data
}

export const getPaymentById = async (id) => {
  const res = await axios.get(`${API_URL}/payments/${id}`)
  return res.data
}

export const createPayment = async (payment) => {
  const res = await axios.post(`${API_URL}/payments`, payment)
  return res.data
}

export const updatePayment = async (id, payment) => {
  const res = await axios.put(`${API_URL}/payments/${id}`, payment)
  return res.data
}
