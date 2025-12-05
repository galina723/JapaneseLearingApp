import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import { FAB } from 'react-native-paper';
import { Question } from '../../../../models/Question';

const QuestionScreen = () => {
  const navigation: any = useNavigation();
  const route = useRoute<any>();
  const { quizId } = route.params;

  const [question, setQuestion] = useState<Question[]>([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedQuestionId, setSelectedQuestionId] = useState<number | null>(
    null,
  );

  const loadQuestion = async () => {
    console.log(quizId);
    const res = await axios.get(
      `https://lumbar-mora-uncoroneted.ngrok-free.dev/api/quizzes/${quizId}/questions`,
      {
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
        },
      },
    );
    console.log(res);
    if (res.status === 200) setQuestion(res.data.data);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadQuestion);
    return unsubscribe;
  }, []);

  const deleteQuestion = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      await axios.delete(
        `https://lumbar-mora-uncoroneted.ngrok-free.dev/api/questions/${selectedQuestionId}`,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      setDeleteModal(false);
      loadQuestion(); // reload list
    } catch (err) {
      console.log('Delete error:', err);
    }
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Question</Text>
        {question.length === 0 && <Text>No question found.</Text>}
        {question.map(q => (
          <View key={q.questionId} style={styles.card}>
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>
                {q.questionText + ' (' + q.pointValue + ' points)'}
              </Text>
              {q.options &&
                JSON.parse(q.options.toString()).map((e: string, i: number) => {
                  return (
                    <Text style={styles.time} key={i}>
                      {i + 1 + ': ' + e}
                    </Text>
                  );
                })}
              <View style={{ flexDirection: 'row', flex: 1, paddingTop: 8 }}>
                <TouchableOpacity
                  style={[styles.deleteBtn, { backgroundColor: 'orange' }]}
                  onPress={() => {
                    navigation.navigate('EditQuestionDetailScreen', {
                      questionId: q.questionId,
                    });
                  }}
                >
                  <Text style={{ color: 'white', textAlign: 'center' }}>
                    Edit
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteBtn}
                  onPress={() => {
                    setSelectedQuestionId(q.questionId);
                    setDeleteModal(true);
                  }}
                >
                  <Text style={{ color: 'white', textAlign: 'center' }}>
                    Delete
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() =>
          navigation.navigate('AddQuestionDetailScreen', { quizId: quizId })
        }
      />
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

              <TouchableOpacity style={styles.okBtn} onPress={deleteQuestion}>
                <Text style={{ color: '#FFF' }}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default QuestionScreen;

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
    flex: 1,
  },

  fab: { position: 'absolute', bottom: 20, right: 20 },

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
