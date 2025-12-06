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
import { useNavigation, useRoute } from '@react-navigation/native';

const ForgetPasswordScreen = () => {
  const navigation: any = useNavigation();
  const route = useRoute();
  const { email, otp } = route.params as { email: string; otp: string };

  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (!newPassword) return;

    setLoading(true);

    try {
      await axios.post(
        'https://lumbar-mora-uncoroneted.ngrok-free.dev/api/auth/reset-password',
        { email, otp, newPassword },
      );

      navigation.navigate('LoginScreen');
    } catch (error: any) {
      console.log('Reset Password Error:', error?.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={['#203061', '#F7BFD8']} style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Reset Password</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter new password"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleReset}>
          <Text style={styles.buttonText}>
            {loading ? 'Updating...' : 'Update Password'}
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default ForgetPasswordScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 30, color: '#fff', marginBottom: 20, textAlign: 'center' },
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
