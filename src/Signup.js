import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Background from './Background';
import { darkGreen } from './Constants';
import Field from './Field';
import Btn from './Btn';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const Signup = (props) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [dob, setDob] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  const handleSignUp = async () => {
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;

      // Store additional user details in Firestore
      await firestore().collection('users').doc(user.uid).set({
        firstName,
        lastName,
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
    <Background>
      <ScrollView>
        <View style={{ alignItems: 'center', width: 460 }}>
          <Text style={{ color: 'white', fontSize: 64, fontWeight: 'bold', marginTop: 10 }}>
            Register
          </Text>
          <Text style={{ color: 'white', fontSize: 19, fontWeight: 'bold', marginBottom: 20 }}>
            Create a new account{' '}
          </Text>
          <View
            style={{
              backgroundColor: 'white',
              height: 700,
              width: 460,
              borderTopLeftRadius: 130,
              borderBottomRightRadius: 230,
              paddingTop: 50,
              alignItems: 'center',
            }}>
            <Field placeholder="First Name" onChangeText={setFirstName} />
            <Field placeholder="Last Name" onChangeText={setLastName} />
            <Field
              placeholder="Email / Username"
              keyboardType="email-address"
              onChangeText={setEmail}
            />
            <Field
              placeholder="Contact Number"
              keyboardType="numeric"
              onChangeText={setContactNumber}
            />
            <Field placeholder="Date Of Birth" keyboardType="numeric" onChangeText={setDob} />
            <Field placeholder="Password" secureTextEntry={true} onChangeText={setPassword} />
            <Field
              placeholder="Confirm Password"
              secureTextEntry={true}
              onChangeText={setConfirmPassword}
            />
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                width: '78%',
                paddingRight: 16,
                marginBottom: 10,
              }}>
              <Text style={{ fontSize: 16, color: 'grey' }}>
                By Signing in you agree to our{' '}
              </Text>
              <Text style={{ color: darkGreen, fontWeight: 'bold', fontSize: 16 }}>
                Terms & Conditions
              </Text>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                width: '78%',
                paddingRight: 16,
              }}>
              <Text style={{ fontSize: 16, color: 'grey' }}>and </Text>
              <Text style={{ color: darkGreen, fontWeight: 'bold', fontSize: 16 }}>
                Privacy Policy
              </Text>
            </View>
            <Btn textColor="white" bgColor={darkGreen} btnLabel="Signup" Press={handleSignUp} />
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Already have an account ? </Text>
              <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
                <Text style={{ color: darkGreen, fontWeight: 'bold', fontSize: 16 }}>Login</Text>
              </TouchableOpacity>
            </View>
          
          </View>
        </View>
      </ScrollView>
    </Background>
  );
};

export default Signup;
