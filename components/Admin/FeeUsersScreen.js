import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const FeeUsersScreen = ({ route }) => {
  const admissionClass = route.params.className;
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userCollection = await firestore().collection('Students')
          .where('admissionClass', '==', admissionClass).get();
        const userList = userCollection.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        userList.sort((a, b) => a.registrationNumber - b.registrationNumber);
        setUsers(userList);
      } catch (error) {
        console.error("Error fetching users: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handlePress = (item) => {
    navigation.navigate('FeeScreen', { student: item });
  };

  const renderUserItem = ({ item }) => (
    <TouchableOpacity onPress={() => handlePress(item)} style={styles.item}>
      <View style={styles.itemHeader}>
        <Text style={styles.name}>{item.name}</Text>
        <MaterialCommunityIcons name="chevron-right" size={24} color="#58B1F4" />
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Reg. No: </Text>
        <Text style={styles.detail}>{item.registrationNumber}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Email: </Text>
        <Text style={styles.detail}>{item.email}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#58B1F4" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{admissionClass} Class Students</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={renderUserItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: '#58B1F4',
  },
  listContainer: {
    paddingBottom: 16,
  },
  item: {
    backgroundColor: '#f1f1f1',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 8,
    borderRadius: 8,
    elevation: 2,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  detailContainer: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  label: {
    fontSize: 14,
    color: '#555',
    fontWeight: 'bold',
  },
  detail: {
    fontSize: 14,
    color: '#555',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#58B1F4',
    marginVertical: 16,
    alignSelf: 'center',
  },
});

export default FeeUsersScreen;
