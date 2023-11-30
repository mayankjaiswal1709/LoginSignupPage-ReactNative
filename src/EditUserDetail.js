// EditUserDetail.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image,TouchableOpacity, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Background from './Background';
import LinearGradient from 'react-native-linear-gradient';
import Btn from './Btn';
import Images from './assets/arrow.png';


const EditUserDetail = ({ route, navigation }) => {
  const { userId } = route.params;
  const [user, setUser] = useState({});
  const [Name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [DOB, setDOB] = useState('');
  

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
        Name: Name !== '' ? Name : user.Name,
        Email: Email !== '' ? Email : user.Email,
        DOB: DOB !== '' ? DOB : user.DOB,
      });
  
      // Navigate back to the AllUsers screen
      navigation.goBack();
    } catch (error) {
      console.error('Error updating user:', error.message);
    }
  };
  

  return (
  
      <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Image
            source={Images}
            style={{width: 30, height: 30, marginBottom: 10}}
          />
        </TouchableOpacity>
        <Text style={styles.heading}>Edit User Details</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          defaultValue={user.Name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          defaultValue={user.Email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="DOB"
          defaultValue={user.DOB}
          onChangeText={setDOB}
        />

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
              btnLabel="UPDATE"
              Press={handleUpdateUser}
            />
          </LinearGradient>

      </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4682b4',
    padding: 20,
    justifyContent: 'center',
    alignContent:'center',

  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
    fontFamily: 'monospace',
    justifyContent:'center',
    alignItems:'center',
    alignContent:'center'

  },
  input: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 25,
    marginBottom: 20,
    width:350
  },
  updateButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 5,
    fontSize:25,
    fontFamily: 'monospace',

  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default EditUserDetail;
