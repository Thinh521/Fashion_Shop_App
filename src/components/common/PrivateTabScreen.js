import React, {useEffect, useState} from 'react';
import {getCurrentUser} from '../../utils/storage';
import {useNavigation} from '@react-navigation/core';

export default function PrivateTabScreen({component: Component}) {
  const navigation = useNavigation();
  const [userLocal, setUserLocal] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUserFromStorage = async () => {
      try {
        const user = await getCurrentUser();
        setUserLocal(user);
      } catch (error) {
        console.error('Lỗi đọc currentUser:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserFromStorage();
  }, []);

  useEffect(() => {
    if (!isLoading && (!userLocal || Object.keys(userLocal).length === 0)) {
      navigation.navigate('NoBottomTab', {screen: 'LoginRequired'});
    }
  }, [userLocal, isLoading, navigation]);

  if (isLoading || !userLocal || Object.keys(userLocal).length === 0)
    return null;

  return Component ? <Component /> : null;
}
