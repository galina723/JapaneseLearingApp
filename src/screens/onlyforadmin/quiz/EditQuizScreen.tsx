import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';

const EditQuizScreen = () => {
  const navigation: any = useNavigation();
  const route = useRoute<any>();
  const { quizId } = route.params;

  const [quizTitle, setQuizTitle] = useState('');
  const [timeLimit, setTimeLimit] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const res = await axios.get(
          `https://lumbar-mora-uncoroneted.ngrok-free.dev/api/quizzes/${quizId}`,
          { headers: { Authorization: `Bearer ${token}` } },
        );

        console.log(res);

        const quiz = res.data.data;
        setQuizTitle(quiz.title);
        setTimeLimit(String(quiz.timeLimit));
      } catch (err: any) {
        console.log('Error fetching quiz:', err.response?.data || err);
        Alert.alert('Error', 'Failed to load quiz');
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [quizId]);

  const handleSave = async () => {
    if (!quizTitle || !timeLimit) {
      Alert.alert('Missing data', 'Please fill all fields.');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('token');

      const payload = {
        title: quizTitle,
        timeLimit: Number(timeLimit),
      };

      await axios.put(
        `https://lumbar-mora-uncoroneted.ngrok-free.dev/api/quizzes/${quizId}`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      Alert.alert('Success', 'Quiz updated!');
      navigation.goBack();
    } catch (err: any) {
      console.log('Error updating quiz:', err.response?.data || err);
      Alert.alert('Error', 'Failed to update quiz');
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#4169E1" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Edit Quiz</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          placeholder="Quiz title..."
          value={quizTitle}
          onChangeText={setQuizTitle}
        />

        <Text style={styles.label}>Time Limit (seconds)</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. 60"
          value={timeLimit}
          keyboardType="numeric"
          onChangeText={setTimeLimit}
        />
      </View>

      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveText}>Update Quiz</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EditQuizScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#FFF' },
  header: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 12,
    color: '#333',
  },
  card: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EEE',
    marginBottom: 20,
  },
  label: { fontSize: 15, fontWeight: '600', marginBottom: 4 },
  input: {
    backgroundColor: '#F3F3F3',
    padding: 12,
    borderRadius: 10,
    marginBottom: 14,
    fontSize: 15,
  },
  saveBtn: {
    backgroundColor: '#4169E1',
    paddingVertical: 14,
    borderRadius: 10,
  },
  saveText: {
    fontSize: 17,
    color: '#FFF',
    textAlign: 'center',
    fontWeight: '700',
  },
});
