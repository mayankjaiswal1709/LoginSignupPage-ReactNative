import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert, // Added import for Alert
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const AllUsers = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
  });

  useEffect(() => {
    // Fetch the list of users from Firestore
    const fetchUsers = async () => {
      const usersSnapshot = await firestore().collection('users').get();
      const usersData = usersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(usersData);
    };

    fetchUsers();
  }, []);

  const handleEditUser = userId => {
    navigation.navigate('EditUserDetail', { userId });
  };

  const handleDeleteUser = async userId => {
    try {
      // Delete the user from Firestore
      await firestore().collection('users').doc(userId).delete();
      // Update the local users state
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error.message);
    }
  };

  const handleCreateUser = async () => {
    try {
      // Add the new user to Firestore
      const newUserRef = await firestore().collection('users').add(newUser);
      const newUserDoc = await newUserRef.get();
      const newUserData = { id: newUserRef.id, ...newUserDoc.data() };
      setUsers(prevUsers => [...prevUsers, newUserData]);
      setNewUser({ firstName: '', lastName: '' }); // Clear the form
    } catch (error) {
      console.error('Error creating user:', error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await auth().signOut();

      // Show logout alert message
      Alert.alert(
        'Logout',
        'You have successfully logged out.',
        [
          {
            text: 'OK',
            onPress: () => {
              // Navigate to the login screen or any other screen you want after logout
              navigation.navigate('Login');
            },
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error('Error logging out:', error.message);
      // You may want to import showMessage and handle it here
      // showMessage({
      //   message: 'Error logging out',
      //   type: 'danger',
      // });
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>

        <Text style={styles.formHeading}>Create New User</Text>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={newUser.firstName}
          onChangeText={text =>
            setNewUser(prevUser => ({...prevUser, firstName: text}))
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={newUser.lastName}
          onChangeText={text =>
            setNewUser(prevUser => ({...prevUser, lastName: text}))
          }
        />
        <TouchableOpacity
          style={styles.createButton}
          onPress={handleCreateUser}>
          <Text style={styles.buttonText}>Create User</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.heading}>All Users</Text>
      <FlatList
        data={users}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.userContainer}>
            <Text style={styles.userName}>
              {item.firstName} {item.lastName}
            </Text>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => handleEditUser(item.id)}>
              <Text style={styles.buttonText} st>
                Edit
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeleteUser(item.id)}>
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: '#000',
    padding: 20,
    borderRadius: 10,
    marginVertical: 20,
  },
  userContainer: {
    backgroundColor: '#000',
    padding: 20,
    borderRadius: 10,
    marginVertical: 20,
  },
  formHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  userName: {
    fontWeight: 'bold',
    marginBottom: 1,
    color: '#fff',
  },
  input: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  createButton: {
    backgroundColor: '#2ecc71',
    padding: 10,
    borderRadius: 5,
  },
  logoutButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#e74c3c',
    padding: 10,
    borderRadius: 5,
  },
  userContainer: {
    backgroundColor: '#000',
    padding: 20,
    borderRadius: 10,
    marginVertical: 20,
    flexDirection: 'row', // Make sure the buttons are in a row
    alignItems: 'center', // Align items vertically in the center
    justifyContent: 'space-between', // Space out the elements horizontally
  },

  editButton: {
    backgroundColor: '#3498db', // Set a distinct color for the Edit button
    padding: 10,
    borderRadius: 5,
  },

  deleteButton: {
    backgroundColor: '#e74c3c', // Set a distinct color for the Delete button
    padding: 10,
    borderRadius: 5,
  },
});

export default AllUsers;
