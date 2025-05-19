// import React, {createContext, useState, useEffect} from 'react';
// import {MMKVLoader} from 'react-native-mmkv-storage';

// const MMKV = new MMKVLoader().initialize();

// export const AuthContext = createContext();

// export const AuthProvider = ({children}) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const checkLogin = () => {
//       try {
//         const savedUser = MMKV.getMap('currentUser');
//         if (savedUser) {
//           setUser(savedUser);
//         }
//       } catch (e) {
//         console.log('Error loading user data', e);
//       } finally {
//         setLoading(false);
//       }
//     };
//     checkLogin();
//   }, []);

//   const login = userData => {
//     setUser(userData);
//     MMKV.setMap('currentUser', userData);
//     MMKV.setString('authToken', userData.token);
//     MMKV.setString('refreshToken', userData.refreshToken);
//   };

//   const logout = () => {
//     setUser(null);
//     MMKV.removeItem('currentUser');
//     MMKV.removeItem('authToken');
//     MMKV.removeItem('refreshToken');
//   };

//   return (
//     <AuthContext.Provider value={{user, login, logout, loading}}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
