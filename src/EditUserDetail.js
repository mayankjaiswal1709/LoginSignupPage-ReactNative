// EditUserDetail.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Background from './Background';

const EditUserDetail = ({ route, navigation }) => {
  const { userId } = route.params;
  const [user, setUser] = useState({});
  const [editedFirstName, setEditedFirstName] = useState('');
  const [editedLastName, setEditedLastName] = useState('');

  useEffect(() => {
    const fetchUserDetails = async () => {
      // Fetch the user details using the userId
      const userSnapshot = await firestore().collection('users').doc(userId).get();
      setUser({ id: userSnapshot.id, ...userSnapshot.data() });
    };

    fetchUserDetails();
  }, [userId]);

  const handleUpdateUser = async () => {
    try {
      // Update the user details in Firestore
      await firestore().collection('users').doc(userId).update({
        firstName: editedFirstName !== '' ? editedFirstName : user.firstName,
        lastName: editedLastName !== '' ? editedLastName : user.lastName,
      });
  
      // Navigate back to the AllUsers screen
      navigation.goBack();
    } catch (error) {
      console.error('Error updating user:', error.message);
    }
  };
  

  return (
    <Background>
      <View style={styles.container}>
        <Text style={styles.heading}>Edit User Details</Text>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          defaultValue={user.firstName}
          onChangeText={setEditedFirstName}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          defaultValue={user.lastName}
          onChangeText={setEditedLastName}
        />
        <TouchableOpacity style={styles.updateButton} onPress={handleUpdateUser}>
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
    justifyContent: 'center',
    marginLeft: 100,
    marginTop: 250
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff'
  },
  input: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  updateButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default EditUserDetail;
