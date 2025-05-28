import axios from 'axios';

const api = axios.create({
  baseURL: 'https://dummyjson.com',
});

export const fetchUsers = async () => {
  try {
    const res = await api.get('/users');
    return res.data.users;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch users');
  }
};
