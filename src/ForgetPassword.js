// ForgotPassword.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const handleResetPassword = async () => {
    try {
      if (!email) {
        Alert.alert('Error', 'Please enter your email.');
        return;
      }

      await auth().sendPasswordResetEmail(email);

      Alert.alert('Success', 'Password reset email sent. Check your inbox.');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View>
      <Text>Enter your email to reset password:</Text>
      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        onChangeText={(text) => setEmail(text)}
      />
      <TouchableOpacity onPress={handleResetPassword}>
        <Text>Reset Password</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgotPassword;
