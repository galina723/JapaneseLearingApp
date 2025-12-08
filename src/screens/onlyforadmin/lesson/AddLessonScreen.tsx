import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Switch,
  ScrollView,
  Modal,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const categories = [
  { id: 1, name: 'Beginner' },
  { id: 2, name: 'Intermediate' },
  { id: 3, name: 'Advanced' },
  { id: 4, name: 'Expert' },
];

const AddLessonScreen = () => {
  const navigation: any = useNavigation();

  const [lessonName, setLessonName] = useState('');
  const [description, setDescription] = useState('');
  const [order, setOrder] = useState('');
  const [status, setStatus] = useState(true);

  const [selectedCat, setSelectedCat] = useState<any>(null);
  const [openCatModal, setOpenCatModal] = useState(false);

  const fetchOrderByCategory = async (catId: number) => {
    try {
      const token = await AsyncStorage.getItem('token');

      const res = await axios.get(
        'https://lumbar-mora-uncoroneted.ngrok-free.dev/api/lessons',
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (res.status === 200) {
        const allLessons = res.data.data;

        const filtered = allLessons.filter((x: any) => x.categoryId === catId);

        const newOrder = filtered.length + 1;

        setOrder(String(newOrder));

        console.log('Auto ORDER for category', catId, '=', newOrder);
      }
    } catch (err) {
      console.log('Error loading order:', err);
    }
  };

  const handleSave = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      const res = await axios.post(
        'https://lumbar-mora-uncoroneted.ngrok-free.dev/api/lessons',
        {
          lessonName: lessonName,
          description: description,
          order: Number(order),
          categoryId: selectedCat?.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log('Saved:', res.data);

      navigation.goBack();
    } catch (err: any) {
      console.log('Save error:', err.response?.data || err.message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Create Lesson</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Lesson Name</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Basic Grammar"
          value={lessonName}
          onChangeText={setLessonName}
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, { height: 90 }]}
          placeholder="Short description..."
          value={description}
          multiline
          onChangeText={setDescription}
        />

        <Text style={styles.label}>Order (auto)</Text>
        <TextInput
          style={[styles.input, { backgroundColor: '#E5E5E5' }]}
          value={order}
          editable={false}
        />

        <Text style={styles.label}>Category</Text>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setOpenCatModal(true)}
        >
          <Text style={{ fontSize: 15, color: selectedCat ? '#333' : '#888' }}>
            {selectedCat ? selectedCat.name : 'Select category'}
          </Text>
        </TouchableOpacity>

        <View style={styles.switchRow}>
          <Text style={styles.label}>Status</Text>
          <Switch value={status} onValueChange={setStatus} />
        </View>
      </View>

      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveText}>Save Lesson</Text>
      </TouchableOpacity>

      <Modal visible={openCatModal} transparent animationType="slide">
        <View style={styles.modalWrapper}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Select Category</Text>

            <FlatList
              data={categories}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => {
                    setSelectedCat(item);
                    setOpenCatModal(false);

                    fetchOrderByCategory(item.id);
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

export default AddLessonScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    padding: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 12,
    color: '#333',
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 6,
    color: '#444',
  },
  input: {
    backgroundColor: '#F3F3F3',
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
    marginBottom: 16,
  },
  dropdown: {
    backgroundColor: '#F3F3F3',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  saveBtn: {
    backgroundColor: '#4169E1',
    paddingVertical: 14,
    borderRadius: 12,
  },
  saveText: {
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '700',
    color: '#FFF',
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
