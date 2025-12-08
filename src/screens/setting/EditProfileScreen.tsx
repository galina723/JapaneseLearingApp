import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const UpdateProfileScreen = () => {
  const navigation: any = useNavigation();
  const { t } = useTranslation();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [fullname, setFullname] = useState('');

  const loadProfile = async () => {
    const token = await AsyncStorage.getItem('token');

    const res = await axios.get(
      'https://lumbar-mora-uncoroneted.ngrok-free.dev/api/users/profile',
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    if (res.status === 200) {
      const data = res.data.data;
      setUsername(data.username);
      setEmail(data.email);
      setFullname(data.fullname);
    }
  };

  const updateProfile = async () => {
    const token = await AsyncStorage.getItem('token');

    try {
      const res = await axios.put(
        'https://lumbar-mora-uncoroneted.ngrok-free.dev/api/users/profile',
        { fullname },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      navigation.navigate('ProfileScreen');
    } catch (err: any) {
      console.log(err.response?.data);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>{t('Editprofile')}</Text>

      <View style={styles.card}>
        <Text style={styles.label}>{t('Username')}</Text>
        <TextInput
          style={[styles.input, styles.disabled]}
          value={username}
          editable={false}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={[styles.input, styles.disabled]}
          value={email}
          editable={false}
        />

        <Text style={styles.label}>{t('Fullname')}</Text>
        <TextInput
          style={styles.input}
          value={fullname}
          onChangeText={setFullname}
          placeholder="Enter your fullname"
          placeholderTextColor="#999"
        />

        <TouchableOpacity style={styles.btn} onPress={updateProfile}>
          <Text style={styles.btnText}>{t('Savechange')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UpdateProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#203061',
  },

  headerTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#f4deeb',
    marginBottom: 20,
    alignSelf: 'center',
  },

  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 18,
    elevation: 6,
  },

  label: {
    marginTop: 12,
    fontWeight: '700',
    color: '#203061',
    fontSize: 14,
  },

  input: {
    borderWidth: 1,
    borderColor: '#c8c8c8',
    padding: 12,
    borderRadius: 12,
    marginTop: 6,
    fontSize: 15,
    color: '#333',
  },

  disabled: {
    backgroundColor: '#eee',
    color: '#666',
  },

  btn: {
    backgroundColor: '#8A6FD6',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 26,
  },

  btnText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '700',
  },
});
