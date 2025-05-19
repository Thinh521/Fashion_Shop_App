import {MMKV} from 'react-native-mmkv';

export const storage = new MMKV();

// ------------------------------------------------------------------------
// Hàm tiện ích để set onboarding
export const setBool = (key, value) => {
  storage.set(key, value);
};

export const getBool = key => {
  return storage.getBoolean(key);
};

// ------------------------------------------------------------------------
// Lấy danh sách tất cả user
export const getAllUsers = () => {
  const usersData = storage.getString('users');
  return usersData ? JSON.parse(usersData) : [];
};

// Lưu toàn bộ danh sách users
export const saveAllUsers = users => {
  storage.set('users', JSON.stringify(users));
};

// Thêm một user mới vào danh sách
export const addUser = newUser => {
  const users = getAllUsers();
  users.push(newUser);
  saveAllUsers(users);
};

// Lấy user đang đăng nhập hiện tại
export const getCurrentUser = () => {
  const userData = storage.getString('currentUser');
  return userData ? JSON.parse(userData) : null;
};

// Lưu user hiện tại
export const saveCurrentUser = user => {
  storage.set('currentUser', JSON.stringify(user));
};

// Lấy userId hiện tại
export const getCurrentUserId = () => {
  const currentUser = getCurrentUser();
  return currentUser?.id || '';
};

// Xoá user hiện tại (khi logout)
export const clearCurrentUser = () => {
  storage.delete('currentUser');
};

// ------------------------------------------------------------------------
// Tạo key riêng cho từng user
const getWishlistKey = userId => `wishlist_${userId}`;

// Lấy dữ liệu wishlist
export const getWishList = userId => {
  const key = getWishlistKey(userId);
  const data = storage.getString(key);
  return data ? JSON.parse(data) : [];
};

// Lưu dữ liệu wishlist
export const saveWishList = (userId, wishlist) => {
  const key = getWishlistKey(userId);
  storage.set(key, JSON.stringify(wishlist));
};

// ------------------------------------------------------------------------
// Tạo key riêng cho từng user
export const getCartKey = userId => `cart_${userId}`;

// Lấy dữ liệu cart
export const getCart = userId => {
  const key = getCartKey(userId);
  const data = storage.getString(key);
  return data ? JSON.parse(data) : [];
};

// Lưu dữ liệu cart
export const saveCart = (userId, cartItems) => {
  const key = getCartKey(userId);
  storage.set(key, JSON.stringify(cartItems));
};

// Thêm sản phẩm vào giỏ hàng
export const addToCart = (userId, product) => {
  const cart = getCart(userId);

  const variantId = `${product.id}_${product.selectedColor}_${product.selectedSize}`;
  const existingIndex = cart.findIndex(item => item.variantId === variantId);

  if (existingIndex !== -1) {
    cart[existingIndex].quantity += product.quantity || 1;
  } else {
    cart.push({
      ...product,
      variantId,
      quantity: product.quantity || 1,
    });
  }

  saveCart(userId, cart);
  return cart;
};

// Cập nhật số lượng sản phẩm
export const updateCartQuantity = (userId, variantId, newQuantity) => {
  const cart = getCart(userId);
  const index = cart.findIndex(item => item.variantId === variantId);

  if (index !== -1) {
    cart[index].quantity = newQuantity > 0 ? newQuantity : 1;
    saveCart(userId, cart);
  }

  return cart;
};

// Xoá một sản phẩm khỏi giỏ hàng
export const removeFromCart = (userId, variantId) => {
  const cart = getCart(userId);
  const newCart = cart.filter(item => item.variantId !== variantId);
  saveCart(userId, newCart);
  return newCart;
};

// Xoá toàn bộ giỏ hàng
export const clearCart = userId => {
  const key = getCartKey(userId);
  storage.delete(key);
};

// Tính tổng số lượng sản phẩm trong giỏ hàng đẻ hiện ỏ CartIcon
export const getTotalCartQuantity = userId => {
  const cart = getCart(userId);
  const uniqueVariantIds = new Set();

  cart.forEach(item => {
    uniqueVariantIds.add(item.variantId);
  });

  return uniqueVariantIds.size;
};
