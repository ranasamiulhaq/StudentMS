import React from 'react';
import { View, StyleSheet, TextInput, StatusBar, SafeAreaView, TouchableOpacity, Alert, Button, Image, Text, ScrollView, Animated, Easing } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient'; // Import LinearGradient

import StudentLogin from './components/Student/StudentLogin';
import TeacherLogin from './components/Teacher/TeacherLogin';
import AdminLogin from './components/Admin/AdminLogin';
import TeacherDashboard from './components/Teacher/TeacherDashboard';
import StudentDashboard from './components/Student/StudentDashborad';
import AdminDashboard from './components/Admin/AdminDashboard';
import CurdStudents from './components/Admin/CrudStudent';
import AddStudent from './components/Admin/AddStudent';
import DeleteStudent from './components/Admin/deleteStudent';
import ViewStudent from './components/Admin/viewStudent';

const StartingPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={require('./public/img/Logo.png')} style={styles.logo} />
      <Text style={styles.the}>THE<Text style={styles.school}>SCHOOL</Text></Text>
      <View style={styles.buttonsContainer}>
        <LinearGradient colors={['#79bae6', '#468ec5']} style={styles.loginButton}>
          <TouchableOpacity onPress={() => navigation.navigate('teacherLogin')}>
            <Text style={styles.buttonText}>Teacher</Text>
            <Image source={require('./public/icons/teacher.png')} style={styles.icon} />
          </TouchableOpacity>
        </LinearGradient>

        <LinearGradient colors={['#79bae6', '#468ec5']} style={styles.loginButton}>
          <TouchableOpacity onPress={() => navigation.navigate('studentLogin')}>
            <Text style={styles.buttonText}>Student</Text>
            <Image source={require('./public/icons/student.png')} style={styles.icon} />
          </TouchableOpacity>
        </LinearGradient>
      </View>

      <LinearGradient colors={['#468ec5', '#79bae6']} style={styles.AdminButton}>
          <TouchableOpacity onPress={() => navigation.navigate('adminLogin')} style={styles.admin}>
              <Text style={styles.buttonText}>Admin</Text>
            </TouchableOpacity>
        </LinearGradient>
    </View>
  );
};

const Stack = createNativeStackNavigator();

const fadeTransition = {
  animation: 'fade',
  config: {
    duration: 800,
    easing: Easing.linear,
  },
};

const screenOptions = {
  headerShown: false,
  transitionSpec: {
    open: fadeTransition,
    close: fadeTransition,
  },
  cardStyleInterpolator: ({ current }) => ({
    cardStyle: {
      opacity: current.progress,
    },
  }),
};

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name="adminDashboard" component={AdminDashboard} />
        <Stack.Screen name="Land" component={StartingPage} />

        <Stack.Screen name="teacherDashboard" component={TeacherDashboard} />
        <Stack.Screen name="teacherLogin" component={TeacherLogin} />
        
        <Stack.Screen name="studentLogin" component={StudentLogin} />
        <Stack.Screen name="studentDashboard" component={StudentDashboard} />
        
        <Stack.Screen name="adminLogin" component={AdminLogin} />
        <Stack.Screen name="curdStudents" component={CurdStudents} />
        <Stack.Screen name="addStudents" component={AddStudent} />
        <Stack.Screen name="deleteStudents" component={DeleteStudent} />
        <Stack.Screen name="viewStudents" component={ViewStudent} />
      
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  logo: {
    marginBottom: 10,
  },
  icon: {
    marginBottom: 20,
  },
  the: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 50,
  },
  admin: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
  school: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#58B1F4',
  },
  loginButton: {
    padding: 15,
    borderRadius: 10,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '40%',
    flexDirection: 'row',
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  AdminButton: {
    width: '85%',
    borderRadius: 10,
    justifyContent: 'center',
    alignContent: 'center',
    height: 50,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 10,
    marginBottom: 10,
  },
});

export default App;
