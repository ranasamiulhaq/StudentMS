import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, StatusBar, SafeView, TouchableOpacity, Alert, Button, Image, Text, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import Marks from './StudentMarks';
import FeeStatus from './StudentFeeStatus';
import firestore from '@react-native-firebase/firestore';

const StudentDashboard = ({ navigation, route }) => {
  const { uEmail } = route.params;
  const [studentData, setStudentData] = useState(null);
  const [regno, setRegno] = useState(null);
  const [classname, setClass] = useState(null);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const studentQuerySnapshot = await firestore()
          .collection('Students')
          .where('email', '==', uEmail)
          .get();

        if (!studentQuerySnapshot.empty) {
          const studentDoc = studentQuerySnapshot.docs[0];
          const data = studentDoc.data();
          setStudentData(data);
          // setRegno(studentData.registrationNumber)
          setRegno(data.registrationNumber)
          setClass(data.admissionClass)

        } else {
          console.log('No student found with this email.');
        }

      } catch (error) {
        console.error('Error fetching student data: ', error);
      }
    };

    fetchStudentData();
  }, [uEmail]);

  if (!studentData) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }



  return (

    <View style={Dashboardstyles.container}>
      <View style={Dashboardstyles.profileContainer}>
        <Text style={Dashboardstyles.welcomeText}>Welcome !</Text>
        <Text style={Dashboardstyles.nameText}>Email: {studentData.email}</Text>
        <Text style={Dashboardstyles.detailText}>Registration number: {studentData.registrationNumber}</Text>
        <Text style={Dashboardstyles.detailText}>Class: {studentData.admissionClass}</Text>
      </View>
      <View style={Dashboardstyles.dashboardContainer}>
        <Text style={Dashboardstyles.dashboardTitle}>Dashboard</Text>
        <View style={Dashboardstyles.buttonsRow}>
          <TouchableOpacity onPress={() => navigation.navigate('StudentMarks', { regno })} style={Dashboardstyles.dashboardButton}>

            {/* <Icon name="book" size={24} color="#fff" /> */}
            <Text style={Dashboardstyles.buttonText}>Marks</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('StudentFeeStatus', { regno })} style={Dashboardstyles.dashboardButton}>
            {/* <Icon name="money" size={24} color="#fff" /> */}
            <Text style={Dashboardstyles.buttonText}>Fees</Text>
          </TouchableOpacity>
        </View>
        <View style={Dashboardstyles.buttonsRow}>
          <TouchableOpacity style={Dashboardstyles.dashboardButton}>
            {/* onPress={() => navigation.navigate('Timetable', { imageName: classname + " timetable.jpg" })} */}
            {/* <Icon name="calendar" size={24} color="#fff" /> */}
            <Text style={Dashboardstyles.buttonText}>Time Table</Text>
          </TouchableOpacity>
          <TouchableOpacity style={Dashboardstyles.dashboardButton}>
            {/* <Icon name="file-text" size={24} color="#fff" /> */}
            <Text style={Dashboardstyles.buttonText}>Syllabus</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const Dashboardstyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F4FF',
  },
  profileContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#58B1F4',
    margin: 20,
    borderRadius: 10,
  },
  welcomeText: {
    color: '#fff',
    fontSize: 18,
  },
  nameText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  detailText: {
    color: '#fff',
    fontSize: 16,
  },
  dashboardContainer: {
    flex: 1,
    padding: 20,
  },
  dashboardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dashboardButton: {
    backgroundColor: '#58B1F4',
    padding: 20,
    borderRadius: 10,
    width: '45%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 10,
  },
});

export default StudentDashboard;