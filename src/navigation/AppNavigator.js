import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {getBool} from '../utils/storage';
import MainTabNavigator from './MainTabNavigator';
import NoBottomTab from './NoBottomTab';
import SplashScreen from 'react-native-splash-screen';
import Onboarding from '../screens/Onboarding';
import SplashScreens from '../screens/Splash';

const RootStack = createNativeStackNavigator();

const AppNavigator = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  useEffect(() => {
    const checkStatus = () => {
      const completed = getBool('hasCompletedOnboarding');
      setHasCompletedOnboarding(!!completed);

      setTimeout(() => {
        setIsLoading(false);
      }, 100);
    };

    checkStatus();
  }, []);

  useEffect(() => {
    SplashScreen.hide();
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
