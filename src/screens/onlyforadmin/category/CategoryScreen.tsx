import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';

const CategoryListScreen = ({ navigation }: any) => {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadCategories = async () => {
    try {
      const res = await axios.get(
        'https://lumbar-mora-uncoroneted.ngrok-free.dev/api/category',
      );
      setCategories(res.data);
    } catch (error) {
      console.log('Category error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Category Management</Text>
      {/* 
      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => navigation.navigate('AddCategoryScreen')}
      >
        <Text style={styles.addText}>➕ Add New Category</Text>
      </TouchableOpacity> */}

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#203061"
          style={{ marginTop: 40 }}
        />
      ) : (
        <ScrollView style={{ marginTop: 16 }}>
          {categories.map(item => (
            <View key={item.categoryId} style={styles.card}>
              <View style={{ flex: 1 }}>
                <Text style={styles.title}>{item.categoryName}</Text>
                <Text style={styles.desc}>{item.description}</Text>
              </View>

              {/* <View style={styles.actionWrapper}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('EditCategoryScreen', { data: item })
                  }
                >
                  <Text style={styles.actionEdit}>Edut</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => console.log('delete id', item.categoryId)}
                >
                  <Text style={styles.actionDelete}>🗑️</Text>
                </TouchableOpacity>
              </View> */}
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default CategoryListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F9',
    padding: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: '800',
    textAlign: 'center',
    color: '#203061',
    marginTop: 10,
    marginBottom: 20,
  },
  addBtn: {
    backgroundColor: '#203061',
    padding: 14,
    borderRadius: 10,
  },
  addText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },

  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 14,
    marginBottom: 14,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#203061',
  },
  desc: {
    marginTop: 4,
    color: '#555',
  },

  actionWrapper: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 12,
  },
  actionEdit: {
    fontSize: 22,
  },
  actionDelete: {
    fontSize: 22,
    marginTop: 10,
  },
});
