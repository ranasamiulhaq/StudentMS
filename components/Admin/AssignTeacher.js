import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';


const AssignTeacher = ({navigation,route}) => {

  const {teacherId,name, assignedclass } = route.params || {};
  const [selectedClass, setSelectedClass] = useState(assignedclass);

  const handleUpdate = async () => {
    try {
      await firestore().collection('Teachers').doc(teacherId).update({
        assignedclass: selectedClass,
      });
      Alert.alert('Success', 'Class updated successfully');
      navigation.goBack();
    } catch (error) {
      console.error("Error updating class: ", error);
      Alert.alert('Error', 'Failed to update class');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Teacher Name:</Text>
      <Text style={styles.value}>{name}</Text>
      <Text style={styles.label}>Current Class:</Text>
      <Text style={styles.value}>{assignedclass}</Text>
      <Text style={styles.label}>New Class:</Text>
      <Picker
        selectedValue={selectedClass}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedClass(itemValue)}
      >
        <Picker.Item label="Select Class" value="" />
        <Picker.Item label="Nursery" value="nursery" />
        <Picker.Item label="Prep" value="prep" />
        <Picker.Item label="Class 1" value="class1" />
        <Picker.Item label="Class 2" value="class2" />
        <Picker.Item label="Class 3" value="class3" />
        <Picker.Item label="Class 4" value="class4" />
        <Picker.Item label="Class 5" value="class5" />
        <Picker.Item label="Class 6" value="class6" />
        <Picker.Item label="Class 7" value="class7" />
        <Picker.Item label="Class 8" value="class8" />
      </Picker>
      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>OK</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  value: {
    fontSize: 16,
    marginVertical: 10,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AssignTeacher;
