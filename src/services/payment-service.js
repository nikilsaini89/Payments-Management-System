import { BASE_URL } from '@/constants/constants';
import axios from 'axios';

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