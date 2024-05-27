import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, Button } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const ViewfeeStatus = ({ route }) => {
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const registration = route.params.registrationNumber;
  useEffect(() => {
    const fetchFees = async () => {
      try {
        const feeCollection = await firestore()
          .collection('FeeStatus')
          .where('registrationNumber', '==', registration)
          .get();
        const feeList = feeCollection.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFees(feeList);
     
      } catch (error) {
        console.error('Error fetching fees: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFees();
  }, []);

  const renderFeeItem = ({ item }) => (
    <View style={styles.row}>
      <View style={styles.cellContainer}>
        <Text style={styles.label}>Student Name:</Text>
        <Text style={styles.value}>{item.studentName}</Text>
      </View>
      <View style={styles.cellContainer}>
        <Text style={styles.label}>Registration Number:</Text>
        <Text style={styles.value}>{item.registrationNumber}</Text>
      </View>
      <View style={styles.cellContainer}>
        <Text style={styles.label}>Amount Due:</Text>
        <Text style={styles.value}>{item.amountDue}</Text>
      </View>
      <View style={styles.cellContainer}>
        <Text style={styles.label}>Amount Paid:</Text>
        <Text style={styles.value}>{item.amountPaid}</Text>
      </View>
      <View style={styles.cellContainer}>
        <Text style={styles.label}>Payable Amount:</Text>
        <Text style={styles.value}>{item.payableAmount}</Text>
      </View>
      <View style={styles.cellContainer}>
        <Text style={styles.label}>Payment Date:</Text>
        <Text style={styles.value}>{item.paymentDate}</Text>
      </View>
      <View style={styles.cellContainer}>
        <Text style={styles.label}>Late Fees:</Text>
        <Text style={styles.value}>{item.lateFees ? 'Yes' : 'No'}</Text>
      </View>
      <View style={styles.cellContainer}>
        <Text style={styles.label}>Remarks:</Text>
        <Text style={styles.value}>{item.remarks}</Text>
      </View>
    </View>
  );

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={fees}
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
    flexDirection: 'row',
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
    marginRight: 10,
  },
  row: {
    flexDirection: 'column',
    marginBottom: 20,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
  },
  cellContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    width: '40%',
  },
  value: {
    flex: 1,
  },
});

export default ViewfeeStatus;
