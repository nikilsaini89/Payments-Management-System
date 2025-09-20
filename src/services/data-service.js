import axios from 'axios';


const BASE_URL = 'http://localhost:3000'

// ---------------- USERS ----------------
export const getUsers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/users`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

export const getUserById = async (id) => {
  try {
    const res = await axios.get(`${BASE_URL}/users/${id}`);
    return res.data;
  } catch (error) {
    console.error(`Error fetching user with id ${id}:`, error);
    return null;
  }
};

export const createUser = async (user) => {
  try {
    const res = await axios.post(`${BASE_URL}/users`, user);
    return res.data;
  } catch (error) {
    console.error("Error creating user:", error);
    return null;
  }
};

export const updateUser = async (id, user) => {
  try {
    const res = await axios.put(`${BASE_URL}/users/${id}`, user);
    return res.data;
  } catch (error) {
    console.error(`Error updating user with id ${id}:`, error);
    return null;
  }
};

// ---------------- PAYMENTS ----------------
export const getPayments = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/payments`);
    return res.data;
  } catch (error) {
    console.error("Error fetching payments:", error);
    return [];
  }
};

export const getPaymentById = async (id) => {
  try {
    const res = await axios.get(`${BASE_URL}/payments/${id}`);
    return res.data;
  } catch (error) {
    console.error(`Error fetching payment with id ${id}:`, error);
    return null;
  }
};

export const createPayment = async (payment) => {
  try {
    const res = await axios.post(`${BASE_URL}/payments`, payment);
    return res.data;
  } catch (error) {
    console.error("Error creating payment:", error);
    return null;
  }
};

export const updatePayment = async (id, payment) => {
  try {
    const res = await axios.put(`${BASE_URL}/payments/${id}`, payment);
    return res.data;
  } catch (error) {
    console.error(`Error updating payment with id ${id}:`, error);
    return null;
  }
};