import axios from 'axios';

const api = axios.create({
  baseURL: 'https://dummyjson.com',
});

export const fetchProducts = async () => {
  try {
    const res = await api.get('/products');
    return res.data.products;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Failed to fetch products',
    );
  }
};
