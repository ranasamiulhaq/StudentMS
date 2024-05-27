import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import FeeUsersScreen from './FeeUsersScreen';

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
        console.log("Classes :", classList)
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
    console.log("Passed item: ", item);
    navigation.navigate('FeeUsersScreen', { className: item.className });
  }

  const renderClassItem = ({ item }) => (
    <TouchableOpacity onPress={() => handlePress(item)}>
      <View style={styles.item}>
        <Text style={styles.name}>{item.className}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={classes}
        keyExtractor={(item) => item.id}
        renderItem={renderClassItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  item: {
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 8,
    borderRadius: 8,
    elevation: 2,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
});

export default AdminClassScreen;
