import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Animated,
  Easing,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import Background from './Background';
import {darkGreen} from './Constants';
import Field from './Field';
import Btn from './Btn';
import auth from '@react-native-firebase/auth';
import 'react-native-gesture-handler';
import Images from './assets/sss-removebg-preview.png';
import LinearGradient from 'react-native-linear-gradient';

const Login = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // ====================
  // Animated value for the animation
  const animatedValue = new Animated.Value(0);

  // Animation configuration
  const animationConfig = {
    toValue: 1,
    duration: 1000, // Adjust the duration as needed
    easing: Easing.linear,
    useNativeDriver: true,
  };

  useEffect(() => {
    // Start the continuous animation
    const animation = Animated.timing(animatedValue, animationConfig);

    // Set up a loop for the continuous animation
    const loopAnimation = () => {
      Animated.loop(animation).start();
    };

    // Call the loop function
    loopAnimation();

    // Clean up the animation on component unmount
    return () => {
      animatedValue.removeAllListeners();
    };
  }, [animatedValue, animationConfig]);

  // Interpolate the animated value to create a style for the text
  const animatedTextStyle = {
    transform: [
      {
        scale: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 1.1], // Adjust the output range as needed
        }),
      },
    ],
    fontWeight: 'bold',
    marginTop:10,
    fontFamily: 'monospace',
    color: 'black',
  };
  // ==================

  const handleLogin = async () => {
    try {
      // Check if email or password is empty
      if (!email || !password) {
        Alert.alert('Error', 'Email and password are required.');
        return;
      }

      const userCredential = await auth().signInWithEmailAndPassword(
        email,
        password,
      );

      // Access the user information
      const user = userCredential.user;

      props.navigation.navigate('AllUsers');
    } catch (error) {
      alert(error.message);
    }
  };

  return (

    <ScrollView
      contentContainerStyle={{flexGrow: 1}}
      keyboardShouldPersistTaps="handled">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1, alignItems: 'center'}}>
        
        <View
          style={{
            backgroundColor: 'transparent',
            flex: 1,
            width: 460,
            paddingTop: 100,
            alignItems: 'center',
          }}>
           <Image
            source={Images}
            style={{width: 250, height: 180, marginTop: 15}}
          />
          <Text
            style={{
              fontSize: 40,
              color: darkGreen,
              fontWeight: 'bold',
            }}>
            {' '}
            Welcome Back
          </Text>
          <Text
            style={{
              fontSize: 19,
              color: 'grey',
              fontWeight: 'bold',
              marginBottom: 20,
            }}>
            Login to your account{' '}
          </Text>
          <Field
            placeholder="Email"
            keyboardType={'email-address'}
            onChangeText={text => setEmail(text)}
          />
          <Field
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={text => setPassword(text)}
          />
          <View
            style={{
              alignItems: 'flex-end',
              width: '70%',
              paddingRight: 16,
              marginBottom: 50,
            }}>
            <Text
              style={{
                fontSize: 16,
                color: darkGreen,
                fontWeight: 'bold',
              }}>
              Forgot Password ?
            </Text>
          </View>
          <LinearGradient
            colors={['#FFA500', 'red']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={{
              borderRadius: 100,
              overflow: 'hidden',
              height: 70,
              width: 350,
            }}>
            <Btn
              textColor="white"
              bgColor="transparent"
              btnLabel="LOGIN"
              Press={handleLogin}
            />
          </LinearGradient>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: 16, fontWeight: 'bold', marginTop:10}}>
              Don't have an account ?{' '}
            </Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Signup')}>
               <Animated.Text style={animatedTextStyle} > Signup</Animated.Text>
            </TouchableOpacity>
           
          </View>
          
        </View>
      </KeyboardAvoidingView>
    </ScrollView>

  );
};

export default Login;
