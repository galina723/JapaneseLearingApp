import { View, Text } from 'react-native';
import React from 'react';

import ForgetPassword from '../../screens/auth/ForgetPasswordScreen';
import BottomNavigator from './BottomNavigator';
import AdminBottomTabnavigation from '../admin/BottomTabnavigation';
import RegisterScreen from '../../screens/auth/RegisterScreen';
import OTPScreen from '../../screens/auth/OTPScreen';
import ForgetPasswordScreen from '../../screens/auth/ForgetPasswordScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../../screens/auth/LoginScreen';
import EmailForgetScreen from '../../screens/auth/EmailForgetScreen';
import OTPScreenForget from '../../screens/auth/OTPScreenForget';

const AuthNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        animation: 'none',
        headerShown: false,
      }}
      initialRouteName="LoginScreen"
    >
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        initialParams={{ refetch: false }}
      />
      <Stack.Screen
        name="ForgetPasswordScreen"
        component={ForgetPasswordScreen}
      />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="OTPScreen" component={OTPScreen} />
      <Stack.Screen name="HomeScreen" component={BottomNavigator} />
      <Stack.Screen
        name="DashboardNavigator"
        component={AdminBottomTabnavigation}
      />
      <Stack.Screen name="EmailForgetScreen" component={EmailForgetScreen} />
      <Stack.Screen name="OTPScreenForget" component={OTPScreenForget} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
