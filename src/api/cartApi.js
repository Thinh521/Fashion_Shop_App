import axios from 'axios';

const api = axios.create({
  baseURL: 'https://dummyjson.com',
});

export const fetchCartByUserId = async userId => {
  try {
    const res = await api.get('carts');
    const carts = res.data.carts;

    const userCart = carts.find(cart => cart.userId === userId);

    return userCart;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Failed to fetch cart data',
    );
  }
};

export const updateCartItemInApi = async (userId, variantId, quantity) => {
  try {
    const response = await api.put(`carts/${userId}/products/${variantId}`, {
      quantity,
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Failed to update cart item',
    );
  }
};

export const deleteCartItemInApi = async (userId, variantId) => {
  try {
    const response = await api.delete(`carts/${userId}/products/${variantId}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Failed to delete cart item',
    );
  }
};
