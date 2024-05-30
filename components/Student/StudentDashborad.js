import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, TouchableOpacity, Text } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const StudentDashboard = ({ navigation, route }) => {
  const { uEmail } = route.params;
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);

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
        } else {
          console.log('No student found with this email.');
        }
      } catch (error) {
        console.error('Error fetching student data: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [uEmail]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!studentData) {
    return (
      <View style={styles.noDataContainer}>
        <Text>No student data found.</Text>
      </View>
    );
  }

  const { registrationNumber: regno, admissionClass: classname } = studentData;

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Text style={styles.welcomeText}>Welcome!</Text>
        <Text style={styles.nameText}>Email: {studentData.email}</Text>
        <Text style={styles.detailText}>Registration Number: {studentData.registrationNumber}</Text>
        <Text style={styles.detailText}>Class: {studentData.admissionClass}</Text>
      </View>
      <View style={styles.dashboardContainer}>
        <Text style={styles.dashboardTitle}>DASHBOARD</Text>
        <View style={styles.buttonsRow}>
          <TouchableOpacity onPress={() => navigation.navigate('Marks')} style={styles.dashboardButton}>
            <Text style={styles.buttonText}>Marks</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Fee Status')} style={styles.dashboardButton}>
            <Text style={styles.buttonText}>Fees</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonsRow}>
          <TouchableOpacity onPress={() => navigation.navigate('Time Table', { imageName: classname + " timetable.jpg" })} style={styles.dashboardButton}>
            <Text style={styles.buttonText}>Time Table</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Syllabus', { imageName: classname + " syllabus.jpg" })} style={styles.dashboardButton}>
            <Text style={styles.buttonText}>Syllabus</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={() => navigation.replace('studentLogin')} style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>LOGOUT</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  nameText: {
    color: '#fff',
    fontSize: 18,
  },
  detailText: {
    color: '#fff',
    fontSize: 16,
    marginTop: 5,
  },
  dashboardContainer: {
    flex: 1,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
  },
  dashboardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
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
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noDataContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    padding: 15,
    margin: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default StudentDashboard;
