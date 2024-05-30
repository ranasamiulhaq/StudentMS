import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, StatusBar } from 'react-native';
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
      </View>
      <View style={TeacherDashboardStyles.marksContainer}>
        <Text style={TeacherDashboardStyles.marksTitle}>Marks</Text>
        <View style={TeacherDashboardStyles.buttonsColumn}>
          <TouchableOpacity onPress={() => marksPortal('first')} style={TeacherDashboardStyles.marksButton}>
            <View style={TeacherDashboardStyles.buttonContent}>
              <View style={TeacherDashboardStyles.circle} />
              <Text style={TeacherDashboardStyles.buttonText}>First Term</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => marksPortal('mid')} style={TeacherDashboardStyles.marksButton}>
            <View style={TeacherDashboardStyles.buttonContent}>
              <View style={TeacherDashboardStyles.circle} />
              <Text style={TeacherDashboardStyles.buttonText}>Mid Term</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => marksPortal('final')} style={TeacherDashboardStyles.marksButton}>
            <View style={TeacherDashboardStyles.buttonContent}>
              <View style={TeacherDashboardStyles.circle} />
              <Text style={TeacherDashboardStyles.buttonText}>Final Term</Text>
            </View>
          </TouchableOpacity>
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
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  welcomeText: {
    color: '#fff',
    fontSize: 16,
    marginTop: 10,
  },
  nameText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  detailText: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 10,
  },
  marksContainer: {
    // minWidth: '75%',
    marginTop: 20,
    padding: 20,
    alignItems: 'center',
  },
  marksTitle: {
    color: '#333333',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonsColumn: {
    alignItems: 'center',
  },
  marksButton: {
    backgroundColor: '#58B1F4',
    padding: 15,
    borderRadius: 10,
    minWidth: '80%',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    marginRight: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default TeacherDashboard;
