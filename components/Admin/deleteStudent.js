import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Alert, Text, ScrollView, Dimensions } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const DeleteStudent = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [registrationNumber, setRegistrationNumber] = useState('');
    const [admissionClass, setAdmissionClass] = useState('');

    const handleDeleteStudent = async () => {
        if (!email || !registrationNumber || !admissionClass) {
            Alert.alert('Missing Information', 'Please fill in all fields');
            return;
        }

        try {
            const deleteQuerySnapshot = await firestore().collection('Students')
                .where('email', '==', email)
                .where('registrationNumber', '==', parseInt(registrationNumber))
                .where('admissionClass', '==', admissionClass)
                .get();

            if (deleteQuerySnapshot.empty) {
                Alert.alert('Student Not Found', 'No student matching the provided information');
                return;
            }

            // Assuming there's only one student with the provided details
            deleteQuerySnapshot.forEach(async doc => {
                await doc.ref.delete();
            });

            Alert.alert('Success', 'Student deleted successfully!');
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TouchableOpacity onPress={() => { navigation.navigate('curdStudents') }}>
                <Text>Back</Text>
            </TouchableOpacity>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Email:</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                />
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

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Admission Class:</Text>
                <TextInput
                    style={styles.input}
                    value={admissionClass}
                    onChangeText={setAdmissionClass}
                />
            </View>

            <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteStudent}>
                <Text style={styles.deleteButtonText}>Delete Student</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const windowWidth = Dimensions.get('window').width;

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
    },
    deleteButton: {
        width: windowWidth - 80,
        backgroundColor: '#FF6347',
        padding: 15,
        borderRadius: 5,
        marginTop: 20,
        alignItems: 'center',
    },
    deleteButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default DeleteStudent;
