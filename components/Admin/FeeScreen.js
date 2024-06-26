import React, { useState ,useEffect} from 'react';
import { View, Text, ActivityIndicator , TextInput, Button, Switch, StyleSheet, ScrollView } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';

const FeeScreen = ({route}) => {
  const { student } = route.params;
  const registrationNumber=student.registrationNumber
  const [studentName, setStudentName] = useState(student.name);
  const [amountDue, setAmountDue] = useState('');
  const [amountPaid, setAmountPaid] = useState('');
  const [payableAmount, setPayableAmount] = useState('');
  const [paymentDate, setPaymentDate] = useState('');
  const [lateFees, setLateFees] = useState(false);
  const [remarks, setRemarks] = useState('');
  const [loading, setLoading] = useState(false);
    useEffect(() => {
    const currentDate = new Date().toISOString().split('T')[0]; 
        setPaymentDate(currentDate);
  }, []);
  const handleSave = async () => {
    setLoading(true);
    try {
      await firestore().collection('FeeStatus').add({
        studentName,
        amountDue: parseFloat(amountDue),
        amountPaid: parseFloat(amountPaid),
        payableAmount: parseFloat(payableAmount),
        paymentDate,
        lateFees,
        remarks,
        registrationNumber
      });
      console.log('Record added successfully!');
      Alert.alert("Successfully updated", "Record has been added")
      // Reset the form after saving
      setStudentName('');
      setAmountDue('');
      setAmountPaid('');
      setPayableAmount('');
      setPaymentDate('');
      setLateFees(false);
      setRemarks('');
    } catch (error) {
      console.error('Error adding record: ', error);
    }
    finally {
      setLoading(false);
  }
  };

  if(loading){
    return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#58B1F4" />
          <Text style={styles.loadingText}>Adding Students</Text>
        </View>
      )}


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Student Name:</Text>
      <TextInput
        style={styles.input}
        value={studentName}
        readOnly={true}
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
      
      <Button title="Save" onPress={handleSave} />
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

export default FeeScreen;
