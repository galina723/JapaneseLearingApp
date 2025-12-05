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

const UpdateProfileScreen = () => {
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
      const data = res.data.data; // BE trả về field "data"
      setUsername(data.username);
      setEmail(data.email);
      setFullname(data.fullName); // nhớ đúng case nha
    }
  };

  const updateProfile = async () => {
    const token = await AsyncStorage.getItem('token');

    try {
      const res = await axios.post(
        'https://lumbar-mora-uncoroneted.ngrok-free.dev/api/users/profile',
        {
          fullName: fullname, // backend CHỈ NHẬN field NÀY
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (res.status === 200) {
        //alert('Cập nhật thành công!');
      }
    } catch (err: any) {
      console.log(err.response?.data);
      //alert('Update failed!');
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Update Profile</Text>

      <Text style={styles.label}>Username</Text>
      <TextInput
        style={[styles.input, styles.disabled]}
        value={username}
        editable={false} // ❌ không cho sửa
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={[styles.input, styles.disabled]}
        value={email}
        editable={false} // ❌ không cho sửa
      />

      <Text style={styles.label}>Fullname</Text>
      <TextInput
        style={styles.input}
        value={fullname}
        onChangeText={setFullname}
      />

      <TouchableOpacity style={styles.btn} onPress={updateProfile}>
        <Text style={styles.btnText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UpdateProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFF',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
  },
  label: {
    marginTop: 12,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    padding: 10,
    borderRadius: 8,
    marginTop: 4,
  },
  disabled: {
    backgroundColor: '#EEE',
    color: '#666',
  },
  btn: {
    backgroundColor: '#4a90e2',
    padding: 14,
    marginTop: 24,
    borderRadius: 10,
    alignItems: 'center',
  },
  btnText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
