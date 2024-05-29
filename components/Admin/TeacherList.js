import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useIsFocused } from '@react-navigation/native';

const TeacherList = ({navigation}) => {
  const [teachers, setteachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredteachers, setFilteredteachers] = useState([]);
  const isfocused=useIsFocused();
  
    useEffect(()=>{
        const fetchteachers = async () => {
            try {
              const teachersCollection = await firestore().collection('Teachers').get();
              const teacherslist = teachersCollection.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
              }));
              setteachers(teacherslist);
              setFilteredteachers(teacherslist);
            } catch (error) {
              console.error("Error fetching Teachers: ", error);
            } finally {
              setLoading(false);
            }
          };
            fetchteachers();
          
      
          
    },[isfocused]);
    

  const handleSearch = (term) => {
    if (term) {
      const filteredList = teachers.filter(teacher => teacher.teacherId.includes(term));
      setFilteredteachers(filteredList);
      console.log("in if")
    } else {
        console.log("in else")
      setFilteredteachers(teachers);

    }
  };

  const handleEdit=async (item)=>{
    navigation.navigate('AssignTeacher',{
        teacherId:item.teacherId,
        name:item.name,
        assignedclass:item.assignedclass
    })
  }

  const renderFeeItem = ({ item }) => (
    <TouchableOpacity style={styles.tile} onPress={()=>{ handleEdit(item)}}>
      <View style={styles.row}>
        <Text style={styles.label}>Teacher id:</Text>
        <Text style={styles.tileText}>{item.teacherId}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Teacher Name:</Text>
        <Text style={styles.tileText}>{item.name}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Assigned Class:</Text>
        <Text style={styles.tileText}>{item.assignedclass}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => handleEdit(item)}>
          <Text style={styles.buttonText}>Edit </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
  

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Enter Teacher ID"
          value={searchTerm}
          onChangeText={(term) => {
            setSearchTerm(term)
            handleSearch(term);
          }}
        />
      </View>
      <FlatList
        data={filteredteachers}
        keyExtractor={(item) => item.id}
        renderItem={renderFeeItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  searchContainer: {
    marginBottom: 20,
  },
  searchInput: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  tile: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    marginBottom: 20,
    borderRadius: 8,
    elevation: 2,
  },
  tileText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default TeacherList;
