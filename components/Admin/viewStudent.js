import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import firestore from '@react-native-firebase/firestore';

const ViewStudent = () => {
    const [admissionClass, setAdmissionClass] = useState('');
    const [registrationNumber, setRegistrationNumber] = useState('');
    const [studentDetails, setStudentDetails] = useState(null);

    const handleViewStudent = async () => {
        if (!admissionClass || !registrationNumber) {
            Alert.alert('Missing Information', 'Please select class and enter registration number');
            return;
        }

        try {
            const studentQuerySnapshot = await firestore().collection('Students')
                .where('registrationNumber', '==', parseInt(registrationNumber))
                .where('admissionClass', '==', admissionClass)
                .get();

            if (studentQuerySnapshot.empty) {
                Alert.alert('Not Found', 'No student found with the given details');
                setStudentDetails(null);
            } else {
                const studentData = studentQuerySnapshot.docs[0].data();
                setStudentDetails(studentData);
            }
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Admission Class:</Text>
                <Picker
                    selectedValue={admissionClass}
                    onValueChange={(itemValue) => setAdmissionClass(itemValue)}
                    style={styles.picker}
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
            </View>
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Registration Number:</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    value={registrationNumber}
                    onChangeText={setRegistrationNumber}
                />
            </View>
            <TouchableOpacity style={styles.viewButton} onPress={handleViewStudent}>
                <Text style={styles.viewButtonText}>View Student</Text>
            </TouchableOpacity>
            {studentDetails && (
                <View style={styles.studentDetails}>
                    <Text style={styles.studentDetailText}>Name: {studentDetails.name}</Text>
                    <Text style={styles.studentDetailText}>Date of Birth: {new Date(studentDetails.dateOfBirth.seconds * 1000).toDateString()}</Text>
                    <Text style={styles.studentDetailText}>Gender: {studentDetails.gender}</Text>
                    <Text style={styles.studentDetailText}>Father's Name: {studentDetails.fatherDetails.fatherName}</Text>
                    <Text style={styles.studentDetailText}>Caste: {studentDetails.fatherDetails.caste}</Text>
                    <Text style={styles.studentDetailText}>Occupation: {studentDetails.fatherDetails.occupation}</Text>
                    <Text style={styles.studentDetailText}>Residence: {studentDetails.fatherDetails.residence}</Text>
                    <Text style={styles.studentDetailText}>Admission Class: {studentDetails.admissionClass}</Text>
                    <Text style={styles.studentDetailText}>Email: {studentDetails.email}</Text>
                    <Text style={styles.studentDetailText}>Remarks: {studentDetails.remarks}</Text>
                </View>
            )}
            <TouchableOpacity style={styles.backButton} onPress={()=>{navigation.navigate('adminDashboard')}}>
                  <Text style={styles.backText}>Back to Dashboard </Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 10,
        backgroundColor: '#FFFFFF',
    },
    backButton:{
        backgroundColor: '#58B1F4',
        borderRadius  : 10,
        height: 40,
        width: '50%',
        marginTop: 20,
        marginBottom: 60,
        alignSelf: 'center',
        justifyContent : 'center',
        alignItems: 'center',
        justifyContent: 'center',
  
      },
      buttonText: {
        fontSize: 15,
      },
    inputGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        width: '100%',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingBottom: 5,
    },
    label: {
        fontSize: 14,
        color: '#000000',
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'left',
    },
    input: {
        flex: 2,
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 5,
        backgroundColor: '#F5F5F5',
    },
    picker: {
        flex: 2,
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        backgroundColor: '#F5F5F5',
    },
    viewButton: {
        width: '80%',
        backgroundColor: '#58B1F4',
        padding: 15,
        borderRadius: 5,
        marginTop: 20,
        alignItems: 'center',
    },
    viewButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    studentDetails: {
        marginTop: 20,
        width: '100%',
        padding: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    studentDetailText: {
        fontSize: 14,
        color: '#000000',
        marginBottom: 5,
    },
});

export default ViewStudent;
