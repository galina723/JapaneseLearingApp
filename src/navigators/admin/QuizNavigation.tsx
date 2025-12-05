import { View, Text } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Screen } from 'react-native-screens';
import QuizScreen from '../../screens/quiz/QuizScreen';
import QuizDetailScreen from '../../screens/onlyforadmin/quiz/question/QuestionScreen';
import AddQuizScreen from '../../screens/onlyforadmin/quiz/AddQuizScreen';
import EditQuizScreen from '../../screens/onlyforadmin/quiz/EditQuizScreen';

const QuizNavigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'none',
      }}
    >
      <Stack.Screen
        name="QuizScreen"
        component={QuizScreen}
        initialParams={{ refetch: false }}
      />
      <Stack.Screen name="QuizDetailScreen" component={QuizDetailScreen} />
      <Stack.Screen name="AddQuizScreen" component={AddQuizScreen} />
      <Stack.Screen name="EditQuizScreen" component={EditQuizScreen} />
    </Stack.Navigator>
  );
};

export default QuizNavigation;
