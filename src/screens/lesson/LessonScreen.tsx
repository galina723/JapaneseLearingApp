// LessonScreen.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Animated,
  ListRenderItemInfo,
} from 'react-native';
import { Lesson } from '../../models/Lesson';

// type Lesson = {
//   lessonId: number;
//   lessonName: string;
//   description: string;
//   order: number;
//   categoryId: number;
//   categoryName: string;
// };

const LessonScreen: React.FC = () => {
  const navigation: any = useNavigation();
  const { t } = useTranslation();
  const [lessons, setLessons] = React.useState<Lesson[]>([]);
  const route = useRoute();
  React.useEffect(() => {
    if ((route.params as any).id) {
      fetchLessons();
    }
  }, [(route.params as any).id]);

  const fetchLessons = async () => {
    try {
      const res = await axios.get(
        'https://lumbar-mora-uncoroneted.ngrok-free.dev/api/lessons',
        {
          headers: {
            Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
          },
        },
      );
      console.log(res);
      if (res.status === 200) {
        const lessonT = res.data.data.filter(
          (lesson: Lesson) => lesson.categoryId === (route.params as any).id,
        );
        console.log(4532, lessonT);
        setLessons(lessonT);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderItem = ({ item }: ListRenderItemInfo<Lesson>) => {
    return <LessonCard lesson={item} navigation={navigation} />;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('Lesson')}</Text>

      <FlatList
        data={lessons}
        keyExtractor={item => item.lessonId.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={renderItem}
      />
    </View>
  );
};

const LessonCard: React.FC<{ lesson: Lesson; navigation: any }> = ({
  lesson,
  navigation,
}) => {
  const scale = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.spring(scale, {
      toValue: 0.96,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.9}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onPress={() =>
          navigation.navigate('LessonDetailScreen', { id: lesson.lessonId })
        }
      >
        <View style={styles.circle}>
          <Text style={styles.circleText}>{lesson.order}</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.lessonName}>{lesson.lessonName}</Text>
          <Text style={styles.desc} numberOfLines={2}>
            {lesson.description}
          </Text>

          <View style={styles.metaRow}>
            <View
              style={[
                styles.statusTag,
                {
                  backgroundColor: lesson.order ? '#C9FFE4' : '#FFDDDD',
                },
              ]}
            >
              <Text
                style={[
                  styles.statusText,
                  { color: lesson.order ? '#0F6B3C' : '#B12525' },
                ]}
              >
                {lesson.order ? 'Active' : 'Inactive'}
              </Text>
            </View>

            <Text style={styles.dateText}>{lesson.description}</Text>
          </View>
        </View>

        <Text style={styles.arrow}>›</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

function formatDate(d: Date | string) {
  try {
    const dt = typeof d === 'string' ? new Date(d) : d;
    return dt.toLocaleDateString();
  } catch {
    return '';
  }
}

export default LessonScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#203061',
    paddingHorizontal: 18,
    paddingTop: 18,
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 14,
    color: '#F2F5FF',
  },

  listContent: {
    paddingBottom: 40,
  },

  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 14,

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 5,
  },

  circle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#DCE8FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },

  circleText: {
    fontSize: 19,
    fontWeight: '800',
    color: '#4D9FFF',
  },

  content: {
    flex: 1,
  },

  lessonName: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111A34',
    marginBottom: 6,
  },

  desc: {
    fontSize: 14,
    color: '#4F5F85',
    marginBottom: 10,
  },

  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  statusTag: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
  },

  statusText: {
    fontSize: 12,
    fontWeight: '700',
  },

  dateText: {
    color: '#96A5C9',
    fontSize: 12,
  },

  arrow: {
    fontSize: 30,
    color: '#AFC5FF',
    marginLeft: 12,
  },
});
