import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { store } from './src/redux/store';
import { Provider } from 'react-redux'

import { Main } from './src/navigation/Main';

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
          <StatusBar style="auto" />
          <NavigationContainer>
              <Main />
          </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}
