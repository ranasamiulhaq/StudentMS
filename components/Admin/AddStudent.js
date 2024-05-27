    import React, { useState } from 'react';
    import { View, StyleSheet, TextInput, TouchableOpacity, Alert, Text, ScrollView, Dimensions } from 'react-native';
    import { Picker } from '@react-native-picker/picker';
    import DateTimePicker from '@react-native-community/datetimepicker';
    import auth from '@react-native-firebase/auth';
    import firestore from '@react-native-firebase/firestore';

    const AddStudent = ({ navigation }) => {
        const [registrationNumber, setRegistrationNumber] = useState('');
        const [dateOfAdmission, setDateOfAdmission] = useState(new Date());
        const [showDateOfAdmissionPicker, setShowDateOfAdmissionPicker] = useState(false);
        const [name, setName] = useState('');
        const [dateOfBirth, setDateOfBirth] = useState(new Date());
        const [showDateOfBirthPicker, setShowDateOfBirthPicker] = useState(false);
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
            const hashedPassword = plainPassword; //await bcrypt.hash(plainPassword, saltRounds);
            return hashedPassword;
        };

        const handleAddStudent = async () => {

            if (
                !registrationNumber ||
                !name ||
                !gender ||
                !fatherName ||
                !caste ||
                !occupation ||
                !residence ||
                !admissionClass ||
                !email ||
                !password
            ) {
                Alert.alert('Missing Information', 'Please fill in all mandatory fields');
                return;
            }

            if (registrationNumber < 0 || registrationNumber > 1000) {
                Alert.alert('Invalid Registration Number', 'Registration number must be between 0 and 1000');
                return;
            }

            try {
                const registrationQuerySnapshot = await firestore().collection('Students')
                    .where('registrationNumber', '==', parseInt(registrationNumber))
                    .where('admissionClass', '==', parseInt(admissionClass))
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

                await firestore().collection('Users').add({
                    email: uEmail,
                    role:'student'
                });

                Alert.alert('Success', 'Student added successfully!');
            } catch (error) {
                Alert.alert('Error', error.message);
            }
        };

        const handleDateOfAdmissionChange = (event, selectedDate) => {
            const currentDate = selectedDate || dateOfAdmission;
            setShowDateOfAdmissionPicker(Platform.OS === 'ios');
            setDateOfAdmission(currentDate);
        };

        const handleDateOfBirthChange = (event, selectedDate) => {
            const currentDate = selectedDate || dateOfBirth;
            setShowDateOfBirthPicker(Platform.OS === 'ios');
            setDateOfBirth(currentDate);
        };

        return (
           

            <ScrollView contentContainerStyle={crudStyles.container}>
                <TouchableOpacity onPress={() => {navigation.navigate('curdStudents')}}>
                    <Text>Back</Text> 
                </TouchableOpacity>

                <View style={crudStyles.inputGroup}>
                    <Text style={crudStyles.label}>Registration Number:</Text>
                    <TextInput
                        style={crudStyles.input}
                        keyboardType="numeric"
                        value={registrationNumber}
                        onChangeText={setRegistrationNumber}
                    />
                </View>
                <View style={crudStyles.inputGroup}>
                    <Text style={crudStyles.label}>Date of Admission:</Text>
                    <TouchableOpacity onPress={() => setShowDateOfAdmissionPicker(true)} style={crudStyles.dateButton}>
                        <Text style={crudStyles.dateText}>{dateOfAdmission.toDateString()}</Text>
                    </TouchableOpacity>
                    {showDateOfAdmissionPicker && (
                        <DateTimePicker
                            value={dateOfAdmission}
                            mode="date"
                            display="default"
                            onChange={handleDateOfAdmissionChange}
                        />
                    )}
                </View>
                <View style={crudStyles.inputGroup}>
                    <Text style={crudStyles.label}>Name of Student:</Text>
                    <TextInput
                        style={crudStyles.input}
                        value={name}
                        onChangeText={setName}
                    />
                </View>
                <View style={crudStyles.inputGroup}>
                    <Text style={crudStyles.label}>Date of Birth:</Text>
                    <TouchableOpacity onPress={() => setShowDateOfBirthPicker(true)} style={crudStyles.dateButton}>
                        <Text style={crudStyles.dateText}>{dateOfBirth.toDateString()}</Text>
                    </TouchableOpacity>
                    {showDateOfBirthPicker && (
                        <DateTimePicker
                            value={dateOfBirth}
                            mode="date"
                            display="default"
                            onChange={handleDateOfBirthChange}
                        />
                    )}
                </View>
                <View style={crudStyles.inputGroup}>
                    <Text style={crudStyles.label}>Gender:</Text>
                    <Picker
                        selectedValue={gender}
                        onValueChange={(itemValue) => setGender(itemValue)}
                        style={crudStyles.picker}
                    >
                        <Picker.Item label="Select Gender" value="" />
                        <Picker.Item label="Male" value="male" />
                        <Picker.Item label="Female" value="female" />
                        <Picker.Item label="Other" value="other" />
                    </Picker>
                </View>
                <View style={crudStyles.inputGroup}>
                    <Text style={crudStyles.label}>Father's Name:</Text>
                    <TextInput
                        style={crudStyles.input}
                        value={fatherName}
                        onChangeText={setFatherName}
                    />
                </View>
                <View style={crudStyles.inputGroup}>
                    <Text style={crudStyles.label}>Caste:</Text>
                    <TextInput
                        style={crudStyles.input}
                        value={caste}
                        onChangeText={setCaste}
                    />
                </View>
                <View style={crudStyles.inputGroup}>
                    <Text style={crudStyles.label}>Occupation:</Text>
                    <TextInput
                        style={crudStyles.input}
                        value={occupation}
                        onChangeText={setOccupation}
                    />
                </View>
                <View style={crudStyles.inputGroup}>
                    <Text style={crudStyles.label}>Residence:</Text>
                    <TextInput
                        style={crudStyles.input}
                        value={residence}
                        onChangeText={setResidence}
                    />
            </View>
                <View style={crudStyles.inputGroup}>
                    <Text style={crudStyles.label}>Admission Class:</Text>
                    <Picker
                        selectedValue={admissionClass}
                        onValueChange={(itemValue) => setAdmissionClass(itemValue)}
                        style={crudStyles.picker}
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
                <View style={crudStyles.inputGroup}>
                    <Text style={crudStyles.label}>Email:</Text>
                    <TextInput
                        style={crudStyles.input}
                        keyboardType="email-address"
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>
                <View style={crudStyles.inputGroup}>
                    <Text style={crudStyles.label}>Password:</Text>
                    <TextInput
                        style={crudStyles.input}
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />
                </View>
                <View style={crudStyles.inputGroup}>
                    <Text style={crudStyles.label}>Remarks:</Text>
                    <TextInput
                        style={crudStyles.input}
                        value={remarks}
                        onChangeText={setRemarks}
                    />
                </View>
                <TouchableOpacity style={crudStyles.addButton} onPress={handleAddStudent}>
                    <Text style={crudStyles.addButtonText}>Add Student</Text>
                </TouchableOpacity>
            </ScrollView>
        );
    };

    const windowWidth = Dimensions.get('window').width;

    const crudStyles = StyleSheet.create({
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
        picker: {
            flex: 2,
            height: 40,
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 5,
            backgroundColor: '#F5F5F5',
        },
        dateButton: {
            padding: 10,
            backgroundColor: '#F5F5F5',
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
            flex: 2,
        },
        dateText: {
            fontSize: 14,
            color: '#000000',
        },
        addButton: {
            width: windowWidth - 80,
            backgroundColor: '#58B1F4',
            padding: 15,
            borderRadius: 5,
            marginTop: 20,
            alignItems: 'center',
        },
        addButtonText: {
            color: '#fff',
            fontSize: 16,
            fontWeight: 'bold',
        },
    });

    export default AddStudent;
