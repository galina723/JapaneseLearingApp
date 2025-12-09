import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';

interface Question {
  questionId: number;
  questionText: string;
  options: string;
  pointValue: number;
}

const QuizScreen = () => {
  const navigation: any = useNavigation();
  const { t } = useTranslation();
  const route = useRoute();
  const lessonId = (route.params as any)?.lessonId;

  const [quizId, setQuizId] = useState<number>();
  const [quizTitle, setQuizTitle] = useState<string>('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selected, setSelected] = useState<{ [key: number]: string }>({});
  const [loading, setLoading] = useState(true);

  const loadQuiz = async () => {
    try {
      setLoading(true);

      const token = await AsyncStorage.getItem('token');
      console.log(quizId, lessonId);
      const quizRes = await axios.get(
        `https://lumbar-mora-uncoroneted.ngrok-free.dev/api/lessons/${lessonId}/quizzes`,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      console.log(1, quizRes);

      if (!quizRes.data.data) return;

      const q = quizRes.data.data[0];
      setQuizId(q.quizId);
      setQuizTitle(q.title);

      const quesRes = await axios.get(
        `https://lumbar-mora-uncoroneted.ngrok-free.dev/api/quizzes/${q.quizId}/questions`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      setQuestions(quesRes.data.data);
      console.log(quesRes);
    } catch (err) {
      console.log('ERR QUIZ:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadQuiz();
  }, [lessonId]);

  const submitQuiz = () => {
    console.log('Your answers:', selected);

    navigation.navigate('ResultScreen', { selected, quizId });
  };

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#8a4fff" />
        <Text>Loading Quiz...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.quizTitle}>{quizTitle}</Text>

      {questions.map((q, idx) => {
        const ops = JSON.parse(q.options);

        return (
          <View key={q.questionId} style={styles.questionCard}>
            <Text style={styles.questionText}>
              {idx + 1}. {q.questionText}
            </Text>

            {ops.map((o: string) => (
              <TouchableOpacity
                key={o}
                style={[
                  styles.option,
                  selected[q.questionId] === o && styles.optionSelected,
                ]}
                onPress={() =>
                  setSelected(prev => ({ ...prev, [q.questionId]: o }))
                }
              >
                <Text
                  style={[
                    styles.optionText,
                    selected[q.questionId] === o && { color: 'white' },
                  ]}
                >
                  {o}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        );
      })}

      <TouchableOpacity style={styles.submitBtn} onPress={submitQuiz}>
        <Text style={styles.submitText}>{t('Submitquiz')}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default QuizScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#faf0ff',
  },

  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  quizTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#6a1b9a',
    marginBottom: 20,
    textAlign: 'center',
  },

  questionCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e3c8ff',
  },

  questionText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#3a2d6f',
    marginBottom: 10,
  },

  option: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#f5e6ff',
    marginBottom: 10,
  },

  optionSelected: {
    backgroundColor: '#8a4fff',
  },

  optionText: {
    fontSize: 16,
    color: '#3a2d6f',
  },

  submitBtn: {
    backgroundColor: '#8a4fff',
    paddingVertical: 14,
    borderRadius: 18,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 40,
  },

  submitText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
});
