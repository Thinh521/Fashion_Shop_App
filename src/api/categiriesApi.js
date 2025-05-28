import axios from 'axios';

const api = axios.create({
  baseURL: 'https://dummyjson.com',
});

export const fetchCategories = async () => {
  try {
    const res = await api.get('/product/categories');
    return res.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Failed to fetch categories',
    );
  }
};
