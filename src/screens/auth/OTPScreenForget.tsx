import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';

const OTPScreenForget = () => {
  const route = useRoute();
  const navigation: any = useNavigation();
  const { email } = route.params as { email: string };

  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (!otp) return;

    setLoading(true);

    try {
      await axios.post(
        'https://lumbar-mora-uncoroneted.ngrok-free.dev/api/auth/verify-reset-password-otp',
        { email, otp },
      );

      console.log(1122334454);

      navigation.navigate('ForgetPasswordScreen', {
        email,
        otp,
      });
    } catch (error: any) {
      console.log('OTP Error:', error?.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={['#203061', '#F7BFD8']} style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.content}>
          <Text style={styles.title}>OTP Verification</Text>
          <Text style={styles.subtitle}>We sent an OTP to:</Text>
          <Text style={styles.emailText}>{email}</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter OTP"
            placeholderTextColor="#aaa"
            keyboardType="number-pad"
            value={otp}
            onChangeText={setOtp}
          />

          <TouchableOpacity style={styles.button} onPress={handleVerify}>
            <Text style={styles.buttonText}>
              {loading ? 'Verifying...' : 'Verify OTP'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ marginTop: 20 }}
            onPress={() => navigation.navigate('EmailForgetScreen')}
          >
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default OTPScreenForget;

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 28, color: '#fff', marginBottom: 10, textAlign: 'center' },
  subtitle: { color: '#fff', textAlign: 'center' },
  emailText: {
    color: '#FFECEC',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 30,
    fontSize: 17,
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    fontSize: 18,
  },
  button: {
    backgroundColor: '#F880B0',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  backText: {
    color: '#fff',
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
});
