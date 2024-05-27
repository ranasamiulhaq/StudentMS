import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Switch, StyleSheet, ScrollView } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';

const EditFee = ({ route }) => {
  const registrationNumber = route.params.registrationNumber;
  const [studentName, setStudentName] = useState('');
  const [amountDue, setAmountDue] = useState('');
  const [amountPaid, setAmountPaid] = useState('');
  const [payableAmount, setPayableAmount] = useState('');
  const [paymentDate, setPaymentDate] = useState('');
  const [lateFees, setLateFees] = useState(false);
  const [remarks, setRemarks] = useState('');
  const [docId, setDocId] = useState('');

  useEffect(() => {
    const fetchFee = async () => {
      try {
        const feeSnapshot = await firestore()
          .collection('FeeStatus')
          .where('registrationNumber', '==', registrationNumber)
          .get();
        if (!feeSnapshot.empty) {
          const feeDoc = feeSnapshot.docs[0];
          const feeData = feeDoc.data();
          setDocId(feeDoc.id);
          setStudentName(feeData.studentName);
          setAmountDue(feeData.amountDue.toString());
          setAmountPaid(feeData.amountPaid.toString());
          setPayableAmount(feeData.payableAmount.toString());
          setPaymentDate(feeData.paymentDate);
          setLateFees(feeData.lateFees);
          setRemarks(feeData.remarks);
        }
      } catch (error) {
        console.error('Error fetching fee record: ', error);
      }
    };

    fetchFee();
  }, [registrationNumber]);

  const handleUpdate = async () => {
    try {
      await firestore()
        .collection('FeeStatus')
        .doc(docId)
        .update({
          amountDue: parseFloat(amountDue),
          amountPaid: parseFloat(amountPaid),
          payableAmount: parseFloat(payableAmount),
          paymentDate,
          lateFees,
          remarks,
        });
      console.log('Record updated successfully!');
      Alert.alert('Success', 'Record has been updated');
    } catch (error) {
      console.error('Error updating record: ', error);
      Alert.alert('Request Failed', 'Failed to update record');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Student Name:</Text>
      <TextInput
        style={styles.input}
        value={studentName}
        editable={false}
      />
      
      <Text style={styles.label}>Amount Due:</Text>
      <TextInput
        style={styles.input}
        value={amountDue}
        onChangeText={setAmountDue}
        keyboardType="numeric"
      />
      
      <Text style={styles.label}>Amount Paid:</Text>
      <TextInput
        style={styles.input}
        value={amountPaid}
        onChangeText={setAmountPaid}
        keyboardType="numeric"
      />
      
      <Text style={styles.label}>Payable Amount:</Text>
      <TextInput
        style={styles.input}
        value={payableAmount}
        onChangeText={setPayableAmount}
        keyboardType="numeric"
      />
      
      <Text style={styles.label}>Payment Date:</Text>
      <TextInput
        style={styles.input}
        value={paymentDate}
        onChangeText={setPaymentDate}
      />
      
      <View style={styles.switchContainer}>
        <Text style={styles.label}>Late Fees:</Text>
        <Switch
          value={lateFees}
          onValueChange={setLateFees}
        />
      </View>
      
      <Text style={styles.label}>Remarks (if any):</Text>
      <TextInput
        style={styles.input}
        value={remarks}
        onChangeText={setRemarks}
      />
      
      <Button title="Update" onPress={handleUpdate} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
});

export default EditFee;
