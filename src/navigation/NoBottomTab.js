import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import routerNoBottomTab from '../routers/routerNoBottomTab';

const Stack = createNativeStackNavigator();

export default function NoBottomTab() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#F9F9F9',
          elevation: 0,
          shadowColor: 'transparent',
        },
        headerShadowVisible: false,
      }}>
      {routerNoBottomTab.map(router => (
        <Stack.Screen
          key={router.name}
          name={router.name}
          component={router.component}
          options={router?.options}
        />
      ))}
    </Stack.Navigator>
  );
}
