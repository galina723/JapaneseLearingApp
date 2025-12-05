import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const Service_Api_Url =
  'https://lumbar-mora-uncoroneted.ngrok-free.dev/api';

export const connector = axios.create({
  baseURL: Service_Api_Url,
  headers: {
    'Content-Type': 'application/json',
  },
});
export const connectorFile = axios.create({
  baseURL: Service_Api_Url,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

connector.interceptors.request.use(
  async config => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    } catch (error) {
      console.log(error);
      return config;
    }
  },
  error => Promise.reject(error),
);
