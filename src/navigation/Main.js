import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Games } from '../screens/Games';
import { TextDemo, ButtonDemo, FormDemo } from '../screens/Demos';
import colors from '../constants/colors';

const Tab = createBottomTabNavigator();

const getIcon = (route, focused) => {
  switch(route) {
    case 'Games':
     return focused
        ? 'md-home-sharp'
        : 'md-home-outline';
    case 'High scores':
      return focused
        ? 'md-stats-chart-sharp'
        : 'md-stats-chart-outline';
    case 'Help':
      return focused
        ? 'md-help-circle'
        : 'md-help-circle-outline';
    case 'Settings':
      return focused
        ? 'md-settings-sharp'
        : 'md-settings-outline';
    default:
      return focused
          ? 'md-home-outline'
          : 'md-home-sharp';
  }
}

const Stack = createStackNavigator();

const StackNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
          name="Games"
          component={Games}
      />
      <Stack.Screen 
          name="FormDemo" 
          component={FormDemo}
          options={{ headerTitle: 'Text Demo' }}
      />
      <Stack.Screen 
          name="ButtonDemo" 
          component={ButtonDemo}
          options={{ headerTitle: 'Text Demo' }}
      />
      <Stack.Screen 
          name="TextDemo" 
          component={TextDemo}
          options={{ headerTitle: 'Text Demo' }}
      />
    </Stack.Navigator>
  )
};

export const Main = () => (
  <Tab.Navigator 
  screenOptions={({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {      
      return <Ionicons name={getIcon(route.name, focused)} size={size} color={color} />;
    },
    tabBarActiveTintColor: colors.primary,
    tabBarInactiveTintColor: 'gray',
  })}>
    <Tab.Screen 
      name="Home" 
      component={StackNav} 
      options={{ headerTitle: 'Text Demo', headerShown: false }}
    /> 
    <Tab.Screen
      name="High scores"
      component={TextDemo}
      options={{ headerTitle: 'Text Demo', headerShown: false }}
    />
    <Tab.Screen
      name="Help"
      component={FormDemo}
      options={{ headerTitle: 'Button Demo' }}
    />
    <Tab.Screen
      name="Settings"
      component={ButtonDemo}
      options={{ headerTitle: 'Button Demo' }}
    />
  </Tab.Navigator>
);
