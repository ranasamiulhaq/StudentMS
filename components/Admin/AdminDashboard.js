import { useState } from 'react';
import { View,StyleSheet, TextInput,StatusBar,SafeView,TouchableOpacity, Alert,Button, Image,Text ,ScrollView} from 'react-native';
function AdminDashboard({navigation}) {
    return (
      <View style={Dashboardstyles.container}>
       
        <View style={Dashboardstyles.dashboardContainer}>
          <Text style={Dashboardstyles.dashboardTitle}>Admin Panel</Text>

          <View style={Dashboardstyles.buttonsRow}>  
            <View style={Dashboardstyles.IconContainer}>
                <TouchableOpacity style={Dashboardstyles.dashboardButton} onPress={()=>{navigation.navigate('curdStudents')}}>
                  <Image source={require('../../public/icons/student.png')} style={Dashboardstyles.image} />
                </TouchableOpacity>
                <Text style={Dashboardstyles.buttonText}>Students</Text>
            </View>

            <View style={Dashboardstyles.IconContainer}>
                <TouchableOpacity style={Dashboardstyles.dashboardButton} onPress={()=>{navigation.navigate('UploadTimeTable')}}>
                  <Image source={require('../../public/icons/timetable.png')} style={Dashboardstyles.image} />
                </TouchableOpacity>
                <Text style={Dashboardstyles.buttonText}>TimeTable</Text>
            </View>

            <View style={Dashboardstyles.IconContainer}>
                <TouchableOpacity style={Dashboardstyles.dashboardButton} onPress={()=>{navigation.navigate('curdStudents')}}>
                  <Image source={require('../../public/icons/report.png')} style={Dashboardstyles.image} />
                </TouchableOpacity>
                <Text style={Dashboardstyles.buttonText}>Reports</Text>
            </View>

          
          </View>
          
          <View style={Dashboardstyles.buttonsRow}>
                     
            
            <View style={Dashboardstyles.IconContainer}>
                <TouchableOpacity style={Dashboardstyles.dashboardButton}>
                  <Image source={require('../../public/icons/class.png')} style={Dashboardstyles.image} />
                </TouchableOpacity>
                <Text style={Dashboardstyles.buttonText}>Class</Text>
            </View>

            <View style={Dashboardstyles.IconContainer}>
                <TouchableOpacity style={Dashboardstyles.dashboardButton}  onPress={()=>{navigation.navigate('UploadSyllabus')}}>
                  <Image source={require('../../public/icons/syllabus.png')} style={Dashboardstyles.image} />
                </TouchableOpacity>
                <Text style={Dashboardstyles.buttonText}>Syllabus</Text>
            </View>

            <View style={Dashboardstyles.IconContainer}>
                <TouchableOpacity style={Dashboardstyles.dashboardButton} onPress={()=>{navigation.navigate('crudFee')}}>
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