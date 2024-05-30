import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import firestore from '@react-native-firebase/firestore';

const ViewStudent = ({ navigation }) => {
    const [admissionClass, setAdmissionClass] = useState('');
    const [studentsList, setStudentsList] = useState([]);
    const [ageReport, setAgeReport] = useState(null);

    const calculateAge = (dateOfBirth) => {
        const dob = dateOfBirth.toDate();
        const today = new Date();
        const diff = Math.abs(today - dob);
        const ageYears = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
        const ageMonths = Math.floor((diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
        return { years: ageYears, months: ageMonths };
    }


    const generateAgeReport = (students) => {
        const ageMap = new Map();

        students.forEach(student => {
            const age = calculateAge(student.dateOfBirth);
            const key = `${age.years} years ${age.months} months`;

            if (ageMap.has(key)) {
                const count = ageMap.get(key);
                ageMap.set(key, {
                    count: count.count + 1,
                    boys: count.boys + (student.gender.toLowerCase() === 'male' ? 1 : 0),
                    girls: count.girls + (student.gender.toLowerCase() === 'female' ? 1 : 0)
                });
            } else {
                ageMap.set(key, {
                    count: 1,
                    boys: student.gender.toLowerCase() === 'male' ? 1 : 0,
                    girls: student.gender.toLowerCase() === 'female' ? 1 : 0
                });
            }
        });

        return ageMap;
    };

    const fetchStudentsByClass = async () => {
        try {
            if (admissionClass) {
                const studentsQuerySnapshot = await firestore().collection('Students')
                    .where('admissionClass', '==', admissionClass)
                    .get();

                if (studentsQuerySnapshot.empty) {
                    Alert.alert('Not Found', 'No students found in the selected class');
                    setStudentsList([]);
                } else {
                    const studentsData = studentsQuerySnapshot.docs.map(doc => doc.data());
                    setStudentsList(studentsData);
                }
            } else {
                Alert.alert('Missing Information', 'Please select a class');
            }
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    useEffect(() => {
        fetchStudentsByClass();
    }, [admissionClass]);

    useEffect(() => {
        if (studentsList.length > 0) {
            const report = generateAgeReport(studentsList);
            setAgeReport(report);
        }
    }, [studentsList]);

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

            {/* First Table */}
            <View style={styles.tableContainer}>
                <Text style={styles.listHeader}>Student Age Record Report for Class {admissionClass}</Text>
                <View style={styles.table}>
                    <View style={styles.row}>
                        <Text style={styles.header}>Registration No</Text>
                        <Text style={styles.header}>Student Name</Text>
                        <Text style={styles.header}>Father Name</Text>
                        <Text style={styles.header}>Date of Birth</Text>
                        <Text style={styles.header}>Age (Years & Months)</Text>
                    </View>
                    {studentsList.map((student, index) => (
                        <View key={index} style={styles.row}>
                            <Text style={styles.data}>{student.registrationNumber}</Text>
                            <Text style={styles.data}>{student.name}</Text>
                            <Text style={styles.data}>{student.fatherDetails.fatherName}</Text>
                            <Text style={styles.data}>{new Date(student.dateOfBirth.seconds * 1000).toDateString()}</Text>
                            <Text style={styles.data}>{calculateAge(student.dateOfBirth).years} years {calculateAge(student.dateOfBirth).months} months</Text>
                        </View>
                    ))}
                </View>
            </View>

            {/* Second Table */}
            <View style={styles.tableContainer}>
                <Text style={styles.listHeader}>Age Distribution</Text>
                <View style={styles.table}>
                    <View style={styles.row}>
                        <Text style={styles.header}>Age</Text>                    
                        <Text style={styles.header}>Number</Text>
                        <Text style={styles.header}>Boys</Text>
                        <Text style={styles.header}>Girls</Text>
                    </View>
                    {ageReport && Array.from(ageReport.entries()).map(([key, value], index) => (
                        <View key={index} style={styles.row}>
                            <Text style={styles.data}>{key}</Text>
                            <Text style={styles.data}>{value.count}</Text>
                            <Text style={styles.data}>{value.boys}</Text>
                            <Text style={styles.data}>{value.girls}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingVertical: 20,
        paddingHorizontal: 10,
        backgroundColor: '#FFFFFF',
    },
    inputGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        width: '100%',
    },
    label: {
        fontSize: 14,
        color: '#000000',
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'left',
    },
    picker: {
        flex: 2,
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        backgroundColor: '#F5F5F5',
    },
    tableContainer: {
        marginBottom: 20,
    },
    table: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingVertical: 5,
    },
    header: {
        flex: 1,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    data: {
        flex: 1,
        textAlign: 'center',
    },
    listHeader: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});

export default ViewStudent;

