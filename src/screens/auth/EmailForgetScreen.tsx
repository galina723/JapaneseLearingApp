import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const EmailForgetScreen = () => {
  const navigation: any = useNavigation();
  const [email, setEmail] = useState('');

  const handleSendEmail = async () => {
    if (!email) return;

    try {
      await axios.post(
        'https://lumbar-mora-uncoroneted.ngrok-free.dev/api/auth/forgot-password',
        { email },
      );

      navigation.navigate('OTPScreenForget', { email });
    } catch (error: any) {
      console.log('Forgot Password Error:', error?.response?.data);
    }
  };

  return (
    <LinearGradient colors={['#203061', '#F7BFD8']} style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Forgot Password</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
        />

        <TouchableOpacity style={styles.button} onPress={handleSendEmail}>
          <Text style={styles.buttonText}>Send OTP</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default EmailForgetScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: { fontSize: 28, color: '#fff', marginBottom: 20, textAlign: 'center' },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#F880B0',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});
