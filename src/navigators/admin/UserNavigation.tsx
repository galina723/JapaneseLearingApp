import { View, Text } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserScreen from '../../screens/onlyforadmin/user/UserScreen';
import UserDetailScreen from '../../screens/onlyforadmin/user/UserDetailScreen';

const UserNavigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        animation: 'none',
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="UserScreen"
        component={UserScreen}
        initialParams={{ refetch: false }}
      />
      <Stack.Screen name="UserDetailScreen" component={UserDetailScreen} />
    </Stack.Navigator>
  );
};

export default UserNavigation;
