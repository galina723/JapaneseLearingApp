import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Modal,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';

interface Quiz {
  quizId: number;
  title: string;
  timeLimit: number;
}

const QuizScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { lessonId } = route.params; // ⭐ chỉ có lessonId

  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);

  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedQuizId, setSelectedQuizId] = useState<number | null>(null);

  const loadQuizzes = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      const res = await axios.get(
        `https://lumbar-mora-uncoroneted.ngrok-free.dev/api/quizzes/lesson/${lessonId}`,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      setQuizzes(res.data.data);
    } catch (err) {
      console.log('Quiz load error:', err);
    } finally {
      setLoading(false);
    }
  };

  const deleteQuiz = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      await axios.delete(
        `https://lumbar-mora-uncoroneted.ngrok-free.dev/api/quizzes/${selectedQuizId}`,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      setDeleteModal(false);
      loadQuizzes(); // reload list
    } catch (err) {
      console.log('Delete error:', err);
    }
  };

  useEffect(() => {
    loadQuizzes();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Quizzes</Text>

      {quizzes.length === 0 && <Text>No quizzes found.</Text>}

      {quizzes.map(q => (
        <View key={q.quizId} style={styles.card}>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() =>
              navigation.navigate('QuizDetailScreen', { quizId: q.quizId })
            }
          >
            <Text style={styles.title}>{q.title}</Text>
            <Text style={styles.time}>Time Limit: {q.timeLimit}s</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.deleteBtn}
            onPress={() => {
              setSelectedQuizId(q.quizId);
              setDeleteModal(true);
            }}
          >
            <Text style={{ color: 'white' }}>Delete</Text>
          </TouchableOpacity>
        </View>
      ))}

      {/* DELETE MODAL */}
      <Modal visible={deleteModal} transparent animationType="fade">
        <View style={styles.modalBg}>
          <View style={styles.modalCard}>
            <Text style={styles.modalText}>Delete this quiz?</Text>

            <View style={styles.rowBtns}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setDeleteModal(false)}
              >
                <Text>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.okBtn} onPress={deleteQuiz}>
                <Text style={{ color: '#FFF' }}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default QuizScreen;

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#FFF', flex: 1 },
  header: { fontSize: 22, fontWeight: '700', marginBottom: 16 },
  card: {
    backgroundColor: '#FFF',
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#EEE',
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: { fontSize: 17, fontWeight: '700' },
  time: { marginTop: 4, color: '#666' },
  deleteBtn: {
    backgroundColor: '#FF4D4D',
    padding: 10,
    borderRadius: 8,
    marginLeft: 10,
  },

  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  modalBg: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    backgroundColor: '#FFF',
    padding: 20,
    width: '80%',
    borderRadius: 12,
  },
  modalText: { fontSize: 18, fontWeight: '600', marginBottom: 20 },
  rowBtns: { flexDirection: 'row', justifyContent: 'flex-end' },
  cancelBtn: {
    padding: 10,
    marginRight: 12,
  },
  okBtn: {
    backgroundColor: '#FF4D4D',
    padding: 10,
    borderRadius: 6,
  },
});
