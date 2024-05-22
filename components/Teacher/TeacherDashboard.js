import { useState } from 'react';
import { View,StyleSheet, TextInput,StatusBar,SafeView,TouchableOpacity, Alert,Button, Image,Text ,ScrollView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const TeacherDashboard = () => {
    return (
      <View style={TeacherDashboardStyles.container}>
        <View style={TeacherDashboardStyles.profileContainer}>
          <Text style={TeacherDashboardStyles.welcomeText}>Welcome !</Text>
          <Text style={TeacherDashboardStyles.nameText}>Teacher Name</Text>
          <Text style={TeacherDashboardStyles.detailText}>Designation</Text>
          <Text style={TeacherDashboardStyles.detailText}>Class</Text>
        </View>
        <View style={TeacherDashboardStyles.marksContainer}>
          <Text style={TeacherDashboardStyles.marksTitle}>Marks</Text>
          <View style={TeacherDashboardStyles.buttonsColumn}>
            <TouchableOpacity style={TeacherDashboardStyles.marksButton}>
              {/* <Icon name="book" size={24} color="#fff" /> */}
              <Text style={TeacherDashboardStyles.buttonText}>First Term</Text>
            </TouchableOpacity>
            <TouchableOpacity style={TeacherDashboardStyles.marksButton}>
              {/* <Icon name="book" size={24} color="#fff" /> */}
              <Text style={TeacherDashboardStyles.buttonText}>Mid Term</Text>
            </TouchableOpacity>
            <TouchableOpacity style={TeacherDashboardStyles.marksButton}>
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