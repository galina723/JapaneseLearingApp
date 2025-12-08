import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EditLessonScreen from '../../screens/onlyforadmin/lesson/EditLessonScreen';
import AddLessonScreen from '../../screens/onlyforadmin/lesson/AddLessonScreen';
import LessonScreen from '../../screens/onlyforadmin/lesson/LessonScreen';
import AddLessonDetailScreen from '../../screens/onlyforadmin/lesson/AddLessonDetailScreen';
import QuizScreen from '../../screens/onlyforadmin/quiz/QuizScreen';
import AddQuizScreen from '../../screens/onlyforadmin/quiz/AddQuizScreen';
import EditQuizScreen from '../../screens/onlyforadmin/quiz/EditQuizScreen';
import LessonDetailScreen from '../../screens/onlyforadmin/lesson/LessonDetailScreen';
import AddQuestionDetailScreen from '../../screens/onlyforadmin/quiz/question/AddQuestionDetailScreen';
import QuestionScreen from '../../screens/onlyforadmin/quiz/question/QuestionScreen';
import EditQuestionDetailScreen from '../../screens/onlyforadmin/quiz/question/EditQuestionDetailScreen';
import EditLessonDetailScreen from '../../screens/onlyforadmin/lesson/EditLessonDetailScreen';

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
      <Stack.Screen name="QuestionScreen" component={QuestionScreen} />
      <Stack.Screen name="AddQuizScreen" component={AddQuizScreen} />
      <Stack.Screen name="EditQuizScreen" component={EditQuizScreen} />
      <Stack.Screen
        name="AddQuestionDetailScreen"
        component={AddQuestionDetailScreen}
      />
      <Stack.Screen
        name="EditQuestionDetailScreen"
        component={EditQuestionDetailScreen}
      />
      <Stack.Screen
        name="EditLessonDetailScreen"
        component={EditLessonDetailScreen}
      />
    </Stack.Navigator>
  );
};

export default LessonNavigation;
