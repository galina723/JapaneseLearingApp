import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const COLORS = {
  gradientStart: '#203061',
  gradientEnd: '#F7BFD8',

  inputBackground: '#FFFFFF',
  buttonPrimary: '#F880B0',
  buttonText: '#FFFFFF',
  textLight: '#FFFFFF',
  linkAccent: '#F880B0',
};

interface RegisterProps {
  navigation: any;
}

const RegisterScreen: React.FC<RegisterProps> = () => {
  const [username, setUsername] = useState('');
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation: any = useNavigation();
  const handleRegister = async () => {
    if (!email || !password || !username || !fullname) {
      //alert('All fields are required');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        'https://lumbar-mora-uncoroneted.ngrok-free.dev/api/Auth/register',
        {
          Username: username,
          Fullname: fullname,
          Email: email,
          Password: password,
        },
      );

      navigation.navigate('OTPScreen', { email });
    } catch (error: any) {
      console.error('Registration failed', error?.response || error?.message);
      //alert('Register Failed, please try again');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={[COLORS.gradientStart, COLORS.gradientEnd]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      <KeyboardAvoidingView
        style={{ flex: 1, width: '100%' }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <Text style={styles.logoText}>Join JapanWise</Text>
          <Text style={styles.subText}>
            Create your account to start learning!
          </Text>

          <View style={styles.inputCard}>
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="#A0A0A0"
              autoCapitalize="none"
              value={username}
              onChangeText={setUsername}
            />
          </View>

          <View style={styles.inputCard}>
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              placeholderTextColor="#A0A0A0"
              autoCapitalize="words"
              value={fullname}
              onChangeText={setFullname}
            />
          </View>

          <View style={styles.inputCard}>
            <TextInput
              style={styles.input}
              placeholder="Email (Required)"
              placeholderTextColor="#A0A0A0"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.inputCard}>
            <TextInput
              style={styles.input}
              placeholder="Password (Required)"
              placeholderTextColor="#A0A0A0"
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <TouchableOpacity
            style={styles.registerButton}
            onPress={handleRegister}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Registering...' : 'Register'}
            </Text>
          </TouchableOpacity>

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text
                style={[
                  styles.linkText,
                  { color: COLORS.gradientStart, fontWeight: 'bold' },
                ]}
              >
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
  },
  logoText: {
    fontSize: 34,
    fontWeight: '900',
    color: COLORS.textLight,
    marginBottom: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    marginTop: 50,
  },
  subText: {
    fontSize: 16,
    color: COLORS.textLight,
    marginBottom: 40,
  },
  inputCard: {
    width: '100%',
    maxWidth: 350,
    backgroundColor: COLORS.inputBackground,
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 20,
    shadowColor: COLORS.linkAccent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: '#333333',
    paddingVertical: 8,
  },
  registerButton: {
    width: '100%',
    maxWidth: 350,
    backgroundColor: COLORS.buttonPrimary,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 20,
    shadowColor: COLORS.buttonPrimary,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.7,
    shadowRadius: 8,
    elevation: 10,
  },
  buttonText: {
    color: COLORS.buttonText,
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 50,
  },
  loginText: {
    color: COLORS.textLight,
    fontSize: 15,
  },
  linkText: {
    color: COLORS.linkAccent,
    fontSize: 15,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

export default RegisterScreen;
