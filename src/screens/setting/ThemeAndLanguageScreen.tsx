import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';

const ThemeAndLanguageScreen = () => {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');
  const [language, setLanguage] = useState<'vi' | 'en'>('vi');

  return (
    <ScrollView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
        <Text style={styles.headerSub}>Theme & Language</Text>
      </View>

      {/* THEME SECTION */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎨 Theme</Text>

        <TouchableOpacity
          style={[styles.option, theme === 'light' && styles.activeOption]}
          onPress={() => setTheme('light')}
        >
          <Text style={styles.optionText}>🌞 Light</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.option, theme === 'dark' && styles.activeOption]}
          onPress={() => setTheme('dark')}
        >
          <Text style={styles.optionText}>🌙 Dark</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.option, theme === 'system' && styles.activeOption]}
          onPress={() => setTheme('system')}
        >
          <Text style={styles.optionText}>⚙️ System Default</Text>
        </TouchableOpacity>
      </View>

      {/* LANGUAGE SECTION */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🌏 Language</Text>

        <TouchableOpacity
          style={[styles.option, language === 'vi' && styles.activeOption]}
          onPress={() => setLanguage('vi')}
        >
          <Text style={styles.optionText}>🇻🇳 Vietnamese</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.option, language === 'en' && styles.activeOption]}
          onPress={() => setLanguage('en')}
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
