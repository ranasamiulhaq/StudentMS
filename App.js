import { useState } from 'react';
import { View,StyleSheet, TextInput,StatusBar,TouchableOpacity, Button, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';

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
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
        heading :{
            fontSize: 30,
            fontWeight: "bold",
            textAlign: "center",
            color: "blue"
        },
        text:{
            fontSize: 20,
            fontWeight: "bold",
            textAlign: "center",
            color: "blue"
        },
        container: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        },
        inputBox: {
          
          borderRadius: 15,
          borderWidth: 2,
          marginVertical: 10,
          padding: 10,
        },
        addButton: {
          backgroundColor: 'blue',
          alignItems: 'center',
          padding: 10,
          borderRadius: 50,
        },
    })

export default App;

