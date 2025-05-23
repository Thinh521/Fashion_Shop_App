import React from 'react';
import routerNoBottomTab from '../routers/routerNoBottomTab';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useTheme} from '../contexts/ThemeContext';
import {TouchableOpacity} from 'react-native';
import {LeftIcon} from '../assets/icons/Icons';

const Stack = createNativeStackNavigator();

export default function NoBottomTab() {
  const {theme} = useTheme();

  return (
    <Stack.Navigator
      screenOptions={({navigation}) => ({
        headerTitleAlign: 'center',
        headerBackTitleVisible: false,
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{marginLeft: 16}}>
            <LeftIcon color={theme.text} />
          </TouchableOpacity>
        ),
        headerTitleStyle: {color: theme.text},
        headerStyle: {backgroundColor: theme.card},
      })}>
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
