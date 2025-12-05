import { useRoute, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Lesson } from '../../models/Lesson';
import { LessonDetail } from '../../models/LessonDetail';

const LessonDetailScreen = () => {
  const route = useRoute();
  const navigation: any = useNavigation();

  const [lesson, setLesson] = useState<Lesson>();
  const [lessonDetail, setLessonDetail] = useState<LessonDetail>();
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      setLoading(true);

      const id = (route.params as any)?.id;
      if (!id) return;

      const token = await AsyncStorage.getItem('token');

      /** 📌 GET lesson info */
      const lessonRes = await axios.get(
        `https://lumbar-mora-uncoroneted.ngrok-free.dev/api/lessons/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (lessonRes.status === 200) {
        setLesson(lessonRes.data.data);
      }

      /** 📌 GET lesson detail */
      const detailRes = await axios.get(
        `https://lumbar-mora-uncoroneted.ngrok-free.dev/api/lessons/${id}/details`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (detailRes.status === 200 && detailRes.data.data.length > 0) {
        const d = detailRes.data.data[0];

        setLessonDetail({
          ...d,
          lessonData: d.jsonData ? d.jsonData : d.lessonData,
        });

        console.log('DETAIL:', d);
      }
    } catch (err) {
      console.log('ERR:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [(route.params as any)?.id]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#885091" />
        <Text style={{ marginTop: 10 }}>Loading lesson...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* HEADER */}
      <View style={styles.headerCard}>
        <Text style={styles.lessonTitle}>{lesson?.lessonName}</Text>

        <View style={styles.typeBadge}>
          <Text style={styles.typeText}>
            {lessonDetail?.type === 0 ? 'VOCABULARY' : 'GRAMMAR'}
          </Text>
        </View>

        <Text style={styles.description}>{lesson?.description}</Text>
      </View>

      {/* LESSON INFO */}
      <View style={styles.infoCard}>
        <Text style={styles.infoLabel}>Order:</Text>
        <Text style={styles.infoValue}>{lesson?.order}</Text>

        <Text style={styles.infoLabel}>Status:</Text>
        <Text
          style={[
            styles.infoValue,
            { color: lesson?.status ? '#57487f' : '#885091' },
          ]}
        >
          {lesson?.status ? 'Active' : 'Inactive'}
        </Text>
      </View>

      {/* CONTENT */}
      <Text style={styles.sectionTitle}>Lesson Content</Text>

      {lessonDetail?.lessonData &&
        JSON.parse(lessonDetail.lessonData).map((item: any, index: number) => (
          <View key={index} style={styles.contentCard}>
            <Text style={styles.jp}>{item.text}</Text>

            {item.romaji && <Text style={styles.romaji}>{item.romaji}</Text>}
            {item.mean && <Text style={styles.mean}>{item.mean}</Text>}
          </View>
        ))}

      {/* ⭐ BUTTON GO TO QUIZ ⭐ */}
      <TouchableOpacity
        style={styles.quizButton}
        onPress={() =>
          navigation.navigate('QuizScreen', { lessonId: lesson?.lessonId })
        }
      >
        <Text style={styles.quizButtonText}>Go To Quiz</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default LessonDetailScreen;

/* ---------------------------------- STYLES ---------------------------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4deeb',
    padding: 16,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerCard: {
    backgroundColor: '#c9b0e7',
    padding: 20,
    borderRadius: 18,
    marginBottom: 18,
    shadowColor: '#674a88',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },

  lessonTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#203061',
  },

  typeBadge: {
    marginTop: 10,
    alignSelf: 'flex-start',
    backgroundColor: '#885091',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
  },

  typeText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },

  description: {
    marginTop: 12,
    fontSize: 15,
    color: '#57487f',
    lineHeight: 20,
  },

  infoCard: {
    backgroundColor: '#ffffff',
    padding: 18,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#877dd3',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#f7bfd8',
  },

  infoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#5578bb',
  },

  infoValue: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 10,
    color: '#203061',
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
    color: '#203061',
  },

  contentCard: {
    backgroundColor: '#ffffff',
    padding: 18,
    borderRadius: 14,
    marginBottom: 12,
    shadowColor: '#5578bb',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#c9b0e7',
  },

  jp: {
    fontSize: 22,
    fontWeight: '700',
    color: '#885091',
  },

  romaji: {
    fontSize: 15,
    marginTop: 6,
    color: '#5578bb',
  },

  mean: {
    fontSize: 16,
    marginTop: 6,
    color: '#203061',
  },

  /* ⭐ STYLE BUTTON QUIZ ⭐ */
  quizButton: {
    backgroundColor: '#885091',
    marginTop: 20,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 40,
  },

  quizButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
});
