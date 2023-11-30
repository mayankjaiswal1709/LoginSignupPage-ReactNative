import React, {useState ,useEffect} from 'react';
import {View, Text, TouchableOpacity,Easing, Animated,ScrollView, Image} from 'react-native';
import Background from './Background';
import {darkGreen} from './Constants';
import Field from './Field';
import Btn from './Btn';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import LinearGradient from 'react-native-linear-gradient';

// Import your image file
import Images from './assets/group-discussion-8470108-6666398.png';

const Signup = props => {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [dob, setDob] = useState('');
  const [password, setPassword] = useState('');


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

  const handleSignUp = async () => {
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      const user = userCredential.user;

      // Store additional user details in Firestore
      await firestore().collection('users').doc(user.uid).set({
        firstName,
        email,
        contactNumber,
        dob,
      });

      props.navigation.navigate('Login');
    } catch (error) {
      console.error('Signup Error:', error);
      setMessage(error.message);
    }
  };

  return (
    // <Background>
    <ScrollView>
      <View style={{display: 'flex', alignItems: 'center'}}>
        <Text
          style={{
            color: '#191970',
            marginTop: 45,
            fontSize: 34,
            fontWeight: 'bold',
            fontFamily: 'monospace',
          }}>
          Register
        </Text>
        <Text
          style={{
            color: '#191970',
            fontSize: 34,
            fontWeight: 'bold',
            paddingLeft: 120,
            fontFamily: 'monospace',
          }}>
          Here
        </Text>

        <View
          style={{
            backgroundColor: 'transparent',
            height: 700,
            width: 460,
            // borderTopLeftRadius: 130,
            // borderBottomRightRadius: 230,
            paddingTop: 30,
            alignItems: 'center',
          }}>
          <Field placeholder="Name" onChangeText={setFirstName} />
          <Field
            placeholder="Email"
            keyboardType="email-address"
            onChangeText={setEmail}
          />
          <Field
            placeholder="DOB"
            keyboardType="numeric"
            onChangeText={setDob}
          />
          <Field
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={setPassword}
          />

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '75%',
              paddingRight: 16,
              marginBottom: 10,
            }}></View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '78%',
              paddingRight: 16,
            }}></View>
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
              btnLabel="SIGNUP"
              Press={handleSignUp}
            />
          </LinearGradient>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: '#a9a9a9',
                marginTop: 10,
              }}>
              Already have an account ?{' '}
            </Text>
        
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Login')}>
               <Animated.Text style={animatedTextStyle} > Login</Animated.Text>
            </TouchableOpacity>
          </View>

          {/* Image component below the signup button */}
          <Image
            source={Images}
            style={{width: 250, height: 180, marginTop: 5}}
          />
        </View>
      </View>
    </ScrollView>
    // </Background>
  );
};

export default Signup;
