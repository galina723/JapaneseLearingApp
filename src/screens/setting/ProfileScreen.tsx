import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { User } from '../../models/User';
import { useTranslation } from 'react-i18next';

const ProfileScreen = () => {
  const navigation: any = useNavigation();
  const { t } = useTranslation();
  const [profile, setProfile] = useState<User>();

  useFocusEffect(
    useCallback(() => {
      fetchProfile();
    }, []),
  );

  const fetchProfile = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      const res = await axios.get(
        'https://lumbar-mora-uncoroneted.ngrok-free.dev/api/users/profile',
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      console.log('PROFILE DATA:', res.data);

      setProfile(res.data.data);
    } catch (err) {
      console.log('PROFILE ERROR: ', err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    navigation.replace('LoginScreen');
  };

  const render = useCallback(() => {
    if (profile) {
      const xp = profile?.xp || 0;
      const level = Math.floor(xp / 100);
      const currentXP = xp % 100;
      const progressPercent = Math.min(currentXP, 100);

      return (
        <>
          <View style={styles.avatarWrapper}>
            <Image
              source={require('../../assets/avt.png')}
              style={styles.avatar}
            />

            <Text style={styles.username}>{profile?.username || '...'}</Text>
            <Text style={styles.fullname}>{profile?.fullname || '...'}</Text>

            <TouchableOpacity
              style={styles.editBtn}
              onPress={() => navigation.navigate('EditProfileScreen')}
            >
              <Text style={styles.editText}>{t('Editprofile')}</Text>
            </TouchableOpacity>
          </View>

          {/* USER INFO */}
          <View style={styles.infoCard}>
            <Text style={styles.sectionTitle}>{t('Accountin4')}</Text>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>📧 Email</Text>
              <Text style={styles.infoValue}>{profile?.email || '...'}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>⭐ XP</Text>
              <Text style={styles.infoValue}>{profile?.xp || 0}</Text>
            </View>
          </View>

          <View style={styles.xpCard}>
            <Text style={styles.xpTitle}>{t('Progress')}</Text>

            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${progressPercent}%`,
                  },
                ]}
              />
            </View>

            <Text style={styles.levelText}>
              {t('Level')} {level}
            </Text>
          </View>
        </>
      );
    }
    return null;
  }, [profile]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('Myprofile')}</Text>
      </View>

      {render()}

      <TouchableOpacity
        style={styles.settingBtn}
        onPress={() => navigation.navigate('ThemeAndLanguageScreen')}
      >
        <Text style={styles.btnText}>{t('Setting')}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.logoutText}>{t('Logout')}</Text>
      </TouchableOpacity>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#203061',
  },

  header: {
    padding: 22,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#ffffff',
  },

  avatarWrapper: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 15,
  },

  avatar: {
    width: 130,
    height: 130,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: '#ffffff',
  },

  username: {
    marginTop: 12,
    fontSize: 26,
    color: '#fff',
    fontWeight: '800',
  },

  fullname: {
    fontSize: 17,
    color: '#d0d7ff',
    marginTop: 3,
  },

  editBtn: {
    marginTop: 12,
    backgroundColor: '#4a90e2',
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 14,
  },

  editText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 16,
  },

  infoCard: {
    backgroundColor: '#ffffff22',
    marginHorizontal: 20,
    padding: 18,
    borderRadius: 18,
    marginTop: 15,
  },

  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 12,
  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  infoLabel: {
    color: '#d8e2ff',
    fontSize: 16,
  },

  infoValue: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 16,
  },

  xpCard: {
    backgroundColor: '#ffffff22',
    marginHorizontal: 20,
    padding: 18,
    borderRadius: 18,
    marginTop: 20,
  },

  xpTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },

  progressBar: {
    width: '100%',
    height: 14,
    backgroundColor: '#ffffff33',
    borderRadius: 10,
    marginTop: 10,
  },

  progressFill: {
    height: '100%',
    backgroundColor: '#ffb14a',
    borderRadius: 10,
  },

  levelText: {
    color: '#ffdca8',
    fontWeight: '700',
    marginTop: 8,
    fontSize: 15,
  },

  settingBtn: {
    marginHorizontal: 20,
    backgroundColor: '#6f9dff',
    paddingVertical: 14,
    borderRadius: 14,
    marginTop: 25,
  },

  btnText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '800',
    fontSize: 17,
  },

  logoutBtn: {
    marginHorizontal: 20,
    backgroundColor: '#ff6b6b',
    paddingVertical: 14,
    borderRadius: 14,
    marginTop: 12,
  },

  logoutText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 17,
  },
});
