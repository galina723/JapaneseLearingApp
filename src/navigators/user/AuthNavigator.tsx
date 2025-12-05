import { View, Text } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../../screens/auth/LoginScreen';
import ForgetPassword from '../../screens/auth/ForgetPassword';
import BottomNavigator from './BottomNavigator';
import AdminBottomTabnavigation from '../admin/BottomTabnavigation';
import RegisterScreen from '../../screens/auth/RegisterScreen';
import OTPScreen from '../../screens/auth/OTPScreen';

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
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="OTPScreen" component={OTPScreen} />
      <Stack.Screen name="HomeScreen" component={BottomNavigator} />
      <Stack.Screen
        name="DashboardNavigator"
        component={AdminBottomTabnavigation}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
