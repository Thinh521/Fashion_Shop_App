// import React, {createContext, useContext, useEffect, useState} from 'react';
// import {
//   getCart,
//   addToCart as add,
//   updateCartQuantity,
//   removeFromCart,
//   clearCart,
// } from '../utils/storage';

// const CartContext = createContext();

// export const CartProvider = ({userId, children}) => {
//   const [cartItems, setCartItems] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   // Load cart từ storage khi userId thay đổi
//   useEffect(() => {
//     if (userId) {
//       const data = getCart(userId);
//       setCartItems(data);
//       setIsLoading(false);
//     }
//   }, [userId]);

//   const addToCart = product => {
//     const updated = add(userId, product);
//     setCartItems(updated);
//   };

//   const updateQuantity = (variantId, newQuantity) => {
//     const updated = updateCartQuantity(userId, variantId, newQuantity);
//     setCartItems(updated);
//   };

//   const removeItem = variantId => {
//     const updated = removeFromCart(userId, variantId);
//     setCartItems(updated);
//   };

//   const clearAll = () => {
//     clearCart(userId);
//     setCartItems([]);
//   };

//   const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

//   console.log(totalQuantity);

//   return (
//     <CartContext.Provider
//       value={{
//         cartItems,
//         addToCart,
//         updateQuantity,
//         removeItem,
//         clearAll,
//         totalQuantity,
//         isLoading,
//       }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => useContext(CartContext);
