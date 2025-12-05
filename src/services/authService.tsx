import { View, Text } from 'react-native';
import React from 'react';
import { LoginRequest } from '../models/User';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class authService {
  static async login(loginData: LoginRequest) {
    console.log(loginData);
    const res = await axios.post('${Service_Api_Url}/auth/login', loginData);
    console.log(res);

    if (res.data.token && res.status == 200) {
      await AsyncStorage.setItem('token', res.data.token);
      await AsyncStorage.setItem('user', JSON.stringify(res.data.user));
    } else {
      return fail;
    }
    return res;
  }
}
