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
} from 'react-native';

export interface Root {
  questionText: string;
  options: string;
  correctAnswer: string;
  pointValue: number;
}

const EditQuestionDetailScreen = () => {
  const navigation: any = useNavigation();
  const route = useRoute<any>();
  const { questionId } = route.params;

  const [loading, setLoading] = useState(true);

  const [questionText, setQuestionText] = useState('');
  const [option1, setOption1] = useState('');
  const [option2, setOption2] = useState('');
  const [option3, setOption3] = useState('');
  const [option4, setOption4] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [pointValue, setPointValue] = useState('');

  const loadQuestion = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      console.log(questionId);

      const res = await axios.get(
        `https://lumbar-mora-uncoroneted.ngrok-free.dev/api/questions/${questionId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const data = res.data.data;

      console.log(11111, res);

      setQuestionText(data.questionText);
      setCorrectAnswer(data.correctAnswer);
      setPointValue(String(data.pointValue));

      // parse JSON options
      let opts: string[] = [];
      try {
        opts = JSON.parse(data.options);
      } catch (e) {
        console.log('Failed to parse options', e);
      }

      setOption1(opts[0] || '');
      setOption2(opts[1] || '');
      setOption3(opts[2] || '');
      setOption4(opts[3] || '');
    } catch (err: any) {
      console.log('Error loading question:', err.response?.data || err);
      Alert.alert('Error', 'Failed to load question');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadQuestion();
  }, []);

  const handleSave = async () => {
    if (
      !questionText ||
      !option1 ||
      !option2 ||
      !option3 ||
      !option4 ||
      !correctAnswer ||
      !pointValue
    ) {
      Alert.alert('Missing data', 'Please fill all fields.');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('token');

      const optionArray = [option1, option2, option3, option4];
      const optionsJson = JSON.stringify(optionArray);

      const payload: Root = {
        questionText,
        options: optionsJson,
        correctAnswer,
        pointValue: Number(pointValue),
      };

      console.log('UPDATE PAYLOAD:', payload);

      await axios.put(
        `https://lumbar-mora-uncoroneted.ngrok-free.dev/api/questions/${questionId}`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      Alert.alert('Success', 'Question updated!');
      navigation.goBack();
    } catch (err: any) {
      console.log('Error updating:', err.response?.data || err);
      Alert.alert('Error', 'Failed to update question');
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Loading question...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Edit Question</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Question Text</Text>
        <TextInput
          style={styles.input}
          value={questionText}
          onChangeText={setQuestionText}
        />

        <Text style={styles.label}>Option 1</Text>
        <TextInput
          style={styles.input}
          value={option1}
          onChangeText={setOption1}
        />

        <Text style={styles.label}>Option 2</Text>
        <TextInput
          style={styles.input}
          value={option2}
          onChangeText={setOption2}
        />

        <Text style={styles.label}>Option 3</Text>
        <TextInput
          style={styles.input}
          value={option3}
          onChangeText={setOption3}
        />

        <Text style={styles.label}>Option 4</Text>
        <TextInput
          style={styles.input}
          value={option4}
          onChangeText={setOption4}
        />

        <Text style={styles.label}>Correct Answer</Text>
        <TextInput
          style={styles.input}
          value={correctAnswer}
          onChangeText={setCorrectAnswer}
        />

        <Text style={styles.label}>Point Value</Text>
        <TextInput
          style={styles.input}
          value={pointValue}
          keyboardType="numeric"
          onChangeText={setPointValue}
        />
      </View>

      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveText}>Save Changes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EditQuestionDetailScreen;

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
    backgroundColor: '#FF8C00',
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
