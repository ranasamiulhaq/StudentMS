import { useState } from 'react';
import { View,StyleSheet, TextInput,StatusBar,SafeView,TouchableOpacity, Alert,Button, Image,Text ,ScrollView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import CurdStudent from './CrudStudent';

function AdminDashboard({navigation}) {
    return (
      <View style={Dashboardstyles.container}>
       
        <View style={Dashboardstyles.dashboardContainer}>
          <Text style={Dashboardstyles.dashboardTitle}>Dashboard</Text>
          <View style={Dashboardstyles.buttonsRow}>
            <TouchableOpacity style={Dashboardstyles.dashboardButton} onPress={()=>{navigation.navigate('curdStudents')}}>
              {/* <Icon name="book" size={24} color="#fff" /> */}
              <Text style={Dashboardstyles.buttonText}>Students</Text>
            </TouchableOpacity>
            <TouchableOpacity style={Dashboardstyles.dashboardButton}>
              {/* <Icon name="money" size={24} color="#fff" /> */}
              <Text style={Dashboardstyles.buttonText}>Fees</Text>
            </TouchableOpacity>
          </View>
          <View style={Dashboardstyles.buttonsRow}>
            <TouchableOpacity style={Dashboardstyles.dashboardButton}>
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

export default AdminDashboard ;