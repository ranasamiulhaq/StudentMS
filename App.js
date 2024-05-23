import { useState } from 'react';
import { View,StyleSheet, TextInput,StatusBar,SafeView,TouchableOpacity, Alert,Button, Image,Text ,ScrollView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import StudentLogin from './components/Student/StudentLogin';
import TeacherLogin from './components/Teacher/TeacherLogin';
import AdminLogin from './components/Admin/AdminLogin';
import TeacherDashboard from './components/Teacher/TeacherDashboard';
import StudentDashboard from './components/Student/StudentDashborad';
import AdminDashboard from './components/Admin/AdminDashboard';
import CurdStudents from './components/Admin/CrudStudent';
import AddStudent from './components/Admin/AddStudent';

const StartingPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={require('./public/img/Logo.png')} style={styles.logo} />
      <Text style={styles.the}>THE<Text style={styles.school}> SCHOOL Zain</Text></Text>
      <Text  onPress={() => {navigation.navigate('adminLogin')}}>Admin Login</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('teacherLogin')} >
          <Text style={styles.buttonText}>Teacher</Text>
          <Image source={require('./public/icons/teacher.png')} style={styles.logo} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('studentLogin')}>
          <Text style={styles.buttonText}>Student</Text>
          <Image source={require('./public/icons/student.png')} style={styles.logo} />
        </TouchableOpacity>
      </View>

    </View>
  );
};

const Stack = createNativeStackNavigator();
function App() {

  // <UploadDataComponent />
  return (    
    <NavigationContainer>
      <Stack.Navigator>
      
        <Stack.Screen options={{headerShown: false}} name="Land" component={StartingPage} />

        <Stack.Screen options={{headerShown: false}} name="studentLogin" component={StudentLogin} />
        <Stack.Screen options={{headerShown: false}} name="teacherLogin" component={TeacherLogin} />
        <Stack.Screen options={{headerShown: false}} name="adminLogin" component={AdminLogin} />
        <Stack.Screen options={{headerShown: false}} name="studentDashboard" component={StudentDashboard} />
        <Stack.Screen options={{headerShown: false}} name="teacherDashboard" component={TeacherDashboard} />
        <Stack.Screen options={{headerShown: false}} name="curdStudents" component={CurdStudents} />
        <Stack.Screen options={{headerShown: false}} name="addStudents" component={AddStudent} />
        <Stack.Screen options={{headerShown: false}} name="adminDashboard" component={AdminDashboard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container:{
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  logo: {
    marginBottom: 20,
  },
  the: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 50,
  },
  school:{
    fontSize: 24,
    fontWeight: 'bold',
    color: '#58B1F4'
  },
  loginButton: {
    backgroundColor: '#58B1F4',
    padding: 15,
    borderRadius: 10,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '40%',
    
  },
  buttonsContainer:{
    flexDirection: 'row',

  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 10,
  }
    })

export default App;

