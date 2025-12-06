import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const DashboardScreen = () => {
  const navigation: any = useNavigation();

  const handleLogout = async () => {
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('token');
    navigation.navigate('LoginScreen');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* HEADER */}
      <Text style={styles.header}>Admin Dashboard</Text>
      <Text style={styles.subHeader}>Manage your system</Text>

      {/* ROW 1 */}
      <View style={styles.row}>
        <TouchableOpacity style={styles.card}>
          <Text style={styles.icon}>👥</Text>
          <Text style={styles.cardTitle}>Users</Text>
          <Text style={styles.cardDesc}>Manage all users</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Text style={styles.icon}>📚</Text>
          <Text style={styles.cardTitle}>Lessons</Text>
          <Text style={styles.cardDesc}>Add / Edit lessons</Text>
        </TouchableOpacity>
      </View>

      {/* ROW 2 */}
      <View style={styles.row}>
        <TouchableOpacity style={styles.card}>
          <Text style={styles.icon}>📊</Text>
          <Text style={styles.cardTitle}>Reports</Text>
          <Text style={styles.cardDesc}>System analytics</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Text style={styles.icon}>⚙️</Text>
          <Text style={styles.cardTitle}>Settings</Text>
          <Text style={styles.cardDesc}>Configuration</Text>
        </TouchableOpacity>
      </View>

      {/* LOGOUT */}
      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F9',
    padding: 20,
  },

  header: {
    marginTop: 30,
    fontSize: 28,
    fontWeight: '800',
    color: '#203061',
    textAlign: 'center',
  },

  subHeader: {
    textAlign: 'center',
    color: '#666',
    marginTop: 6,
    fontSize: 16,
    marginBottom: 30,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
  },

  card: {
    width: '48%',
    backgroundColor: '#fff',
    paddingVertical: 24,
    borderRadius: 14,
    paddingHorizontal: 14,
    elevation: 4,
  },

  icon: {
    fontSize: 38,
    marginBottom: 12,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#203061',
  },

  cardDesc: {
    marginTop: 4,
    color: '#777',
    fontSize: 14,
  },

  logoutBtn: {
    backgroundColor: '#D9534F',
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 40,
  },

  logoutText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
    textAlign: 'center',
  },
});
