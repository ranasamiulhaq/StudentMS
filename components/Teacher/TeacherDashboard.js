import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, StatusBar } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const TeacherDashboard = ({ route }) => {
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
    navigation.navigate('Marks', { term: term, classId: className });
  };

  return (
    <View style={TeacherDashboardStyles.container}>
      <StatusBar barStyle="light-content" />
       
      <View style={TeacherDashboardStyles.boxContainer}>
        <Text style={TeacherDashboardStyles.welcomeText}>Welcome!</Text>
        <Text style={TeacherDashboardStyles.nameText}>{teacherName}</Text>
        <Text style={TeacherDashboardStyles.detailText}>{className}</Text>
        <TouchableOpacity style={TeacherDashboardStyles.backButton} onPress={()=>{navigation.navigate('Land')}}>
                  <Text style={TeacherDashboardStyles.backText}>Logout</Text>
        </TouchableOpacity>
      </View>
      <View style={TeacherDashboardStyles.marksContainer}>
        <Text style={TeacherDashboardStyles.marksTitle}>Marks</Text>
        <View style={TeacherDashboardStyles.buttonsColumn}>
          <TouchableOpacity onPress={() => marksPortal('first')} style={TeacherDashboardStyles.marksButton}>
            <View style={TeacherDashboardStyles.buttonContent}>
            <Image source={require('../../public/icons/marks.png')} style={TeacherDashboardStyles.image} />
            </View>
          </TouchableOpacity>
              <Text style={TeacherDashboardStyles.buttonText}>First Term</Text>

          <TouchableOpacity onPress={() => marksPortal('mid')} style={TeacherDashboardStyles.marksButton}>
            <View style={TeacherDashboardStyles.buttonContent}>
            <Image source={require('../../public/icons/marks.png')} style={TeacherDashboardStyles.image} />
            </View>
          </TouchableOpacity>
              <Text style={TeacherDashboardStyles.buttonText}>Mid Term</Text>

          <TouchableOpacity onPress={() => marksPortal('final')} style={TeacherDashboardStyles.marksButton}>
            <View style={TeacherDashboardStyles.buttonContent}>
            <Image source={require('../../public/icons/marks.png')} style={TeacherDashboardStyles.image} />
            </View>
          </TouchableOpacity>
              <Text style={TeacherDashboardStyles.buttonText}>Final Term</Text>
        </View>
      </View>
      
    
    </View>
  );
};

const TeacherDashboardStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  boxContainer: {
    marginTop: 15,
    marginHorizontal: 4,
    minWidth: '90%',
    alignSelf: 'center',
    backgroundColor: '#58B1F4',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    alignItems: 'center',
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  backButton:{
    backgroundColor: '#fff',
    borderRadius  : 10,
    height: 40,
    width: 300,
    marginTop: 10,
    alignSelf: 'center',
    justifyContent : 'center',
    alignItems: 'center',
    justifyContent: 'center',

  },
  backText: {
    color: '#58B1F4',
    fontSize: 15,
  },
  welcomeText: {
    color: '#fff',
    fontSize: 20,
    marginTop: 10,
  },
  nameText: {
    color: '#fff',
    marginTop:10,
    fontSize: 30,
    fontWeight: 'bold',
  },
  detailText: {
    color: '#fff',
    marginTop:10,
    fontSize: 18,
    marginBottom: 10,
  },
  marksContainer: {
    // minWidth: '75%',
    marginTop: 20,
    padding: 20,
  },
  marksTitle: {
    
    color: '#58B1F4',
    marginLeft:10,
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonsColumn: {
    alignItems: 'center',
  },
  image:{
    height: 50,
    width:  50,
    resizeMode: 'contain'
  },
  marksButton: {
    backgroundColor: '#58B1F4',
    padding: 15,
    borderRadius: 10,
    minWidth: '25%',
    height: '19%',
    alignItems: 'center',
    marginTop:20,
  },
  buttonContent: {
    flexDirection: 'row',
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    marginRight: 10,
  },
  buttonText: {
    fontSize: 18,
  },
});

export default TeacherDashboard;
