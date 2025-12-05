import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const DashboardScreen = () => {
  const navigation: any = useNavigation();
  const handleLogout = async () => {
    // Xử lý đăng xuất
    // Ví dụ: xóa dữ liệu đăng nhập, chuyển hướng đến màn hình đăng nhập
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('token');
    navigation.navigate('LoginScreen');
  };
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Dashboard</Text>
      <TouchableOpacity onPress={handleLogout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DashboardScreen;
