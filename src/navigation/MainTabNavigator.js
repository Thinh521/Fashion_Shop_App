import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CustomTabBar from '../components/tabbar/CustomTabBar';
import routerBottomTab from '../routers/routerBottomTab';
import MainLayout from '../layout/MainLayout';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}>
      {routerBottomTab.map(
        ({
          name,
          component,
          label,
          Icon,
          isCenterButton = false,
          hasLayout = false,
          options = {},
        }) => (
          <Tab.Screen
            key={name}
            name={name}
            component={
              hasLayout
                ? () => (
                    <MainLayout>{React.createElement(component)}</MainLayout>
                  )
                : component
            }
            options={{
              ...options,
              tabBarLabel: label || '',
              tabBarCustomIcon: Icon,
              isCenterButton,
            }}
          />
        ),
      )}
    </Tab.Navigator>
  );
};

export default React.memo(MainTabNavigator);
