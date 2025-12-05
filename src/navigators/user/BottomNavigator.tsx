import { View, Text } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeNavigator from './HomeNavigator';
import { Icon } from 'react-native-paper';
import VideoScreen from '../../screens/video/VideoScreen';
import RankScreen from '../../screens/rank/RankScreen';
import ProfileScreen from '../../screens/setting/ProfileScreen';
import SetttingNavigator from './SetttingNavigator';

const BottomNavigator = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={() => ({
        headerShown: false,
        animation: 'fade',
      })}
    >
      <Tab.Screen
        name="home"
        component={HomeNavigator}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: () => {
            return <Icon size={24} source="home" />;
          },
        }}
      />
      <Tab.Screen
        name="video"
        component={VideoScreen}
        options={{
          tabBarLabel: 'Video',
          tabBarIcon: () => {
            return <Icon size={24} source="bell" />;
          },
        }}
      />
      <Tab.Screen
        name="rank"
        component={RankScreen}
        options={{
          tabBarLabel: 'Rank',
          tabBarIcon: () => {
            return <Icon size={24} source="home" />;
          },
        }}
      />
      <Tab.Screen
        name="setting"
        component={SetttingNavigator}
        options={{
          tabBarLabel: 'Setting',
          tabBarIcon: () => {
            return <Icon size={24} source="bell" />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigator;
