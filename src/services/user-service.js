import { BASE_URL } from '@/constants/constants';
import axios from 'axios';

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

export const deleteUserById = async (id) => {
  try {
    const res = await axios.delete(`${BASE_URL}/users/${id}`);
    return res.data;
  } catch (error) {
    console.error(`Error deleting user with id ${id}:`, error);
    return null;
  }
};