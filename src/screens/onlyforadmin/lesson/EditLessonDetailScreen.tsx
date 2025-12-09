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
  Modal,
  FlatList,
} from 'react-native';

const EditLessonDetailScreen = () => {
  const navigation: any = useNavigation();
  const route = useRoute<any>();

  const { lessonDetailId, lessonId } = route.params;

  const [order, setOrder] = useState('');
  const [jsonData, setJsonData] = useState('');
  const [selectedCat, setSelectedCat] = useState<any>(null);
  const [openCatModal, setOpenCatModal] = useState(false);

  const types = [
    { id: 1, name: 'Vocabulary' },
    { id: 2, name: 'Grammar' },
    { id: 3, name: 'Kanji' },
  ];

  useEffect(() => {
    loadDetailData();
  }, []);

  const loadDetailData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await axios.get(
        `https://lumbar-mora-uncoroneted.ngrok-free.dev/api/lessons/${lessonId}/details`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (res.status === 200) {
        const list = res.data.data;
        const currentDetail = list.find(
          (item: any) => item.lessonDetailId === lessonDetailId,
        );

        if (currentDetail) {
          setOrder(String(currentDetail.order));

          const foundType = types.find(t => t.id === currentDetail.type);
          setSelectedCat(foundType || null);

          try {
            const parsed = JSON.parse(currentDetail.lessonData);
            if (Array.isArray(parsed) && parsed.length > 0) {
              setJsonData(parsed[0].text || '');
            } else {
              setJsonData(currentDetail.lessonData);
            }
          } catch (e) {
            setJsonData(currentDetail.lessonData);
          }
        }
      }
    } catch (err) {
      console.log('Error loading detail:', err);
      Alert.alert('Error', 'Could not load lesson detail data.');
    }
  };

  const handleUpdate = async () => {
    if (!selectedCat || !order || !jsonData) {
      Alert.alert('Missing data', 'Please fill all fields.');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('token');

      const dataToUpdate = {
        lessonDetailId: lessonDetailId,
        type: selectedCat.id,
        order: Number(order),
        jsonData: JSON.stringify([{ id: 1, text: jsonData, audio: '' }]),
      };

      console.log('Sending Payload:', dataToUpdate);

      const url = `https://lumbar-mora-uncoroneted.ngrok-free.dev/api/lessons/${lessonId}/section`;

      const res = await axios.post(url, dataToUpdate, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Update Response:', res.data);

      if (res.data.success || res.status === 200) {
        Alert.alert('Success', 'Lesson detail updated successfully!');
        navigation.navigate('LessonScreen');
      } else {
        Alert.alert('Failed', res.data.message || 'Unknown error from server');
      }
    } catch (err: any) {
      console.log(
        'Error updating lesson detail:',
        err.response?.data || err.message,
      );
      Alert.alert('Error', 'Failed to update lesson detail');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Edit Lesson Detail</Text>

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
          placeholder="Enter order number"
        />

        <Text style={styles.label}>Content Data</Text>
        <TextInput
          style={[styles.input, { height: 150, textAlignVertical: 'top' }]}
          value={jsonData}
          multiline
          placeholder="Edit content here..."
          onChangeText={setJsonData}
        />
      </View>

      <TouchableOpacity style={styles.saveBtn} onPress={handleUpdate}>
        <Text style={styles.saveText}>Save Changes</Text>
      </TouchableOpacity>

      <Modal visible={openCatModal} transparent animationType="slide">
        <View style={styles.modalWrapper}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Select type</Text>

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

export default EditLessonDetailScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#F7F7F7' },
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
    marginBottom: 20,
    // Shadow cho đẹp
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  label: { fontSize: 15, fontWeight: '600', marginBottom: 6, color: '#555' },
  input: {
    backgroundColor: '#F3F3F3',
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
    fontSize: 15,
    color: '#333',
  },
  saveBtn: {
    backgroundColor: '#4169E1',
    paddingVertical: 14,
    borderRadius: 10,
    shadowColor: '#4169E1',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
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
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
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
