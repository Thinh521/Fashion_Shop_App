import axios from 'axios';

const api = axios.create({
  baseURL: 'https://dummyjson.com',
});

export const fetchProducts = async ({pageParam = 1}) => {
  try {
    const limit = 10;
    const skip = (pageParam - 1) * limit;
    const res = await api.get(`/products?limit=${limit}&skip=${skip}`);

    const products = res.data.products;
    const total = res.data.total;
    const maxProducts = 50;
    const hasMore = pageParam * limit < Math.min(total, maxProducts);

    console.log(`Page ${pageParam}:`, products);

    return {
      products,
      nextPage: hasMore ? pageParam + 1 : undefined,
    };
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Failed to fetch products',
    );
  }
};

export const fetchProductsDetail = async id => {
  try {
    const res = await api.get(`/products/${id}`);
    return res.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Failed to fetch products detail',
    );
  }
};

export const fetchProductsByCategory = async slug => {
  try {
    const res = await api.get(`/products/category/${slug}`);
    return res.data.products;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Failed to fetch products category ',
    );
  }
};
