import React, { useCallback, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { User } from '../../models/User';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const RankScreen = () => {
  const [rank, setRank] = React.useState<User[]>([]);

  useFocusEffect(
    useCallback(() => {
      handleRank();
    }, []),
  );

  const handleRank = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      const res = await axios.get(
        'https://lumbar-mora-uncoroneted.ngrok-free.dev/api/users/rank',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (res.status === 200) {
        setRank(res.data.data);
      }
    } catch (e) {
      console.log('>>>>>> RANK ERROR:', e);
    }
  };

  useEffect(() => {
    handleRank();
  }, []);

  const listWithoutTop3 = rank.slice(3);

  const renderItem = ({ item, index }: { item: User; index: number }) => (
    <View style={styles.row}>
      <Text style={styles.rankNumber}>#{index + 4}</Text>

      <Image
        source={require('../../assets/otherrank.png')}
        style={styles.rowAvatar}
      />

      <Text style={styles.rowName}>{item.username}</Text>

      <Text style={styles.rowScore}>{item.xp} XP</Text>
    </View>
  );

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#203061' }}>
      {rank.length >= 3 && (
        <View style={styles.topContainer}>
          <View style={styles.topUserSmall}>
            <Image
              source={require('../../assets/rank2.png')}
              style={styles.topAvatarSmall}
            />
            <Text style={styles.topName}>⭐ {rank[1].username}</Text>
            <Text style={styles.topXP}>{rank[1].xp} XP</Text>
            <Text style={styles.topBadge}>🥈</Text>
          </View>

          <View style={styles.topUserLarge}>
            <View style={styles.glowCircle}>
              <Image
                source={require('../../assets/rank1.png')}
                style={styles.topAvatarLarge}
              />
            </View>

            <Text style={styles.topName}>👑 {rank[0].username}</Text>
            <Text style={styles.topXP}>{rank[0].xp} XP</Text>
            <Text style={styles.topBadge}>🥇</Text>
          </View>

          <View style={styles.topUserSmall}>
            <Image
              source={require('../../assets/rank3.png')}
              style={styles.topAvatarSmall}
            />
            <Text style={styles.topName}>🎀 {rank[2].username}</Text>
            <Text style={styles.topXP}>{rank[2].xp} XP</Text>
            <Text style={styles.topBadge}>🥉</Text>
          </View>
        </View>
      )}

      {/* LIST RANK 4+ */}
      <View style={{ padding: 14 }}>
        {listWithoutTop3.length > 0 && (
          <FlatList
            scrollEnabled={false}
            data={listWithoutTop3}
            renderItem={renderItem}
            keyExtractor={(item, idx) => `${item.username}-${idx}`}
          />
        )}
      </View>
    </ScrollView>
  );
};

export default RankScreen;

// ---------------------
//        STYLES
// ---------------------

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 40,
    paddingBottom: 20,
  },

  topUserSmall: {
    alignItems: 'center',
    width: 100,
  },

  topUserLarge: {
    alignItems: 'center',
    width: 120,
  },

  glowCircle: {
    padding: 6,
    borderRadius: 100,
    backgroundColor: '#f7bfd8aa',
    shadowColor: '#f9a9c8',
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
  },

  topAvatarSmall: {
    width: 72,
    height: 72,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: '#f4deeb',
    marginBottom: 6,
  },

  topAvatarLarge: {
    width: 110,
    height: 110,
    borderRadius: 60,
    borderWidth: 5,
    borderColor: '#fff',
  },

  topName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#ffe8f6',
    marginTop: 4,
  },

  topXP: {
    fontSize: 13,
    color: '#f7dff1',
  },

  topBadge: {
    marginTop: 4,
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: '#f7bfd8',
    borderRadius: 16,
    marginBottom: 12,
    paddingHorizontal: 12,
    elevation: 2,
  },

  rowAvatar: {
    width: 45,
    height: 45,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#ffe4f3',
    marginHorizontal: 10,
  },

  rowName: {
    flex: 1,
    fontSize: 16,
    color: '#203061',
    fontWeight: '600',
  },

  rowScore: {
    fontWeight: '700',
    color: '#885091',
    marginRight: 6,
  },

  rankNumber: {
    width: 38,
    textAlign: 'center',
    fontWeight: '700',
    color: '#203061',
    fontSize: 14,
  },
});
