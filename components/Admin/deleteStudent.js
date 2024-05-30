import React, { useState } from 'react';
import { View, StyleSheet, TextInput, ActivityIndicator, TouchableOpacity, Alert, Text, ScrollView, Dimensions } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { Picker } from '@react-native-picker/picker';



const DeleteStudent = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const [registrationNumber, setRegistrationNumber] = useState('');
    const [admissionClass, setAdmissionClass] = useState('');

    const handleDeleteStudent = async () => {
        if (!registrationNumber || !admissionClass) {
            Alert.alert('Missing Information', 'Please fill in all fields');
            return;
        }
        setLoading(true);
        try {
            const deleteQuerySnapshot = await firestore().collection('Students')
                .where('registrationNumber', '==', parseInt(registrationNumber))
                .where('admissionClass', '==', admissionClass)
                .get();

            if (deleteQuerySnapshot.empty) {
                Alert.alert('Student Not Found', 'No student matching the provided information');
                return;
            }

            deleteQuerySnapshot.forEach(async doc => {
                await doc.ref.delete();
            });

            Alert.alert('Success', 'Student deleted successfully!');
        } catch (error) {
            Alert.alert('Error', error.message);
        }
        finally {
            setLoading(false);
        }
    };
    if(loading){
        return (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#58B1F4" />
              <Text style={styles.loadingText}>Deleting Students</Text>
            </View>
          )}


    return (
        <ScrollView contentContainerStyle={styles.container}>
            

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
    picker: {
        flex: 2,
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        backgroundColor: '#F5F5F5',
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
        backgroundColor: '#58B1F4',
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
