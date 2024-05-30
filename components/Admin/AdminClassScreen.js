import React, { useEffect, useState } from 'react';
import { View, Text,Image ,FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const AdminClassScreen = () => {
  const navigation = useNavigation();
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const classCollection = await firestore().collection('Classes').get();
        const classList = classCollection.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setClasses(classList);
      } catch (error) {
        console.error("Error fetching classes: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  const handlePress = (item) => {
    navigation.navigate('FeeUsersScreen', { className: item.className });
  }

  const renderClassItem = ({ item }) => (
    <TouchableOpacity onPress={() => handlePress(item)} style={styles.item}>
      <View style={styles.iconContainer}>
        {/* <Icon name="school" size={24} color="#58B1F4" /> */}
        <Image
        source={require('../../public/icons/class.png')} // Change the path to your PNG icon
        style={styles.icon}
      />
      </View>
      <Text style={styles.name}>{item.className}</Text>
      {/* <Icon name="chevron-right" size={24} color="#58B1F4" /> */}
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
      <Text style={styles.header}>Class List</Text>
      <FlatList
        data={classes}
        keyExtractor={(item) => item.id}
        renderItem={renderClassItem}
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
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#58B1F4',
    marginVertical: 16,
    alignSelf: 'center',
  },
  listContainer: {
    paddingBottom: 16,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 8,
    borderRadius: 8,
    elevation: 2,
  },
  iconContainer: {
    marginRight: 16,
  },
  name: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },  
  icon: {
    width: 24, // Adjust width and height as needed
    height: 24,
    tintColor: '#58B1F4', // You can change the tint color if desired
  }
});

export default AdminClassScreen;
