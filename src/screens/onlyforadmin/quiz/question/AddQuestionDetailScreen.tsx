import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
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

const AddQuestionDetailScreen = () => {
  const navigation: any = useNavigation();
  const route = useRoute<any>();
  const { quizId } = route.params;

  const [questionText, setQuestionText] = useState('');
  const [option1, setOption1] = useState('');
  const [option2, setOption2] = useState('');
  const [option3, setOption3] = useState('');
  const [option4, setOption4] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [pointValue, setPointValue] = useState('');

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

      console.log(payload);

      await axios.post(
        `https://lumbar-mora-uncoroneted.ngrok-free.dev/api/quizzes/${quizId}/questions`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      Alert.alert('Success', 'Question added!');
      navigation.goBack();
    } catch (err: any) {
      console.log('Error creating question:', err.response?.data || err);
      Alert.alert('Error', 'Failed to create question');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Add Question</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Question Text</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter question..."
          value={questionText}
          onChangeText={setQuestionText}
        />

        {/* OPTION INPUTS */}
        <Text style={styles.label}>Option 1</Text>
        <TextInput
          style={styles.input}
          placeholder="Option 1"
          value={option1}
          onChangeText={setOption1}
        />

        <Text style={styles.label}>Option 2</Text>
        <TextInput
          style={styles.input}
          placeholder="Option 2"
          value={option2}
          onChangeText={setOption2}
        />

        <Text style={styles.label}>Option 3</Text>
        <TextInput
          style={styles.input}
          placeholder="Option 3"
          value={option3}
          onChangeText={setOption3}
        />

        <Text style={styles.label}>Option 4</Text>
        <TextInput
          style={styles.input}
          placeholder="Option 4"
          value={option4}
          onChangeText={setOption4}
        />

        <Text style={styles.label}>Correct Answer</Text>
        <TextInput
          style={styles.input}
          placeholder="Correct option..."
          value={correctAnswer}
          onChangeText={setCorrectAnswer}
        />

        <Text style={styles.label}>Point Value</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. 5"
          value={pointValue}
          keyboardType="numeric"
          onChangeText={setPointValue}
        />
      </View>

      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveText}>Save Question</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddQuestionDetailScreen;

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
