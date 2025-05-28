import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {getBool} from '../utils/storage';
import MainTabNavigator from './MainTabNavigator';
import NoBottomTab from './NoBottomTab';
import Onboarding from '../screens/Onboarding';
import SplashScreens from '../screens/Splash';

const RootStack = createNativeStackNavigator();

const AppNavigator = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  useEffect(() => {
    const checkStatus = async () => {
      const completed = await getBool('hasCompletedOnboarding');
      setHasCompletedOnboarding(!!completed);

      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    };

    checkStatus();
  }, []);

  if (isLoading) {
    return <SplashScreens />;
  }

  return (
    <RootStack.Navigator screenOptions={{headerShown: false}}>
      {!hasCompletedOnboarding ? (
        <>
          <RootStack.Screen name="Onboarding" component={Onboarding} />
          <RootStack.Screen
            name="MainTabNavigator"
            component={MainTabNavigator}
          />
        </>
      ) : (
        <>
          <RootStack.Screen
            name="MainTabNavigator"
            component={MainTabNavigator}
          />
          <RootStack.Screen name="NoBottomTab" component={NoBottomTab} />
        </>
      )}
    </RootStack.Navigator>
  );
};

export default AppNavigator;
