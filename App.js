import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './src/navigation';
import FlashMessage from 'react-native-flash-message';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import ErrorBoundary from './src/components/ErrorBoundary/ErrorBoundary';

const queryClient = new QueryClient();

export default function App() {
  return (
    <GestureHandlerRootView styles={{flex: 1}}>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary>
          <NavigationContainer>
            <AppNavigator />
            <FlashMessage position={'top'} />
          </NavigationContainer>
        </ErrorBoundary>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
