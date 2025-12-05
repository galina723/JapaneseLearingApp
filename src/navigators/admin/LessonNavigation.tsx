import { View, Text } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LessonDetailScreen from '../../screens/lesson/LessonDetailScreen';
import EditLessonScreen from '../../screens/onlyforadmin/lesson/EditLessonScreen';
import AddLessonScreen from '../../screens/onlyforadmin/lesson/AddLessonScreen';
import LessonScreen from '../../screens/onlyforadmin/lesson/LessonScreen';
import AddLessonDetailScreen from '../../screens/onlyforadmin/lesson/AddLessonDetailScreen';
import QuizScreen from '../../screens/onlyforadmin/quiz/QuizScreen';
import QuizDetailScreen from '../../screens/onlyforadmin/quiz/QuizDetailScreen';
import AddQuizScreen from '../../screens/onlyforadmin/quiz/AddQuizScreen';
import EditQuizScreen from '../../screens/onlyforadmin/quiz/EditQuizScreen';

const LessonNavigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'none',
      }}
    >
      <Stack.Screen name="LessonScreen" component={LessonScreen} />
      <Stack.Screen name="LessonDetailScreen" component={LessonDetailScreen} />
      <Stack.Screen name="EditLessonScreen" component={EditLessonScreen} />
      <Stack.Screen name="AddLessonScreen" component={AddLessonScreen} />
      <Stack.Screen
        name="AddLessonDetailScreen"
        component={AddLessonDetailScreen}
      />
      <Stack.Screen name="QuizScreen" component={QuizScreen} />
      <Stack.Screen name="QuizDetailScreen" component={QuizDetailScreen} />
      <Stack.Screen name="AddQuizScreen" component={AddQuizScreen} />
      <Stack.Screen name="EditQuizScreen" component={EditQuizScreen} />
    </Stack.Navigator>
  );
};

export default LessonNavigation;
