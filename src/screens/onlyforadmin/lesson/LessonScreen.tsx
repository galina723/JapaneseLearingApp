import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { FAB } from 'react-native-paper';

export interface Lesson {
  lessonId: number;
  lessonName: string;
  description: string;
  categoryId: number;
  categoryName: string;
}

const LessonScreen = () => {
  const navigation: any = useNavigation();
  const [lessons, setLessons] = useState<Lesson[]>([]);

  const [actionModalVisible, setActionModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedLessonId, setSelectedLessonId] = useState<number | null>(null);

  const loadLessons = async () => {
    const res = await axios.get(
      'https://lumbar-mora-uncoroneted.ngrok-free.dev/api/lessons',
      {
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
        },
      },
    );

    if (res.status === 200) setLessons(res.data.data);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadLessons);
    return unsubscribe;
  }, []);

  // ============================
  // DELETE LESSON
  // ============================
  const deleteLesson = async () => {
    if (selectedLessonId == null) return;

    try {
      const res = await axios.delete(
        `https://lumbar-mora-uncoroneted.ngrok-free.dev/api/lessons/${selectedLessonId}`,
        {
          headers: {
            Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
          },
        },
      );

      if (res.status === 200) {
        setDeleteModalVisible(false);
        loadLessons();
      }
    } catch (err) {
      console.log('Delete error: ', err);
    }
  };

  const renderItem = ({ item }: { item: Lesson }) => {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate('QuizScreen', {
            lessonId: item.lessonId,
          })
        }
        activeOpacity={0.9}
      >
        <View style={styles.headerRow}>
          {/* Category badge */}
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{item.categoryName}</Text>
          </View>

          <Text style={styles.title}>{item.lessonName}</Text>

          {/* 3 DOTS */}
          <TouchableOpacity
            style={styles.menuButton}
            onPress={e => {
              e.stopPropagation();
              setSelectedLessonId(item.lessonId);
              setActionModalVisible(true);
            }}
          >
            <Text style={{ fontSize: 22 }}>⋮</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Lessons</Text>

      <FlatList data={lessons} renderItem={renderItem} />

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate('AddLessonScreen')}
      />

      {/* ACTION MODAL */}
      <Modal transparent visible={actionModalVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.actionModal}>
            {/* NEW: View lesson detail */}
            <TouchableOpacity
              style={styles.actionItem}
              onPress={() => {
                setActionModalVisible(false);
                navigation.navigate('LessonDetailScreen', {
                  lessonId: selectedLessonId,
                });
              }}
            >
              <Text style={styles.actionText}>View Lesson Detail</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionItem}
              onPress={() => {
                setActionModalVisible(false);
                navigation.navigate('AddLessonDetailScreen', {
                  lessonId: selectedLessonId,
                });
              }}
            >
              <Text style={styles.actionText}>Add Lesson Detail</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionItem}
              onPress={() => {
                setActionModalVisible(false);
                setDeleteModalVisible(true);
              }}
            >
              <Text style={[styles.actionText, { color: 'red' }]}>Delete</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.actionItem,
                { borderTopColor: '#ddd', borderTopWidth: 1 },
              ]}
              onPress={() => setActionModalVisible(false)}
            >
              <Text style={styles.actionText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* DELETE CONFIRM */}
      <Modal transparent visible={deleteModalVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.deleteModal}>
            <Text style={styles.modalTitle}>Xóa bài học</Text>

            <Text style={styles.modalText}>
              Bạn có chắc chắn muốn xóa bài học này không?
            </Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalBtn, { backgroundColor: '#ccc' }]}
                onPress={() => setDeleteModalVisible(false)}
              >
                <Text>Hủy</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalBtn, { backgroundColor: 'red' }]}
                onPress={deleteLesson}
              >
                <Text style={{ color: '#fff' }}>Xóa</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default LessonScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#FFF' },
  screenTitle: { fontSize: 24, fontWeight: '700', marginBottom: 16 },

  card: {
    backgroundColor: '#FAFAFA',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#EEE',
  },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },

  categoryBadge: {
    backgroundColor: '#E6F0FF',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginRight: 10,
  },

  categoryText: {
    color: '#2D6CDF',
    fontSize: 12,
    fontWeight: '600',
  },

  title: { flex: 1, fontSize: 18, fontWeight: '700' },

  menuButton: {
    paddingHorizontal: 6,
    paddingVertical: 2,
  },

  description: { color: '#555', marginTop: 4 },

  fab: { position: 'absolute', bottom: 20, right: 20 },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  actionModal: {
    width: '70%',
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
  },

  actionItem: {
    padding: 16,
  },

  actionText: {
    fontSize: 16,
  },

  deleteModal: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
  },

  modalTitle: { fontSize: 18, fontWeight: '700', marginBottom: 10 },
  modalText: { fontSize: 15, marginBottom: 20 },

  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },

  modalBtn: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
  },
});
