import { useState } from 'react';
import { View,StyleSheet, TextInput,StatusBar,TouchableOpacity, Button, Image,Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome';

const StartingPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={require('./public/img/Logo.png')} style={styles.logo} />
      <Text style={styles.the}>THE<Text style={styles.school}> SCHOOL</Text></Text>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.loginButton} >
          <Text style={styles.buttonText}>Teacher</Text>
          <Image source={require('./public/icons/teacher.png')} style={styles.logo} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('StudentLogin')}>
          <Text style={styles.buttonText}>Student</Text>
          <Image source={require('./public/icons/student.png')} style={styles.logo} />
        </TouchableOpacity>
      </View>

    </View>
  );
};

function HomeScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Wecome to the Home Page</Text>
        <Text>LOGIN / SIGNUP ?</Text>

        <Button
          title="Login"
          onPress={() => navigation.navigate('Login')}
        />

        <Button
          title="SignUp"
          onPress={() => navigation.navigate('Signup')}
        />

      </View>
    );
  }

  function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
  
    //
  
    const handleLogin = async () => {
      try {
        const isUserLogin = await auth().signInWithEmailAndPassword(email, password, );
        setMessage('');
        console.log(isUserLogin);
  
        navigation.navigate('Home', {email: isUserLogin.user.email, uid: isUserLogin.user.uid,});
      } 
      catch (err) {
        console.log(err);
  
        setMessage(err.message);
      }
    };
    return(
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <View>
        <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold'}}>
          Login
        </Text>
        <TextInput
          style={styles.inputBox}
          placeholder="Enter Your Email"
          value={email}
          onChangeText={value => setEmail(value)}
        />
        <TextInput
          style={styles.inputBox}
          placeholder="Enter Your Password"
          value={password}
          onChangeText={value => setPassword(value)}
          secureTextEntry={true}
        />

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => handleLogin()}>
          <Text style={{color: '#fff'}}>Login</Text>
        </TouchableOpacity>

        <Text>{message}</Text>

        <TouchableOpacity
          style={styles.signup}
          onPress={() => {
            navigation.navigate('Signup');
          }}>
          <Text style={{color: 'blue'}}>New User Signup ?</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
  }
  
  function SignupScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignup = async () => {
    try {
      const isUserCreated = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );

      console.log(isUserCreated);
    } catch (err) {
      console.log(err);

      setMessage(err.message);
    }
  };
    return (
      
      <View style={styles.container}>
      <StatusBar hidden={true} />
      <View>
        <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold'}}>
          Metahub
        </Text>
        <TextInput
          style={styles.inputBox}
          placeholder="Enter Your Email"
          value={email}
          onChangeText={value => setEmail(value)}
        />
        <TextInput
          style={styles.inputBox}
          placeholder="Enter Your Password"
          value={password}
          onChangeText={value => setPassword(value)}
          secureTextEntry={true}
        />

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => handleSignup()}>
          <Text style={{color: '#fff'}}>Signup</Text>
        </TouchableOpacity>

        <Text>{message}</Text>
      </View>
    </View>
    );
  }

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{headerShown: false}} name="Land" component={StartingPage} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
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

