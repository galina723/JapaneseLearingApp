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

interface Question {
  questionId: number;
  questionText: string;
  options: string; // JSON string
  pointValue: number;
}

const QuizScreen = () => {
  const navigation: any = useNavigation();
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

      /** 1️⃣ Lấy quiz theo lessonId */
      const quizRes = await axios.get(
        `https://lumbar-mora-uncoroneted.ngrok-free.dev/api/quizzes/${lessonId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (!quizRes.data.data) return;

      const q = quizRes.data.data;
      setQuizId(q.quizId);
      setQuizTitle(q.title);

      /** 2️⃣ Lấy question theo quizId */
      const quesRes = await axios.get(
        `https://lumbar-mora-uncoroneted.ngrok-free.dev/api/quizzes/${q.quizId}/questions`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      setQuestions(quesRes.data.data);
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
        <Text style={styles.submitText}>Submit Quiz</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default QuizScreen;

/* ---------------------------- STYLES ---------------------------- */

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
