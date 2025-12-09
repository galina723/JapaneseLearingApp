import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, { useEffect, useState, useTransition } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';
import { WebView } from 'react-native-webview';

import {
  CurrentweatherModel,
  LocationWeatherModel,
} from '../../models/Weather';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/Header';
import { useTranslation } from 'react-i18next';

const HomeScreen = () => {
  const navigation: any = useNavigation();
  const { t } = useTranslation();
  const [weather, setWeather] = useState<CurrentweatherModel | null>(null);
  const [location, setLocation] = useState<LocationWeatherModel | null>(null);

  const [xp, setXp] = useState(0);

  const [showVideo, setShowVideo] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');

  const historyData = [
    {
      id: 1,
      title: 'Japan after World War II',
      image: require('../../assets/science1.png'),
      url: 'https://www.youtube.com/watch?v=uQX8UwV87Os',
    },
    {
      id: 2,
      title: '13 wonders of Japan',
      image: require('../../assets/science2.png'),
      url: 'https://www.youtube.com/watch?v=wMOKXSZVrMc',
    },
  ];

  const cultureData = [
    {
      id: 1,
      title: 'How Japanese enjoy their food',
      image: require('../../assets/culture1.png'),
      url: 'https://www.youtube.com/watch?v=z3W7waKeMk0',
    },
    {
      id: 2,
      title: 'Pray for the future',
      image: require('../../assets/culture2.png'),
      url: 'https://www.youtube.com/watch?v=f745hh9bRPwo',
    },
  ];

  const items = [
    {
      id: 1,
      title: t('Beginner'),
      color: '#f4deeb',
      image: require('../../assets/category1.png'),
    },
    {
      id: 2,
      title: t('Intermediate'),
      color: '#c9b0e7',
      image: require('../../assets/category2.png'),
    },
    {
      id: 3,
      title: t('Advance'),
      color: '#84bbd0',
      image: require('../../assets/category3.png'),
    },
    {
      id: 4,
      title: t('Expert'),
      color: '#877dd3',
      image: require('../../assets/category4.png'),
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <Header />
      <View style={styles.gridWrapper}>
        {items.map(item => {
          return (
            <TouchableOpacity
              key={item.id}
              style={[styles.gridBox, { backgroundColor: item.color }]}
              onPress={() =>
                navigation.navigate('LessonScreen', { id: item.id })
              }
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
          );
        })}
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{t('History')}</Text>
        </View>

        {historyData.map(item => (
          <TouchableOpacity
            key={item.id}
            style={styles.lessonCard}
            onPress={() => {
              setVideoUrl(item.url);
              setShowVideo(true);
            }}
          >
            <Image source={item.image} style={styles.lessonImage} />
            <Text style={styles.lessonText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{t('Culture')}</Text>
        </View>

        {cultureData.map(item => (
          <TouchableOpacity
            key={item.id}
            style={styles.lessonCard}
            onPress={() => {
              setVideoUrl(item.url);
              setShowVideo(true);
            }}
          >
            <Image source={item.image} style={styles.lessonImage} />
            <Text style={styles.lessonText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Modal
        isVisible={showVideo}
        onBackdropPress={() => setShowVideo(false)}
        backdropOpacity={0.4}
        animationIn="zoomIn"
        animationOut="zoomOut"
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{t('VideoPreview')}</Text>

          <View
            style={{
              width: '100%',
              height: 220,
              borderRadius: 12,
              overflow: 'hidden',
            }}
          >
            <WebView
              source={{ uri: videoUrl }}
              style={{ flex: 1 }}
              javaScriptEnabled
              domStorageEnabled
            />
          </View>

          <TouchableOpacity
            style={styles.closeBtn}
            onPress={() => setShowVideo(false)}
          >
            <Text style={styles.closeText}>{t('Close')}</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#203061',
  },

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
    marginBottom: 12,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    color: '#f7bfd8',
    fontWeight: '700',
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

  // ⭐ Modal
  modalContent: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 18,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
  },
  closeBtn: {
    marginTop: 12,
    backgroundColor: '#f06292',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 12,
  },
  closeText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});

export default HomeScreen;
