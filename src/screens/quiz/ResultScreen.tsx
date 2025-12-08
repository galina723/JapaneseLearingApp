import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const ResultScreen = () => {
  const navigation: any = useNavigation();
  const { t } = useTranslation();
  const route = useRoute();

  const { selected, quizId } = route.params as any;

  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [xpGained, setXpGained] = useState(0);

  useEffect(() => {
    submitQuiz();
  }, []);

  const submitQuiz = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');

      const answersArray = Object.keys(selected).map(qId => ({
        questionId: Number(qId),
        answer: selected[qId],
      }));

      const body = {
        quizId: quizId,
        answers: answersArray,
      };

      console.log(body);

      const res = await axios.post(
        'https://lumbar-mora-uncoroneted.ngrok-free.dev/api/quizzes/submit',
        body,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      console.log('>>>>>>', res);

      const result = res.data.data;

      const gained = result.xpGained ?? 0;
      setScore(result.totalScore ?? 0);
      setXpGained(gained);

      const oldXP = Number(await AsyncStorage.getItem('xp')) || 0;
      const newXP = oldXP + gained;

      await AsyncStorage.setItem('xp', String(newXP));

      console.log('XP OLD:', oldXP);
      console.log('XP GAINED:', gained);
      console.log('XP NEW:', newXP);
    } catch (err) {
      console.log('ERROR SUBMIT QUIZ:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#8a4fff" />
        <Text>Đang chấm điểm...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎉 {t('Result')} 🎉</Text>

      <View style={styles.box}>
        <Text style={styles.label}>{t('Yourscore')}:</Text>
        <Text style={styles.score}>{score}</Text>

        <Text style={styles.label}>XP:</Text>
        <Text style={styles.xp}>+{xpGained} XP</Text>
      </View>

      <TouchableOpacity
        style={styles.homeBtn}
        onPress={() => navigation.navigate('HomeScreen')}
      >
        <Text style={styles.homeText}>{t('Backtohome')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ResultScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#faf0ff',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#6a1b9a',
    marginBottom: 20,
  },

  box: {
    width: '90%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#d5b3ff',
    marginBottom: 30,
  },

  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#3a2d6f',
    textAlign: 'center',
    marginTop: 10,
  },

  score: {
    fontSize: 40,
    fontWeight: '900',
    color: '#8a4fff',
    textAlign: 'center',
    marginBottom: 10,
  },

  xp: {
    fontSize: 32,
    fontWeight: '800',
    color: '#00a86b',
    textAlign: 'center',
  },

  homeBtn: {
    backgroundColor: '#8a4fff',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 20,
  },
  homeText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
});
