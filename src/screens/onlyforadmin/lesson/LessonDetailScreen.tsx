import { useRoute, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Lesson } from '../../../models/Lesson';
import { LessonDetail } from '../../../models/LessonDetail';

const LessonDetailScreen = () => {
  const route = useRoute();
  const navigation: any = useNavigation();

  const [lesson, setLesson] = useState<Lesson>();
  const [lessonDetail, setLessonDetail] = useState<LessonDetail>();
  const [displayContent, setDisplayContent] = useState<string>('');
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      setLoading(true);

      const lessonId = (route.params as any)?.lessonId;
      if (!lessonId) return;

      const token = await AsyncStorage.getItem('token');

      const lessonRes = await axios.get(
        `https://lumbar-mora-uncoroneted.ngrok-free.dev/api/lessons/${lessonId}`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setLesson(lessonRes.data.data);

      const detailRes = await axios.get(
        `https://lumbar-mora-uncoroneted.ngrok-free.dev/api/lessons/${lessonId}/details`,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (detailRes.data.success && detailRes.data.data.length > 0) {
        const d = detailRes.data.data[0];
        setLessonDetail(d);

        try {
          const parsed = JSON.parse(d.lessonData);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setDisplayContent(parsed[0].text || '');
          } else {
            setDisplayContent(d.lessonData);
          }
        } catch (e) {
          setDisplayContent(d.lessonData);
        }
      }
    } catch (err) {
      console.log('ERR:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [(route.params as any)?.lessonId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  const getTypeName = (type?: number) => {
    switch (type) {
      case 1:
        return 'Vocabulary';
      case 2:
        return 'Grammar';
      case 3:
        return 'Kanji';
      default:
        return 'Unknown';
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <View style={styles.headerContainer}>
          <View style={styles.headerTopRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.headerTitle}>{lesson?.lessonName}</Text>
              {/* <Text style={styles.headerSubtitle}>ID: {lesson?.lessonId}</Text> */}
            </View>

            <TouchableOpacity
              style={styles.editButton}
              onPress={() =>
                navigation.navigate(
                  'EditLessonDetailScreen' as never,
                  {
                    lessonId: lesson?.lessonId,
                    lessonDetailId: lessonDetail?.lessonDetailId,
                    detail: lessonDetail,
                  } as never,
                )
              }
            >
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeader}>GENERAL INFORMATION</Text>
          <View style={styles.card}>
            <View style={styles.rowItem}>
              <Text style={styles.label}>Type</Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  {getTypeName(lessonDetail?.type)}
                </Text>
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.rowItem}>
              <Text style={styles.label}>Order</Text>
              <Text style={styles.value}>{lesson?.order}</Text>
            </View>
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeader}>LESSON CONTENT DATA</Text>

          <View style={styles.contentBlock}>
            <Text style={styles.contentText}>
              {displayContent || 'No content available.'}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LessonDetailScreen;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F3F4F6' },
  container: { flex: 1, padding: 16 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  /* HEADER */
  headerContainer: { marginBottom: 24 },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 4,
  },
  headerSubtitle: { fontSize: 14, color: '#6B7280' },
  editButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    elevation: 2,
  },
  editButtonText: { color: '#FFFFFF', fontWeight: '600', fontSize: 14 },

  /* SECTIONS */
  sectionContainer: { marginBottom: 24 },
  sectionHeader: {
    fontSize: 13,
    fontWeight: '700',
    color: '#6B7280',
    marginBottom: 8,
    textTransform: 'uppercase',
  },

  /* INFO CARD */
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 16,
  },
  divider: { height: 1, backgroundColor: '#F3F4F6', marginVertical: 12 },
  rowItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: { fontSize: 15, color: '#4B5563', fontWeight: '500' },
  value: { fontSize: 15, color: '#111827', fontWeight: '600' },
  badge: {
    backgroundColor: '#EFF6FF',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  badgeText: { color: '#2563EB', fontSize: 12, fontWeight: '700' },

  /* CONTENT BLOCK (Thay đổi chính ở đây) */
  contentBlock: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 20,
    minHeight: 150, // Tạo chiều cao tối thiểu để nhìn đẹp hơn
  },
  contentText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#374151', // Màu xám đậm dễ đọc
    textAlign: 'left',
  },
});
