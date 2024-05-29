import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text, Easing } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import FeeUsersScreen from './components/Admin/FeeUsersScreen';
import FeeScreen from './components/Admin/FeeScreen';
import LinearGradient from 'react-native-linear-gradient'; // Import LinearGradient

import StudentLogin from './components/Student/StudentLogin';
import TeacherLogin from './components/Teacher/TeacherLogin';
import AdminLogin from './components/Admin/AdminLogin';
import TeacherDashboard from './components/Teacher/TeacherDashboard';
import StudentDashboard from './components/Student/StudentDashborad';
import AdminDashboard from './components/Admin/AdminDashboard';
import CurdStudents from './components/Admin/CrudStudent';
import AddStudent from './components/Admin/AddStudent';
import EditStudent from './components/Admin/editStudent';
import AdminClassScreen from './components/Admin/AdminClassScreen'
import crudFee from './components/Admin/crudFee'
import viewFeeStatusdetail from './components/Admin/viewFeeStatusdetail'
import DeleteFeeStatus from './components/Admin/DeleteFeeStatus';
import EditFee from './components/Admin/EditFee';
import UploadTimeTable from './components/Admin/UploadTimeTable';
import UploadSyllabus from './components/Admin/UploadSyllabus';
import Marks from './components/Teacher/marks';
import DeleteStudent from './components/Admin/deleteStudent';
import ViewStudent from './components/Admin/viewStudent';
import StudentMarks from './components/Student/StudentMarks';
import StudentFeeStatus from './components/Student/StudentFeeStatus';
import Timetable from './components/Student/Timetable';
import Syllabus from './components/Student/Syllabus';
import TeacherList from './components/Admin/TeacherList';
import TeacherScreen from './components/Admin/TeacherScreen';
import AssignTeacher from './components/Admin/AssignTeacher';
import Reports from './components/Admin/Reports';
import AgeReport from './components/Admin/AgeReport';
import ClassAgeReport from './components/Admin/ClassAgeReport';

const StartingPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={require('./public/img/Logo.png')} style={styles.logo} />
      <Text style={styles.the}>THE<Text style={styles.school}> SCHOOL</Text></Text>
      
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

const Stack = createNativeStackNavigator();
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{headerShown: false}} name="adminDashboard" component={AdminDashboard} />
        <Stack.Screen options={{headerShown: false}} name="Land" component={StartingPage} />
        <Stack.Screen options={{headerShown: false}} name="studentLogin" component={StudentLogin} />
        <Stack.Screen options={{headerShown: false}} name="teacherLogin" component={TeacherLogin} />
        <Stack.Screen options={{headerShown: false}} name="adminLogin" component={AdminLogin} />
        <Stack.Screen options={{headerShown: false}} name="studentDashboard" component={StudentDashboard} />
        <Stack.Screen options={{headerShown: false}} name="teacherDashboard" component={TeacherDashboard} />
        <Stack.Screen options={{headerShown: false}} name="curdStudents" component={CurdStudents} />
        <Stack.Screen options={{ title: 'Add Student' }} name="addStudents" component={AddStudent} />
        <Stack.Screen options={{ title: 'Edit Student' }} name="editStudents" component={EditStudent} />
        <Stack.Screen options={{headerShown: false}} name="FeeUsersScreen" component={FeeUsersScreen} />
        <Stack.Screen options={{headerShown: false}} name="FeeScreen" component={FeeScreen} />
        <Stack.Screen options={{title: 'Generate Fee'}} name="AdminClassScreen" component={AdminClassScreen} />     
        <Stack.Screen options={{headerShown: false}} name="crudFee" component={crudFee} /> 
        <Stack.Screen options={{headerShown: false}} name="viewFeeStatusdetail" component={viewFeeStatusdetail} /> 
        <Stack.Screen options={{title: 'Fee Status'}} name="deletefeeStatus" component={DeleteFeeStatus} /> 
        <Stack.Screen options={{headerShown: false}} name="EditFee" component={EditFee} />  
        <Stack.Screen options={{title: 'Upload Time Table'}} name="UploadTimeTable" component={UploadTimeTable} /> 
        <Stack.Screen options={{title: 'Upload Syllabus'}} name="UploadSyllabus" component={UploadSyllabus} />  
        <Stack.Screen options={{ title: 'Delete Student' }}name="deleteStudents" component={DeleteStudent} />
        <Stack.Screen options={{ title: 'View Student' }} name="viewStudents" component={ViewStudent} />
        <Stack.Screen options={{title: 'Marks'}} name="Marks" component={Marks} />
        <Stack.Screen options={{title: 'StudentMarks'}} name="StudentMarks" component={StudentMarks} />
        <Stack.Screen options={{title:'StudentFeeStatus'}} name="StudentFeeStatus" component={StudentFeeStatus} />
        <Stack.Screen options={{title:'Timetable'}} name="Timetable" component={Timetable} />
        <Stack.Screen options={{title:'Syllabus'}} name="Syllabus" component={Syllabus} />
        <Stack.Screen options={{title:'Teachers'}} name="TeacherList" component={TeacherList} />
        <Stack.Screen options={{headerShown: false}} name="TeacherScreen" component={TeacherScreen} />
        <Stack.Screen options={{headerShown: false}} name="ReportScreen" component={Reports} />
        <Stack.Screen options={{title:'Assign Class'}} name="AssignTeacher" component={AssignTeacher} />
        <Stack.Screen options={{title:'Age Report'}} name="AgeReport" component={AgeReport} />
        <Stack.Screen options={{title:'Class Age Report'}} name="ClassAgeReport" component={ClassAgeReport} />
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
    marginTop: 80,
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
