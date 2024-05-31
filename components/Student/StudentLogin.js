import React, { useState } from 'react';
import { View, StyleSheet, ActivityIndicator, TextInput, StatusBar, TouchableOpacity, Alert, Button, Image, Text, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


function StudentLogin({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const verifyLogin = async () => {
    setLoading(true); // Set loading to true when login starts
    try {
      if (password.length == 0 || email.length == 0) {
        Alert.alert("Please fill all the fields")
      }
      else {


        await auth().signInWithEmailAndPassword(email, password);
        const uEmail = auth().currentUser.email;
        console.log(uEmail);
        const userQuerySnapshot = await firestore().collection("Users")
          .where("email", "==", uEmail)
          .get();

        if (!userQuerySnapshot.empty) {
          const userDoc = userQuerySnapshot.docs[0];
          const userRole = userDoc.data().role;

          if (userRole === "student") {
            navigation.navigate('MainContainer', { uEmail });
          } else {
            alert("No Such Student Exists");
          }
        } else {
          alert("No Such Student Exists");
        }
      }
    } catch (error) {
      Alert.alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={LoginStyles.container}>
      <Image source={require('../../public/img/Logo.png')} style={LoginStyles.logo} />
      <Text style={LoginStyles.title}>Student Login</Text>
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

      <View style={LoginStyles.buttonContainer}>
        <Text style={LoginStyles.forget} onPress={() => { /* Handle Forgot Password */ }}>Forgot Password</Text>
        <LinearGradient colors={['#58B1F4', '#2a73ba']} style={LoginStyles.LoginButton}>
          <TouchableOpacity onPress={verifyLogin} disabled={loading}>
            {loading ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              <Text style={LoginStyles.buttonText}>Login</Text>
            )}
          </TouchableOpacity>
        </LinearGradient>
      </View>
      <View style={LoginStyles.linkContainer}>
        <Text style={LoginStyles.link} onPress={() => navigation.navigate('Land')}>Back to</Text>
        <Text style={LoginStyles.linkBold} onPress={() => navigation.navigate('Land')}> Home Page</Text>
      </View>
    </View>
  );
}

const LoginStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8F4FF',
  },
  logo: {
    width: '20%',
    height: '20%',
    resizeMode: 'contain'
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
    padding: 0,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
  },
  icon: {
    marginLeft: 10,
    marginRight: 20,
    width: '10%',
    height: '50%',
    resizeMode: 'contain'
  },
  input: {
    flex: 1,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  forget: {
    color: '#58B1F4',
    fontSize: 12,
  },
  link: {
    marginTop: 60,
    color: '#58B1F4',
    fontSize: 12,
  },
  linkBold: {
    marginTop: 60,
    color: '#58B1F4',
    fontSize: 12,
    fontWeight: 'bold',
  },
  buttonContainer: {
    width: '80%',
    alignItems: 'flex-end',
  },

  LoginButton: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '40%',
    borderRadius: 10,
    height: 40,
  },
  linkContainer: {
    flexDirection: 'row'
  }
});

export default StudentLogin;
