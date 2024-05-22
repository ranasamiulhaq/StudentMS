import { useState } from 'react';
import { View,StyleSheet, TextInput,StatusBar,TouchableOpacity, Button, Image,Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import FeeUsersScreen from './components/FeeUsersScreen';
import FeeScreen from './components/FeeScreen';
// import UploadDataComponent from './utils/UploadDataComponent';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {LinearGradient} from 'react-native-linear-gradient';

const StartingPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={require('./public/img/Logo.png')} style={styles.logo} />
      <Text style={styles.the}>THE<Text style={styles.school}> SCHOOL Zain</Text></Text>

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

function StudentLoginScreen({ navigation }) {
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');

      const verifyLogin = ()=> auth().signInWithEmailAndPassword(email, password).then(() => {
        const uEmail = auth().currentUser.email;
        console.log(uEmail);
        firestore().collection("Users").doc(uEmail).get()
            .then((documentSnapshot) => {
                if (documentSnapshot.exists) {
                    const userRole = documentSnapshot.data().role;
                    if (userRole === "student") {
                        navigation.navigate('studentDashboard');
                    }
                    else {
                      alert("No Such Student Exist");
                    
                  }
                } else {
                    alert("No Such Student Exist");
                }
            })
            .catch((error) => {
                alert(error.message);
            });
    })
    .catch((error) => {
        alert(error.message);
    });


    return (
      <View style={LoginStyles.container}>
        <Image source={require('./public/img/Logo.png')} style={LoginStyles.logo} />
        <Text style={LoginStyles.title}>Student Login</Text>
        <View style={LoginStyles.inputContainer}>
        <Image source={require('./public/icons/email.png')} style={LoginStyles.icon} />
          <TextInput
            style={LoginStyles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={LoginStyles.inputContainer}>
        <Image source={require('./public/icons/password.png')} style={LoginStyles.icon} />
          <TextInput
            style={LoginStyles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <TouchableOpacity style={LoginStyles.button} onPress={()=>verifyLogin()}>
          <Text style={LoginStyles.buttonText}>Login</Text>
        </TouchableOpacity>
        <Text style={LoginStyles.link} onPress={() => { /* Handle Forgot Password */ }}>Forgot Password</Text>
        <Text style={LoginStyles.link} onPress={() => navigation.navigate('Land')}>Back to Home Page</Text>
      </View>
      );
    };

function TeacherLoginScreen({ navigation }) {
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const verifyLogin = ()=> auth().signInWithEmailAndPassword(email, password).then(() => {
        const uEmail = auth().currentUser.email;
        console.log(uEmail);
        firestore().collection("Users").doc(uEmail).get()
            .then((documentSnapshot) => {
                if (documentSnapshot.exists) {
                    const userRole = documentSnapshot.data().role;
                    if (userRole === "teacher") {
                        navigation.navigate('studentDashboard');
                    }
                    else {
                      alert("No Such Teacher Exist");
                    
                  }
                } else {
                    alert("No Such Teacher Exist");
                }
            })
            .catch((error) => {
                alert(error.message);
            });
    })
    .catch((error) => {
        alert(error.message);
    });

    return (
      <View style={LoginStyles.container}>
        <Image source={require('./public/img/Logo.png')} style={LoginStyles.logo} />
        <Text style={LoginStyles.title}>Teacher Login</Text>
        <View style={LoginStyles.inputContainer}>
        <Image source={require('./public/icons/email.png')} style={LoginStyles.icon} />
          <TextInput
            style={LoginStyles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={LoginStyles.inputContainer}>
        <Image source={require('./public/icons/password.png')} style={LoginStyles.icon} />
          <TextInput
            style={LoginStyles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <TouchableOpacity style={LoginStyles.button} onPress={()=>verifyLogin()}>
          <Text style={LoginStyles.buttonText}>Login</Text>
        </TouchableOpacity>
        <Text style={LoginStyles.link} onPress={() => { /* Handle Forgot Password */ }}>Forgot Password</Text>
        <Text style={LoginStyles.link} onPress={() => navigation.navigate('Land')}>Back to Home Page</Text>
      </View>
      );
  };

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
  

  const StudentDashboard = () => {
    return (
      <View style={Dashboardstyles.container}>
        <View style={Dashboardstyles.profileContainer}>
          <Text style={Dashboardstyles.welcomeText}>Welcome !</Text>
          <Text style={Dashboardstyles.nameText}>Student Name</Text>
          <Text style={Dashboardstyles.detailText}>Reg Number</Text>
          <Text style={Dashboardstyles.detailText}>Class</Text>
        </View>
        <View style={Dashboardstyles.dashboardContainer}>
          <Text style={Dashboardstyles.dashboardTitle}>Dashboard</Text>
          <View style={Dashboardstyles.buttonsRow}>
            <TouchableOpacity style={Dashboardstyles.dashboardButton}>
              {/* <Icon name="book" size={24} color="#fff" /> */}
              <Text style={Dashboardstyles.buttonText}>Marks</Text>
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


const Stack = createNativeStackNavigator();
function App() {

  // <UploadDataComponent />
  return (    
    <NavigationContainer>
      <Stack.Navigator>
      
        <Stack.Screen options={{headerShown: false}} name="Land" component={StartingPage} />
        <Stack.Screen options={{headerShown: false}} name="studentLogin" component={StudentLoginScreen} />
        <Stack.Screen options={{headerShown: false}} name="teacherLogin" component={TeacherLoginScreen} />
        <Stack.Screen options={{headerShown: false}} name="studentDashboard" component={StudentDashboard} />
        <Stack.Screen options={{headerShown: false}} name="teacherDashboard" component={TeacherDashboard} />
        <Stack.Screen options={{headerShown: false}} name="FeeUsersScreen" component={FeeUsersScreen} />
        <Stack.Screen options={{headerShown:false}}  name="FeeScreen" component={FeeScreen}/>
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

    
const LoginStyles = StyleSheet.create({
      container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E8F4FF',
      },
      logo: {
        width: 100,
        height: 100,
        marginBottom: 20,
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 50,
      },
      inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '80%',
        padding: 15,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 20,
      },
      icon: {
        marginRight: 10,
      },
      input: {
        flex: 1,
      },
      button: {
        backgroundColor: '#58B1F4',
        padding: 15,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
      },
      buttonText: {
        color: '#fff',
        fontSize: 18,
      },
      link: {
        color: '#58B1F4',
        marginTop: 15,
        fontSize: 16,
      },
    });
    
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

export default App;

