import { useState } from 'react';
import { View,StyleSheet, TextInput,StatusBar,SafeView,TouchableOpacity, Alert,Button, Image,Text ,ScrollView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import CurdStudent from './CrudStudent';
import FeeScreen from './FeeScreen';
import FeeUsersScreen from './FeeUsersScreen';
import AdminClassScreen from './AdminClassScreen';
import { View,StyleSheet, TouchableOpacity, Image,Text } from 'react-native';
function AdminDashboard({navigation}) {
    return (
      <View style={Dashboardstyles.container}>
       
        <View style={Dashboardstyles.dashboardContainer}>
          <Text style={Dashboardstyles.dashboardTitle}>Admin Panel</Text>

          <View style={Dashboardstyles.buttonsRow}>
            <TouchableOpacity style={Dashboardstyles.dashboardButton} onPress={()=>{navigation.navigate('curdStudents')}}>
              {/* <Icon name="book" size={24} color="#fff" /> */}
              <Text style={Dashboardstyles.buttonText}>Students</Text>
            </TouchableOpacity>
            <TouchableOpacity style={Dashboardstyles.dashboardButton} onPress={()=>{
              navigation.navigate('crudFee')
              }}>
              {/* <Icon name="money" size={24} color="#fff" /> */}
              <Text style={Dashboardstyles.buttonText}>FeeStatus</Text>
            </TouchableOpacity>
            <View style={Dashboardstyles.IconContainer}>
                <TouchableOpacity style={Dashboardstyles.dashboardButton} onPress={()=>{navigation.navigate('curdStudents')}}>
                  <Image source={require('../../public/icons/student.png')} style={Dashboardstyles.image} />
                </TouchableOpacity>
                <Text style={Dashboardstyles.buttonText}>Students</Text>
            </View>

            <View style={Dashboardstyles.IconContainer}>
                <TouchableOpacity style={Dashboardstyles.dashboardButton}>
                  <Image source={require('../../public/icons/marks.png')} style={Dashboardstyles.image} />
                </TouchableOpacity>
                <Text style={Dashboardstyles.buttonText}>Marks</Text>
            </View>

            <View style={Dashboardstyles.IconContainer}>
                <TouchableOpacity style={Dashboardstyles.dashboardButton} onPress={()=>{navigation.navigate('curdStudents')}}>
                  <Image source={require('../../public/icons/report.png')} style={Dashboardstyles.image} />
                </TouchableOpacity>
                <Text style={Dashboardstyles.buttonText}>Reports</Text>
            </View>

          </View>

          <View style={Dashboardstyles.buttonsRow}>
            <TouchableOpacity style={Dashboardstyles.dashboardButton} onPress={()=>{navigation.navigate('UploadTimeTable')}}>
              {/* <Icon name="calendar" size={24} color="#fff" /> */}
              <Text style={Dashboardstyles.buttonText}>Time Table</Text>
            </TouchableOpacity>
            <TouchableOpacity style={Dashboardstyles.dashboardButton} onPress={()=>{navigation.navigate('UploadSyllabus')}}>
              <Text style={Dashboardstyles.buttonText}>Syllabus</Text>
            </TouchableOpacity>
            <View style={Dashboardstyles.IconContainer}>
                <TouchableOpacity style={Dashboardstyles.dashboardButton}>
                  <Image source={require('../../public/icons/class.png')} style={Dashboardstyles.image} />
                </TouchableOpacity>
                <Text style={Dashboardstyles.buttonText}>Class</Text>
            </View>

            <View style={Dashboardstyles.IconContainer}>
                <TouchableOpacity style={Dashboardstyles.dashboardButton} onPress={()=>{navigation.navigate('curdStudents')}}>
                  <Image source={require('../../public/icons/syllabus.png')} style={Dashboardstyles.image} />
                </TouchableOpacity>
                <Text style={Dashboardstyles.buttonText}>Syllabus</Text>
            </View>

            <View style={Dashboardstyles.IconContainer}>
                <TouchableOpacity style={Dashboardstyles.dashboardButton}>
                  <Image source={require('../../public/icons/fees.png')} style={Dashboardstyles.image} />
                </TouchableOpacity>
                <Text style={Dashboardstyles.buttonText}>Fees</Text>
            </View>
          </View>

        </View>
        <TouchableOpacity style={Dashboardstyles.backButton} onPress={()=>{navigation.navigate('Land')}}>
                  <Text style={Dashboardstyles.backText}>Logout</Text>
        </TouchableOpacity>

      </View>
    );
  };

  const Dashboardstyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#E8F4FF',
    },
    image:{
      height: 30,
      width: 30,
      resizeMode: 'contain'
    },
    backButton:{
      backgroundColor: '#58B1F4',
      borderRadius  : 10,
      height: 40,
      width: '50%',
      marginTop: 20,
      marginBottom: 60,
      alignSelf: 'center',
      justifyContent : 'center',
      alignItems: 'center',
      justifyContent: 'center',

    },
    backText: {
      color: '#fff',
      fontSize: 15,
    },
    IconContainer:{
        width: '40%',
        height: '80%',
        justifyContent : 'center',
        alignItems: 'center',
        justifyContent: 'center',

    },
    dashboardContainer: {
      flex: 1,
      padding: 20,
    },
    dashboardTitle: {
      alignSelf: 'center',
      justifyContent: 'center',
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    buttonsRow: {
      width: '80%',
      height: '20%',
      flexDirection: 'row'
    },
    dashboardButton: {
      backgroundColor: '#58B1F4',
      borderRadius: 10,
      width: '60%',
      height: '75%',
      alignItems: 'center',
      alignContent: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    },
    buttonText: {
      fontSize: 15,
    },
  });

export default AdminDashboard ;