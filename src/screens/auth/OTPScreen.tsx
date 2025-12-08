import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';

interface OTPScreenProps {
  navigation: any;
  route: { params: { email: string } };
}

const OTPScreen = () => {
  const route = useRoute();
  const navigation: any = useNavigation();
  const { email } = route.params as { email: string };

  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (!otp) {
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        'https://lumbar-mora-uncoroneted.ngrok-free.dev/api/Auth/verify-otp',
        {
          email: email,
          otp: otp,
        },
      );

      navigation.navigate('Login');
    } catch (error: any) {
      console.log(
        'OTP Verify Failed:',
        error?.response?.data || error?.message,
      );
      Alert.alert('Invalid OTP. Please try again!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={['#203061', '#F7BFD8']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <KeyboardAvoidingView
        style={{ flex: 1, width: '100%' }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.content}>
          <Text style={styles.title}>OTP Verification</Text>

          <Text style={styles.subtitle}>
            Enter the verification code sent to:
          </Text>

          <Text style={styles.emailText}>{email}</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter OTP"
              placeholderTextColor="#A0A0A0"
              keyboardType="number-pad"
              value={otp}
              onChangeText={setOtp}
            />
          </View>

          <TouchableOpacity
            style={styles.verifyButton}
            onPress={() => {
              handleVerify(), navigation.navigate('LoginScreen');
            }}
            disabled={loading}
          >
            <Text style={styles.verifyButtonText}>
              {loading ? 'Verifying...' : 'Verify OTP'}
            </Text>
          </TouchableOpacity>

          <View style={styles.backRow}>
            <TouchableOpacity
              onPress={() => navigation.navigate('RegisterScreen')}
            >
              <Text style={styles.backText}>Back to Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    color: '#FFFFFF',
    fontWeight: '900',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 5,
    textAlign: 'center',
  },
  emailText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#FFECEC',
    marginBottom: 40,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    maxWidth: 350,
    backgroundColor: '#FFF',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 25,
    elevation: 6,
  },
  input: {
    fontSize: 18,
    color: '#333',
  },
  verifyButton: {
    width: '100%',
    maxWidth: 350,
    backgroundColor: '#F880B0',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    elevation: 5,
  },
  verifyButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backRow: {
    marginTop: 30,
  },
  backText: {
    color: '#FFFFFF',
    fontSize: 15,
    textDecorationLine: 'underline',
  },
});

export default OTPScreen;
