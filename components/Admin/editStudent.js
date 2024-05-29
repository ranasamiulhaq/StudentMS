import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import firestore from '@react-native-firebase/firestore';

const EditStudent = ({ navigation }) => {
    const [admissionClass, setAdmissionClass] = useState('');
    const [registrationNumber, setRegistrationNumber] = useState('');
    const [studentDetails, setStudentDetails] = useState(null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [dateOfBirth, setDateOfBirth] = useState(new Date());

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
                const dateOfBirth = studentData.dateOfBirth.toDate(); // Convert Firestore timestamp to Date
                setStudentDetails({ ...studentData, docId: studentQuerySnapshot.docs[0].id });
                setDateOfBirth(dateOfBirth);
            }
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    const handleSaveChanges = async () => {
        if (!studentDetails) return;

        try {
            await firestore().collection('Students').doc(studentDetails.docId).update({
                ...studentDetails,
                registrationNumber: parseInt(studentDetails.registrationNumber),
                dateOfBirth: firestore.Timestamp.fromDate(dateOfBirth)
            });
            Alert.alert('Success', 'Student details updated successfully');
        } catch (error) {
            Alert.alert('Error', error.message);
        }

        navigation.goBack();
    };

    const handleInputChange = (field, value) => {
        setStudentDetails({ ...studentDetails, [field]: value });
    };

    const handleDateChange = (event, selectedDate) => {
        setShowDatePicker(false);
        if (selectedDate) {
            setDateOfBirth(selectedDate);
            handleInputChange('dateOfBirth', selectedDate.toISOString());
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
                    <TextInput
                        style={styles.input}
                        value={studentDetails.name}
                        onChangeText={(value) => handleInputChange('name', value)}
                        placeholder="Name"
                    />
                    <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                        <TextInput
                            style={styles.input}
                            value={dateOfBirth.toISOString().split('T')[0]}
                            placeholder="Date of Birth"
                            editable={false}
                        />
                    </TouchableOpacity>
                    {showDatePicker && (
                        <DateTimePicker
                            value={dateOfBirth}
                            mode="date"
                            display="default"
                            onChange={handleDateChange}
                        />
                    )}
                    <TextInput
                        style={styles.input}
                        value={studentDetails.gender}
                        onChangeText={(value) => handleInputChange('gender', value)}
                        placeholder="Gender"
                    />
                    <TextInput
                        style={styles.input}
                        value={studentDetails.fatherDetails.fatherName}
                        onChangeText={(value) => handleInputChange('fatherDetails', { ...studentDetails.fatherDetails, fatherName: value })}
                        placeholder="Father's Name"
                    />
                    <TextInput
                        style={styles.input}
                        value={studentDetails.fatherDetails.caste}
                        onChangeText={(value) => handleInputChange('fatherDetails', { ...studentDetails.fatherDetails, caste: value })}
                        placeholder="Caste"
                    />
                    <TextInput
                        style={styles.input}
                        value={studentDetails.fatherDetails.occupation}
                        onChangeText={(value) => handleInputChange('fatherDetails', { ...studentDetails.fatherDetails, occupation: value })}
                        placeholder="Occupation"
                    />
                    <TextInput
                        style={styles.input}
                        value={studentDetails.fatherDetails.residence}
                        onChangeText={(value) => handleInputChange('fatherDetails', { ...studentDetails.fatherDetails, residence: value })}
                        placeholder="Residence"
                    />
                    <TextInput
                        style={styles.input}
                        value={studentDetails.email}
                        onChangeText={(value) => handleInputChange('email', value)}
                        placeholder="Email"
                    />
                    <TextInput
                        style={styles.input}
                        value={studentDetails.remarks}
                        onChangeText={(value) => handleInputChange('remarks', value)}
                        placeholder="Remarks"
                    />
                    <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
                        <Text style={styles.saveButtonText}>Save Changes</Text>
                    </TouchableOpacity>
                </View>
            )}
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
        marginBottom: 10,
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
    saveButton: {
        width: '80%',
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 5,
        marginTop: 20,
        alignItems: 'center',
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default EditStudent;
