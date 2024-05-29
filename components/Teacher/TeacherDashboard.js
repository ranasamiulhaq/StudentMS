// import { useState } from 'react';
import { View,StyleSheet, TextInput,StatusBar,SafeView,TouchableOpacity, Alert,Button, Image,Text ,ScrollView, SectionListComponent} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import React, { useState, useEffect } from 'react';
// import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { set } from 'firebase/database';
import marks from './marks';
import { useNavigation } from '@react-navigation/native';

const TeacherDashboard = ({route}) => {
  const { email } = route.params;
  const [teacherName, setTeacherName] = useState('');
  const [className, setClassName] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const fetchTeacherName = async () => {
      try {
        const teacherSnapshot = await firestore()
          .collection('Teachers')
          .where('email', '==', email)
          .get();

        if (!teacherSnapshot.empty) {
          const teacherData = teacherSnapshot.docs[0].data();
          const name = teacherData.name; 
          const className = teacherData.assignedclass;
          console.log(name);
          console.log(className);
          setTeacherName(name);
          setClassName(className);
        } else {
          setTeacherName('Teacher not found');
        }
      } catch (error) {
        console.error('Error fetching teacher:', error);
        setTeacherName('Error fetching teacher');
      }
    };

    fetchTeacherName();
  }, [email]);

  const marksPortal = (term) => {
    console.log('Marks Portal', term);
    navigation.navigate('Marks', { term: term, classId: className});
  }
    return (
      <View style={TeacherDashboardStyles.container}>
        <View style={TeacherDashboardStyles.profileContainer}>
          <Text style={TeacherDashboardStyles.welcomeText}>Welcome !</Text>
          <Text style={TeacherDashboardStyles.nameText}>{teacherName}</Text>
          <Text style={TeacherDashboardStyles.detailText}>{className}</Text>
        </View>
        <View style={TeacherDashboardStyles.marksContainer}>
          <Text style={TeacherDashboardStyles.marksTitle}>Marks</Text>
          <View style={TeacherDashboardStyles.buttonsColumn}>
            <TouchableOpacity onPress={() => marksPortal("first")} style={TeacherDashboardStyles.marksButton}>
              {/* <Icon name="book" size={24} color="#fff" /> */}
              <Text style={TeacherDashboardStyles.buttonText } >First Term</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => marksPortal("mid")} style={TeacherDashboardStyles.marksButton}>
              {/* <Icon name="book" size={24} color="#fff" /> */}
              <Text style={TeacherDashboardStyles.buttonText}>Mid Term</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => marksPortal("final")} style={TeacherDashboardStyles.marksButton}>
              {/* <Icon name="book" size={24} color="#fff" /> */}
              <Text style={TeacherDashboardStyles.buttonText}>Final Term</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const TeacherDashboardStyles = StyleSheet.create({
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
    marksContainer: {
      flex: 1,
      padding: 20,
    },
    marksTitle: {
      color: '#58B1F4',
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    buttonsColumn: {
      alignItems: 'center',
    },
    marksButton: {
      backgroundColor: '#58B1F4',
      padding: 20,
      borderRadius: 10,
      width: '80%',
      alignItems: 'center',
      marginBottom: 20,
      flexDirection: 'row',
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
      marginLeft: 10,
    },
  });

  export default TeacherDashboard;