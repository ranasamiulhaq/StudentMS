import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import FeeScreen from './FeeScreen';


const FeeUsersScreen = () => {
  const navigation=useNavigation()
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
    var userList
    useEffect(() => {
        const fetchUsers = async () => {
          try {
            const userCollection = await firestore().collection('Students').get();
            const userList = userCollection.docs.map(doc => ({
                id:doc.id,
              ...doc.data()
            }));
            users.forEach(user=>console.log(user))
            setUsers(userList);
          } catch (error) {
            console.error("Error fetching users: ", error);
          } finally {
            setLoading(false);
          }
        };
      
        fetchUsers();
      }, []);
      
      const handlepress=(item)=>{
            console.log("passed item: ", item)
            navigation.navigate('FeeScreen',{student:item})
      }
      const renderUserItem = ({item}) => (
        <TouchableOpacity onPress={()=>{handlepress(item)}}>
        <View style={styles.item}>
          <Text style={styles.name}>{item.registrationNumber}</Text>
          <Text style={styles.email}>{item.email}</Text>
        </View>
        </TouchableOpacity>
      );

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={renderUserItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    list: {
      paddingVertical: 16,
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
    email: {
      fontSize: 14,
      color: '#555',
    },
  });

export default FeeUsersScreen;
