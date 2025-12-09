import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';

type LANGUAGE = 'vi' | 'en';

const ThemeAndLanguageScreen = () => {
  const { i18n } = useTranslation();
  const { t } = useTranslation();

  const [language, setLanguage] = useState<LANGUAGE>('vi');

  useEffect(() => {
    checkCurrentLanguage();
  }, []);

  const checkCurrentLanguage = async () => {
    const res = await AsyncStorage.getItem('language');

    setLanguage((res as LANGUAGE) || 'vi');
  };

  const handleChangeLanguage = async (language: LANGUAGE) => {
    await AsyncStorage.setItem('language', language);
    setLanguage(language);
    handleSetLanguage(language);
  };

  const handleSetLanguage = (currentLang: string) => {
    i18n.changeLanguage(currentLang);
    i18n.language = currentLang;
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('Setting')}</Text>
        <Text style={styles.headerSub}>{t('Language')}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🌏 {t('Language')}</Text>

        <TouchableOpacity
          style={[styles.option, language === 'vi' && styles.activeOption]}
          onPress={() => handleChangeLanguage('vi')}
        >
          <Text style={styles.optionText}>🇻🇳 Tiếng Việt</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.option, language === 'en' && styles.activeOption]}
          onPress={() => handleChangeLanguage('en')}
        >
          <Text style={styles.optionText}>🇬🇧 English</Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
};

export default ThemeAndLanguageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#203061',
  },

  header: {
    paddingTop: 40,
    paddingBottom: 20,
    alignItems: 'center',
  },

  headerTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: 1,
  },

  headerSub: {
    fontSize: 15,
    color: '#a7b4e3',
    marginTop: 4,
  },

  section: {
    backgroundColor: '#ffffff22',
    marginHorizontal: 22,
    padding: 18,
    borderRadius: 18,
    marginTop: 20,
  },

  sectionTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 15,
  },

  option: {
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 14,
    backgroundColor: '#ffffff11',
    marginBottom: 12,
  },

  activeOption: {
    backgroundColor: '#6f9dffaa',
  },

  optionText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
  },
});
