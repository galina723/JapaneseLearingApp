import { View, Text } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CategoryScreen from '../../screens/onlyforadmin/category/CategoryScreen';

const CategoryNavigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        animation: 'none',
        headerShown: false,
      }}
    >
      <Stack.Screen name="CategoryScreen" component={CategoryScreen} />
    </Stack.Navigator>
  );
};

export default CategoryNavigation;
