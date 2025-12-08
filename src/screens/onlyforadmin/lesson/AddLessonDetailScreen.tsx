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
  Modal,
  FlatList,
} from 'react-native';

const AddLessonDetailScreen = () => {
  const navigation: any = useNavigation();
  const route = useRoute<any>();
  const { lessonId } = route.params;

  const [order, setOrder] = useState('');
  const [jsonData, setJsonData] = useState('');
  const [selectedCat, setSelectedCat] = useState<any>(null);
  const [openCatModal, setOpenCatModal] = useState(false);

  const types = [
    { id: 1, name: 'Vocabulary' },
    { id: 2, name: 'Grammar' },
    { id: 3, name: 'Kanji' },
  ];

  const handleSave = async () => {
    if (!selectedCat || !order || !jsonData) {
      Alert.alert('Missing data', 'Please fill all fields.');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('token');

      const dataT = {
        type: selectedCat.id,
        order: Number(order),
        jsonData: JSON.stringify([{ id: 1, text: jsonData, audio: '' }]),
      };

      console.log(dataT, token, lessonId);

      await axios.post(
        `https://lumbar-mora-uncoroneted.ngrok-free.dev/api/lessons/${lessonId}/section`,
        dataT,
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

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Add Lesson Detail</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Type</Text>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setOpenCatModal(true)}
        >
          <Text style={{ fontSize: 15, color: selectedCat ? '#333' : '#888' }}>
            {selectedCat ? selectedCat.name : 'Select type'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.label}>Order</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={order}
          onChangeText={setOrder}
          placeholder="Thứ tự hiển thị"
        />

        <Text style={styles.label}>Data</Text>

        <TextInput
          style={[styles.input, { height: 150, textAlignVertical: 'top' }]}
          value={jsonData}
          multiline
          placeholder="VD: 1.あ: a; 2.い: i"
          onChangeText={setJsonData}
        />
      </View>

      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveText}>Save Detail</Text>
      </TouchableOpacity>

      {/* Modal chọn type */}
      <Modal visible={openCatModal} transparent animationType="slide">
        <View style={styles.modalWrapper}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Select Category</Text>

            <FlatList
              data={types}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => {
                    setSelectedCat(item);
                    setOpenCatModal(false);
                  }}
                >
                  <Text style={styles.modalItemText}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />

            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setOpenCatModal(false)}
            >
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  dropdown: {
    backgroundColor: '#F3F3F3',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
  },
  modalWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalBox: {
    backgroundColor: '#FFF',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '60%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  modalItem: {
    paddingVertical: 14,
  },
  modalItemText: {
    fontSize: 16,
    color: '#333',
  },
  closeBtn: {
    marginTop: 18,
    paddingVertical: 12,
    backgroundColor: '#EEE',
    borderRadius: 10,
  },
  closeText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
});

export interface LessonDetail {
  lessonId: number;
  lessonName: string;
  type: number;
  order: number;
  lessonData: string;
}
