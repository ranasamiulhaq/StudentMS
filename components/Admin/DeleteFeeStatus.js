import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const DeleteFeeStatus = () => {
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFees, setFilteredFees] = useState([]);
  const navigation = useNavigation();
useEffect(()=>{
  const fetchFees = async () => {
    try {
      const feeCollection = await firestore().collection('FeeStatus').get();
      const feeList = feeCollection.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setFees(feeList);
      setFilteredFees(feeList);
    } catch (error) {
      console.error("Error fetching fees: ", error);
    } finally {
      setLoading(false);
    }
  };

  fetchFees();
},[fees])


  const handleSearch = (term) => {
    if (term) {
      const filteredList = fees.filter(fee => fee.registrationNumber.toString().includes(term));
      setFilteredFees(filteredList);
    } else {
      setFilteredFees(fees);
    }
  };

  const handlePress = (registrationNumber) => {
    navigation.navigate('viewFeeStatusdetail', { registrationNumber });
  };

  const handleDelete=async(item)=>{
    try {
        await firestore().collection('FeeStatus').doc(item.id).delete();
        setFees([])
        Alert.alert('Success', 'Fee deleted successfully');
      } catch (error) {
        console.error('Error deleting fee: ', error);
        Alert.alert('Error', 'Failed to delete fee');
      }
  }

  const handleEdit=async (item)=>{
    navigation.navigate('EditFee',{
        registrationNumber:item.registrationNumber
    })
  }

  const renderFeeItem = ({ item }) => (
    <TouchableOpacity style={styles.tile} onPress={() => handlePress(item.registrationNumber)}>
      <View style={styles.row}>
        <Text style={styles.label}>Registration Number:</Text>
        <Text style={styles.tileText}>{item.registrationNumber}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Student Name:</Text>
        <Text style={styles.tileText}>{item.studentName}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Amount Paid:</Text>
        <Text style={styles.tileText}>{item.amountPaid}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Payable Amount:</Text>
        <Text style={styles.tileText}>{item.payableAmount}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => handleEdit(item)}>
          <Text style={styles.buttonText}>Edit Fee</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleDelete(item)}>
          <Text style={styles.buttonText}>Delete Fee</Text>
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
          placeholder="Enter Registration Number"
          value={searchTerm}
          onChangeText={(term) => {
            setSearchTerm(term)
            handleSearch(term);
          }}
        />
      </View>
      <FlatList
        data={filteredFees}
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

export default DeleteFeeStatus;
