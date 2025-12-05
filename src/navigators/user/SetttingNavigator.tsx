import { View, Text } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../../screens/setting/ProfileScreen';
import ThemeAndLanguageScreen from '../../screens/setting/ThemeAndLanguageScreen';
import EditProfileScreen from '../../screens/setting/EditProfileScreen';

const SetttingNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        animation: 'none',
        headerShown: false,
      }}
    >
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen
        name="ThemeAndLanguageScreen"
        component={ThemeAndLanguageScreen}
      />
      <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
    </Stack.Navigator>
  );
};
export default SetttingNavigator;
