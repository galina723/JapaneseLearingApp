import React from 'react';
import DashboardScreen from '../../screens/onlyforadmin/DashboardScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UserNavigation from './UserNavigation';
import LessonNavigation from './LessonNavigation';
import QuizNavigation from './QuizNavigation';
import { Icon } from 'react-native-paper';
import CategoryScreen from '../../screens/onlyforadmin/category/CategoryScreen';

const AdminBottomTabnavigation = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
      <Tab.Screen
        name="DashboardScreen"
        component={DashboardScreen}
        options={{
          tabBarLabel: 'Dashboard',
          tabBarIcon: () => {
            return <Icon size={24} source="home" />;
          },
        }}
      />
      <Tab.Screen
        name="CategoryScreen"
        component={CategoryScreen}
        options={{
          tabBarLabel: 'Category',
          tabBarIcon: () => {
            return <Icon size={24} source="format-list-bulleted" />;
          },
        }}
      />
      <Tab.Screen
        name="UserScreen"
        component={UserNavigation}
        options={{
          tabBarLabel: 'User',
          tabBarIcon: () => {
            return <Icon size={24} source="human-queue" />;
          },
        }}
      />
      <Tab.Screen
        name="LessonScreen"
        component={LessonNavigation}
        options={{
          tabBarLabel: 'Lesson',
          tabBarIcon: () => {
            return <Icon size={24} source="book" />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default AdminBottomTabnavigation;
