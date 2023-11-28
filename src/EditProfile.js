import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image, StyleSheet } from 'react-native';
import Background from './Background';
import { darkGreen } from './Constants';
import Btn from './Btn';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';

const EditProfile = (props) => {
  const [myData, setMyData] = useState(null);
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    getDatabase();
  }, []);

  const getDatabase = async () => {
    try {
      const userId = props.route.params?.userId;
      if (!userId) {
        console.error('User ID not found');
        return;
      }

      const userDoc = await firestore().collection('users').doc(userId).get();

      if (userDoc.exists) {
        setMyData(userDoc.data());
        console.log('User data fetched successfully:', userDoc.data());
      } else {
        console.error('User data not found');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateProfile = async () => {
    try {
      // Update the user profile in Firestore
      await firestore().collection('users').doc(props.route.params.userId).update({
        name,
        lastname,
        email,
      });

      // If a new profile picture is selected, upload it to Firebase Storage
      if (profilePicture) {
        const storageRef = storage().ref(`profilePictures/${props.route.params.userId}`);
        await storageRef.putFile(profilePicture);
        console.log('Profile picture uploaded successfully');
      }

      console.log('Profile updated successfully');
      alert('Profile updated successfully');
    } catch (error) {
      console.error(error);
      alert('Error updating profile');
    }
  };

  const handleChooseProfilePicture = async () => {
    try {
      // Implement logic to choose a profile picture using ImagePicker or any other library
      // Set the selected profile picture to the state variable `profilePicture`
      const selectedProfilePicture = '...'; // Replace with actual logic to choose profile picture
      console.log('Profile picture selected:', selectedProfilePicture);
      setProfilePicture(selectedProfilePicture);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async () => {
    try {
      // Implement logout functionality using your authentication library (e.g., Firebase Auth)
      await auth().signOut();
      // Navigate to the login screen or another screen of your choice
      // You might need to use navigation.navigate or any other navigation method
      props.navigation.replace('Login');
      console.log('User logged out successfully');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Background>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
      <View style={{ alignItems: 'center' }}>
        <TouchableOpacity onPress={handleChooseProfilePicture}>
          <Image
            source={{ uri: myData?.profilePicture }}
            style={{ width: 100, height: 100, borderRadius: 50, marginTop: 20 }}
          />
        </TouchableOpacity>
        <Text style={{ color: 'white', fontSize: 20, marginTop: 10 }}>
          {myData ? myData.name : 'Loading...'}
        </Text>
        <TextInput
          placeholder="Name"
          style={{ backgroundColor: 'white', margin: 10, padding: 10, borderRadius: 5 }}
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          placeholder="Lastname"
          style={{ backgroundColor: 'white', margin: 10, padding: 10, borderRadius: 5 }}
          value={lastname}
          onChangeText={(text) => setLastname(text)}
        />
        <TextInput
          placeholder="Email"
          style={{ backgroundColor: 'white', margin: 10, padding: 10, borderRadius: 5 }}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Btn textColor="white" bgColor={darkGreen} btnLabel="Update Profile" Press={updateProfile} />
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 10,
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
  },
});

export default EditProfile;
