import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  Alert,
  Modal,
  Pressable,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export enum UserStatus {
  Active = 'Active',
  Inactive = 'Inactive',
  Blocked = 'Blocked',
  Pending = 'Pending',
}

export interface User {
  username: string;
  fullname: string;
  email: string;
  xp: number;
  learnedLesson: number;
  status: number;
}

const UserScreen = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal state
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<UserStatus | null>(null);

  const API = 'https://lumbar-mora-uncoroneted.ngrok-free.dev/api/Users';

  const mapStatus = (x: number): UserStatus => {
    switch (x) {
      case 0:
        return UserStatus.Active;
      case 1:
        return UserStatus.Inactive;
      case 2:
        return UserStatus.Blocked;
      case 3:
        return UserStatus.Pending;
      default:
        return UserStatus.Active;
    }
  };

  const loadUsers = async () => {
    try {
      setLoading(true);

      const token = await AsyncStorage.getItem('token');

      const res = await axios.get(`${API}/all-non-admin`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsers(res.data.data);
    } catch (e) {
      Alert.alert('Error', 'Cannot load users!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const openModal = (user: User) => {
    setSelectedUser(user);
    setSelectedStatus(mapStatus(user.status));
    setModalVisible(true);
  };

  const saveStatus = async () => {
    if (!selectedUser || !selectedStatus) return;

    try {
      const token = await AsyncStorage.getItem('token');

      await axios.post(
        `${API}/change-status`,
        {
          username: selectedUser.username,
          newStatus: selectedStatus,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      Alert.alert('Success', 'Status updated!');
      setModalVisible(false);
      loadUsers();
    } catch (e) {
      Alert.alert('Error', 'Cannot change status!');
    }
  };

  const renderItem = ({ item }: { item: User }) => {
    const current = mapStatus(item.status);

    return (
      <TouchableOpacity style={styles.card} onPress={() => openModal(item)}>
        <Text style={styles.name}>{item.fullname}</Text>
        <Text style={styles.email}>{item.email}</Text>
        <Text style={styles.status}>Status: {current}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Management</Text>

      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={users}
          keyExtractor={item => item.username}
          renderItem={renderItem}
        />
      )}

      {/* ===============================================
            MODAL ĐỔI STATUS
        =============================================== */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          style={styles.overlay}
          onPress={() => setModalVisible(false)}
        >
          <Pressable style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              Change Status for {selectedUser?.fullname}
            </Text>

            {Object.values(UserStatus).map(st => (
              <TouchableOpacity
                key={st}
                style={styles.option}
                onPress={() => setSelectedStatus(st)}
              >
                <View
                  style={[
                    styles.radio,
                    selectedStatus === st && styles.radioSelected,
                  ]}
                />
                <Text style={styles.optionText}>{st}</Text>
              </TouchableOpacity>
            ))}

            <View style={styles.modalButtons}>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.cancelBtn}
              >
                <Text style={styles.btnText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={saveStatus} style={styles.saveBtn}>
                <Text style={styles.btnText}>Save</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

export default UserScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fafafa',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
  },
  email: {
    fontSize: 14,
    color: '#777',
    marginVertical: 4,
  },
  status: {
    marginTop: 6,
    fontSize: 16,
    fontWeight: '500',
  },

  // Modal
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 14,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 15,
  },

  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  optionText: {
    fontSize: 16,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#555',
    marginRight: 13,
  },
  radioSelected: {
    backgroundColor: '#555',
  },

  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  cancelBtn: {
    padding: 10,
    marginRight: 15,
  },
  saveBtn: {
    padding: 10,
    backgroundColor: '#222',
    borderRadius: 6,
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
  },
});
