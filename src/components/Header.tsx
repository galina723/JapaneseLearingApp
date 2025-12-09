import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import { LocationWeatherModel, CurrentweatherModel } from '../models/Weather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { t } = useTranslation();

  const [location, setLocation] = useState<LocationWeatherModel | null>(null);
  const [current, setCurrent] = useState<CurrentweatherModel | null>(null);
  const [username, setUsername] = useState<string>('User');

  const getLocation = async () => {
    try {
      const api =
        'https://api.weatherapi.com/v1/current.json?key=d883c46bb977484798250410250912&q=Ho Chi Minh';

      const res = await fetch(api);
      const json = await res.json();

      setLocation(json.location as LocationWeatherModel);
      setCurrent(json.current as CurrentweatherModel);
    } catch (error) {
      console.log('Error fetching location data: ', error);
    }
  };

  const getUserProfile = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) return;

      const res = await axios.get(
        'https://lumbar-mora-uncoroneted.ngrok-free.dev/api/users/profile',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (res.status === 200 && res.data.data) {
        setUsername(res.data.data.username);
      }
    } catch (err) {
      console.log('Error fetching profile:', err);
    }
  };

  useEffect(() => {
    getLocation();
    getUserProfile();
  }, []);

  return (
    <View
      style={{
        paddingVertical: 20,
        paddingHorizontal: 18,
        backgroundColor: '#c9b0e7',
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        elevation: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <View style={{ flexDirection: 'column', flex: 1 }}>
        <Text
          style={{
            fontSize: 22,
            fontWeight: '700',
            color: '#2a2a4a',
            marginBottom: 4,
          }}
        >
          {t('Hello')}, {username}
        </Text>

        {!current || !location ? (
          <ActivityIndicator size="small" color="#7c6ac7" />
        ) : (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={{ uri: `https:${current.condition.icon}` }}
              style={{ width: 28, height: 28, marginRight: 6 }}
            />

            <Text
              style={{
                fontSize: 15,
                color: '#4b3b78',
                fontWeight: '500',
              }}
            >
              {location.name} · {current.temp_c}°C
            </Text>
          </View>
        )}
      </View>
      <View
        style={{
          backgroundColor: '#7c6ac7',
          padding: 8,
          borderRadius: 16,
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowRadius: 6,
          elevation: 3,
        }}
      >
        <Image
          source={require('../assets/logo.png')}
          style={{ width: 42, height: 42, borderRadius: 12 }}
        />
      </View>
    </View>
  );
};

export default Header;
