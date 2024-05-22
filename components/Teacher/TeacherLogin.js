import { useState } from 'react';
import { View,StyleSheet, TextInput,StatusBar,SafeView,TouchableOpacity, Alert,Button, Image,Text ,ScrollView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

function TeacherLogin({ navigation }) {
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
      <Image source={require('../../public/img/Logo.png')} style={LoginStyles.logo} />
      <Text style={LoginStyles.title}>Teacher Login</Text>
      <View style={LoginStyles.inputContainer}>
      <Image source={require('../../public/icons/email.png')} style={LoginStyles.icon} />
        <TextInput
          style={LoginStyles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View style={LoginStyles.inputContainer}>
      <Image source={require('../../public/icons/password.png')} style={LoginStyles.icon} />
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

export default TeacherLogin;