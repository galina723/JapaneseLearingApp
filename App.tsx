import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthNavigator from './src/navigators/user/AuthNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import './src/translations/i18n';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    checkCurrentLanguage();
  }, []);

  const checkCurrentLanguage = async () => {
    const result = await AsyncStorage.getItem('language');
    if (result) {
      handleSetLanguage(result);
    } else {
      await AsyncStorage.setItem('language', 'vi');
      handleSetLanguage('vi');
    }
  };

  const handleSetLanguage = (currentLang: string) => {
    i18n.changeLanguage(currentLang);
    i18n.language = currentLang;
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <GestureHandlerRootView>
        <PaperProvider>
          <NavigationContainer>
            <AuthNavigator />
          </NavigationContainer>
        </PaperProvider>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default App;
