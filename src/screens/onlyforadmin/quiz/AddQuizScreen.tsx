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

const AddQuizScreen = () => {
  const navigation: any = useNavigation();
  const route = useRoute<any>();
  const { lessonId } = route.params;

  const [quizTitle, setQuizTitle] = useState('');
  const [timeLimit, setTimeLimit] = useState('');

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

      await axios.post(
        `https://lumbar-mora-uncoroneted.ngrok-free.dev/api/lessons/${lessonId}/quizzes`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      Alert.alert('Success', 'Quiz created!');
      navigation.goBack();
    } catch (err: any) {
      console.log('Error creating quiz:', err.response?.data || err);
      Alert.alert('Error', 'Failed to create quiz');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Add Quiz</Text>

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
        <Text style={styles.saveText}>Save Quiz</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddQuizScreen;

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

  openModalBtn: {
    padding: 12,
    backgroundColor: '#DDD',
    borderRadius: 10,
    marginTop: 8,
  },
  openModalText: {
    textAlign: 'center',
    fontWeight: '600',
    color: '#333',
  },

  previewBox: {
    marginTop: 10,
    padding: 12,
    backgroundColor: '#EFEFEF',
    borderRadius: 10,
  },
  previewText: { fontSize: 14, color: '#444' },

  // MODAL
  modalWrapper: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'flex-end',
  },
  modalBox: {
    backgroundColor: '#FFF',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  modalSaveBtn: {
    paddingVertical: 12,
    backgroundColor: '#4169E1',
    borderRadius: 10,
    marginTop: 8,
  },
  modalSaveText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#FFF',
    fontWeight: '700',
  },
  closeModalBtn: {
    paddingVertical: 12,
    backgroundColor: '#EEE',
    borderRadius: 10,
    marginTop: 12,
  },
  closeModalText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
});
