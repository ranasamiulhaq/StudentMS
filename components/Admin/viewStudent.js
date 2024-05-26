import { useState } from 'react';
import { View,StyleSheet, TextInput,StatusBar,SafeView,TouchableOpacity, Alert,Button, Image,Text ,ScrollView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const AddStudent = () => {
    const [registrationNumber, setRegistrationNumber] = useState('');
    const [dateOfAdmission, setDateOfAdmission] = useState('');
    const [name, setName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [gender, setGender] = useState('');
    const [fatherName, setFatherName] = useState('');
    const [caste, setCaste] = useState('');
    const [occupation, setOccupation] = useState('');
    const [residence, setResidence] = useState('');
    const [admissionClass, setAdmissionClass] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remarks, setRemarks] = useState('');

    const hashPassword = async (plainPassword) => {
        const saltRounds = 10;
        const hashedPassword = plainPassword //await bcrypt.hash(plainPassword, saltRounds);
        return hashedPassword;
    };

    const handleAddStudent = async () => {
        if (registrationNumber < 0 || registrationNumber > 1000) {
            Alert.alert('Invalid Registration Number', 'Registration number must be between 0 and 1000');
            return;
        }

        try {
          const registrationQuerySnapshot = await firestore().collection('Students')
            .where('registrationNumber', '==', parseInt(registrationNumber))
            .get();

          if (!registrationQuerySnapshot.empty) {
              Alert.alert('Duplicate Registration Number', 'A student with this registration number already exists');
              return;
          }
            const hashedPassword = await hashPassword(password);
            await auth().createUserWithEmailAndPassword(email, password);
            const uEmail = auth().currentUser.email;

            await firestore().collection('Students').add({
                registrationNumber: parseInt(registrationNumber),
                dateOfAdmission: dateOfAdmission,
                name: name,
                dateOfBirth: dateOfBirth,
                gender: gender,
                fatherDetails: {
                  fatherName: fatherName,
                  caste: caste,
                  occupation: occupation,
                  residence: residence,
              },
              admissionClass: admissionClass,
              email: uEmail,
              password: hashedPassword,
              remarks: remarks
            });

            Alert.alert('Success', 'Student added successfully!');
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    return (
        <ScrollView style={crudStyles.container}>
            <TextInput
                style={crudStyles.input}
                placeholder="Registration Number"
                keyboardType="numeric"
                value={registrationNumber}
                onChangeText={setRegistrationNumber}
            />
            <TextInput
                style={crudStyles.input}
                placeholder="Date of Admission/Registration"
                value={dateOfAdmission}
                onChangeText={setDateOfAdmission}
            />
            <TextInput
                style={crudStyles.input}
                placeholder="Name of Student"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={crudStyles.input}
                placeholder="Date of Birth"
                value={dateOfBirth}
                onChangeText={setDateOfBirth}
            />
            <TextInput
                style={crudStyles.input}
                placeholder="Gender"
                keyboardType='gender'
                value={gender}
                onChangeText={setGender}
            />
            <TextInput
                style={crudStyles.input}
                placeholder="Father's Name"
                value={fatherName}
                onChangeText={setFatherName}
            />
            <TextInput
                style={crudStyles.input}
                placeholder="Caste"
                value={caste}
                onChangeText={setCaste}
            />
            <TextInput
                style={crudStyles.input}
                placeholder="Occupation"
                value={occupation}
                onChangeText={setOccupation}
            />
            <TextInput
                style={crudStyles.input}
                placeholder="Residence"
                value={residence}
                onChangeText={setResidence}
            />
            <TextInput
                style={crudStyles.input}
                placeholder="Admission Class"
                value={admissionClass}
                onChangeText={setAdmissionClass}
            />
            <TextInput
                style={crudStyles.input}
                placeholder="Email"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={crudStyles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <TextInput
                style={crudStyles.input}
                placeholder="Remarks"
                value={remarks}
                onChangeText={setRemarks}
            />
            <Button title="Add Student" onPress={handleAddStudent} />
        </ScrollView>
    );
};

const crudStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
});


export default AddStudent;
