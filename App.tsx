import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthNavigator from './src/navigators/user/AuthNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {
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
