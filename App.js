// App.js
import 'react-native-url-polyfill/auto';
import { registerRootComponent } from 'expo';
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Cannot assign to property']);

// Import screens
import LoginScreen from './components/Auth/LoginScreen';
import SignUpScreen from './components/Auth/SignUpScreen';
import ForgotPasswordScreen from './components/Auth/ForgotPasswordScreen';
import BottomTabNavigator from './navigation/BottomTabNavigator';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Login"
        screenOptions={{ 
          headerShown: false
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="MainApp" component={BottomTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

registerRootComponent(App);
