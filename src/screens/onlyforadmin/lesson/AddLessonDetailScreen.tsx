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

const AddLessonDetailScreen = () => {
  const navigation: any = useNavigation();
  const route = useRoute<any>();
  const { lessonId } = route.params;

  const [type, setType] = useState('');
  const [order, setOrder] = useState('');
  const [jsonData, setJsonData] = useState('');

  const handleSave = async () => {
    if (!type || !order || !jsonData) {
      Alert.alert('Missing data', 'Please fill all fields.');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('token');

      await axios.post(
        `https://lumbar-mora-uncoroneted.ngrok-free.dev/api/lessons/${lessonId}/details`,
        {
          type: Number(type),
          order: Number(order),
          jsonData: jsonData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      Alert.alert('Success', 'Lesson detail created!');
      navigation.goBack();
    } catch (err: any) {
      console.log('Error creating lesson detail:', err.response?.data || err);
      Alert.alert('Error', 'Failed to create lesson detail');
    }
  };

  // 👉 Auto format JSON (optional but helpful)
  const formatJSON = () => {
    try {
      const parsed = JSON.parse(jsonData);
      setJsonData(JSON.stringify(parsed, null, 2));
    } catch {
      Alert.alert('Invalid JSON', 'Please check your JSON structure.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Add Lesson Detail</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Type</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={type}
          onChangeText={setType}
          placeholder="Ví dụ: 0, 1, 2..."
        />

        <Text style={styles.label}>Order</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={order}
          onChangeText={setOrder}
          placeholder="Thứ tự hiển thị"
        />

        <Text style={styles.label}>JSON Data</Text>

        <TextInput
          style={[styles.input, { height: 150, textAlignVertical: 'top' }]}
          value={jsonData}
          multiline
          placeholder='VD: {"question": "...", "answer": "..."}'
          onChangeText={setJsonData}
        />

        <TouchableOpacity style={styles.formatBtn} onPress={formatJSON}>
          <Text style={styles.formatText}>Format JSON</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveText}>Save Detail</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddLessonDetailScreen;

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
  formatBtn: {
    backgroundColor: '#DDD',
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: -4,
  },
  formatText: {
    textAlign: 'center',
    fontWeight: '600',
    color: '#333',
  },
});
