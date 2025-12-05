import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  CurrentweatherModel,
  LocationWeatherModel,
} from '../../models/Weather';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/Header';

const HomeScreen = () => {
  const navigation: any = useNavigation();
  const [weather, setWeather] = useState<CurrentweatherModel | null>(null);
  const [location, setLocation] = useState<LocationWeatherModel | null>(null);

  const [xp, setXp] = useState(0); // ⭐ ADD XP STATE

  const loadWeather = async () => {
    try {
      const url =
        'https://api.weatherapi.com/v1/current.json?key=2606aa3114534ce3b5f32743252511&q=Ho Chi Minh';

      const res = await axios.get(url);
      setLocation(res.data.location);
      setWeather(res.data.current);
    } catch (error) {
      console.log('Weather error: ', error);
    }
  };

  const loadXP = async () => {
    const savedXP = await AsyncStorage.getItem('xp');
    setXp(Number(savedXP) || 0);
  };

  useEffect(() => {
    loadWeather();
    loadXP();

    // 📌 Khi quay lại Home sau khi làm Quiz → reload XP
    const focus = navigation.addListener('focus', () => loadXP());
    return focus;
  }, []);

  return (
    <ScrollView style={styles.container}>
      {/* --------------------- HEADER --------------------- */}

      <Header />

      {/* --------------------- GRID CATEGORY --------------------- */}
      <View style={styles.gridWrapper}>
        {[
          {
            id: 1,
            title: 'Beginner',
            color: '#f4deeb',
            image: require('../../assets/category1.png'),
          },
          {
            id: 2,
            title: 'Intermediate',
            color: '#c9b0e7',
            image: require('../../assets/category2.png'),
          },
          {
            id: 3,
            title: 'Advance',
            color: '#84bbd0',
            image: require('../../assets/category3.png'),
          },
          {
            id: 4,
            title: 'Expert',
            color: '#877dd3',
            image: require('../../assets/category4.png'),
          },
        ].map(item => (
          <TouchableOpacity
            key={item.id}
            style={[styles.gridBox, { backgroundColor: item.color }]}
            onPress={() => navigation.navigate('LessonScreen', { id: item.id })}
          >
            <Image
              source={item.image}
              style={{
                width: 55,
                height: 55,
                marginBottom: 8,
                borderRadius: 12,
              }}
            />
            <Text style={styles.gridText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* --------------------- SECTION: Science --------------------- */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Science</Text>
          <Text style={styles.arrow}>→</Text>
        </View>

        {[
          {
            id: 1,
            title: 'Gravity Basics',
            image: require('../../assets/abc.png'),
          },
          {
            id: 2,
            title: 'Solar System',
            image: require('../../assets/abc.png'),
          },
        ].map(item => (
          <TouchableOpacity key={item.id} style={styles.lessonCard}>
            <Image source={item.image} style={styles.lessonImage} />
            <Text style={styles.lessonText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* --------------------- SECTION: Anime --------------------- */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Anime</Text>
          <Text style={styles.arrow}>→</Text>
        </View>

        {[
          {
            id: 1,
            title: 'Naruto Special',
            image: require('../../assets/abc.png'),
          },
          {
            id: 2,
            title: 'Demon Slayer',
            image: require('../../assets/abc.png'),
          },
        ].map(item => (
          <TouchableOpacity key={item.id} style={styles.lessonCard}>
            <Image source={item.image} style={styles.lessonImage} />
            <Text style={styles.lessonText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

/* ---------------------- STYLES ---------------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#203061',
  },

  header: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: '#5578bb',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  hello: {
    fontSize: 22,
    fontWeight: '700',
    color: '#f4deeb',
  },
  subtitle: {
    color: '#203061',
    marginTop: 4,
    fontSize: 15,
  },

  // ⭐ XP STYLE
  xpText: {
    marginTop: 6,
    fontSize: 18,
    color: '#fffacd',
    fontWeight: '700',
  },

  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  weatherIcon: { width: 40, height: 40 },
  avatar: { width: 45, height: 45, borderRadius: 25 },

  gridWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    padding: 16,
    justifyContent: 'center',
  },
  gridBox: {
    width: '45%',
    height: 110,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  gridText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#203061',
  },

  section: {
    paddingHorizontal: 16,
    marginTop: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    color: '#f7bfd8',
    fontWeight: '700',
  },
  arrow: {
    fontSize: 24,
    color: '#f7bfd8',
    fontWeight: '900',
  },

  lessonCard: {
    flexDirection: 'row',
    backgroundColor: '#57487f',
    padding: 12,
    borderRadius: 15,
    marginBottom: 12,
    alignItems: 'center',
    gap: 12,
  },
  lessonImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
  },
  lessonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HomeScreen;
