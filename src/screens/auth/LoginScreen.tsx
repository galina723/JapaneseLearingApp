import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import { TextInput } from 'react-native-paper';

const COLORS = {
  gradientStart: '#203061',
  gradientEnd: '#F7BFD8',
  inputBackground: '#FFFFFF',
  buttonPrimary: '#57487F',
  buttonText: '#FFFFFF',
  textLight: '#FFFFFF',
  linkAccent: '#F880B0',
};

const LoginScreen = ({}) => {
  const navigation: any = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
    const token = await AsyncStorage.getItem('token');
    const user = await AsyncStorage.getItem('user');
    if (token && user) {
      const userT = JSON.parse(user);
      if (userT.role.roleId == 1) navigation.navigate('DashboardNavigator');
      else navigation.navigate('HomeScreen');
    }
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        'https://lumbar-mora-uncoroneted.ngrok-free.dev/api/auth/login',
        {
          username: username,
          password: password,
        },
      );

      if (res.status == 200) {
        const token = res.data.token;
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('user', JSON.stringify(res.data.user));
        console.log(res.data);
        if (res.data.user.role.roleId == 1)
          navigation.navigate('DashboardNavigator');
        else {
          if (res.data.user.status == 0) {
            navigation.navigate('HomeScreen');
          } else {
            Alert.alert('Login Failed', 'Your account is not active yet.');
          }
        }
      } else {
        Alert.alert('Login Failed');
      }
    } catch (err) {
      Alert.alert('Login Fail');
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

      <KeyboardAvoidingView style={styles.contentContainer} behavior="padding">
        <Text style={styles.logoText}>JapanWise</Text>
        <Text style={styles.welcomeText}>Welcome back!</Text>

        {/* Username */}
        <View style={styles.inputCard}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#A0A0A0"
            autoCapitalize="none"
            value={username}
            onChangeText={setUsername}
            mode="outlined"
          />
        </View>

        {/* Password */}
        <View style={styles.inputCard}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#A0A0A0"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
            mode="outlined"
          />
        </View>

        {/* 🔥 Forgot Password */}
        <TouchableOpacity
          style={{ width: '100%', maxWidth: 350, alignItems: 'flex-end' }}
          onPress={() => navigation.navigate('EmailForgetScreen')}
        >
          <Text
            style={{
              color: COLORS.textLight,
              fontSize: 14,
              marginBottom: 10,
              textDecorationLine: 'underline',
            }}
          >
            Forgot Password?
          </Text>
        </TouchableOpacity>

        {/* Login Button */}
        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Loading...' : 'Login'}
          </Text>
        </TouchableOpacity>

        {/* Register */}
        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Don't have an account? </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('RegisterScreen')}
          >
            <Text
              style={[
                styles.linkText,
                {
                  color: COLORS.gradientStart,
                  fontWeight: 'bold',
                  textDecorationLine: 'none',
                },
              ]}
            >
              Sign up now
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logoText: {
    fontSize: 38,
    fontWeight: '900',
    color: COLORS.textLight,
    marginBottom: 5,
  },
  welcomeText: {
    fontSize: 18,
    color: COLORS.textLight,
    marginBottom: 50,
  },
  inputCard: {
    width: '100%',
    maxWidth: 350,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: COLORS.linkAccent,
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 4,
  },
  input: {
    fontSize: 18,
    color: '#333',
    backgroundColor: COLORS.inputBackground,
    borderRadius: 12,
  },
  loginButton: {
    width: '100%',
    maxWidth: 350,
    backgroundColor: COLORS.buttonPrimary,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 20,
  },
  buttonText: {
    color: COLORS.buttonText,
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  registerText: {
    color: COLORS.textLight,
  },
  linkText: {
    color: COLORS.textLight,
    textDecorationLine: 'underline',
  },
});
