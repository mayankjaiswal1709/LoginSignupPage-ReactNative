import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import Btn from './Btn';
import Images from './assets/arrow.png';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import LinearGradient from 'react-native-linear-gradient';

const AllUsers = ({navigation}) => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    Name: '',
    Email: '',
    DOB: '',
  });

  useEffect(() => {
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
    navigation.navigate('EditUserDetail', {userId});
  };

  const handleDeleteUser = async userId => {
    try {
      await firestore().collection('users').doc(userId).delete();
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error.message);
    }
  };

  const handleCreateUser = async () => {
    try {
      const newUserRef = await firestore().collection('users').add(newUser);
      const newUserDoc = await newUserRef.get();
      const newUserData = {id: newUserRef.id, ...newUserDoc.data()};
      setUsers(prevUsers => [...prevUsers, newUserData]);
      setNewUser({Name: '', Email: ''});
    } catch (error) {
      console.error('Error creating user:', error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await auth().signOut();

      Alert.alert(
        'Logout',
        'You have successfully logged out.',
        [
          {
            text: 'OK',
            onPress: () => {
              navigation.navigate('Login');
            },
          },
        ],
        {cancelable: false},
      );
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Image
            source={Images}
            style={{width: 30, height: 30, marginTop: 10}}
          />
        </TouchableOpacity>

        <Text style={styles.heading}>All Users</Text>

        <LinearGradient
          colors={['#FFA500', 'red']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={{
            borderBottomLeftRadius: 100,
            overflow: 'hidden',
            height: 50,
            width: 100,
          }}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.buttonText}>LOGOUT</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.formHeading}>Create New User</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={newUser.Name}
          onChangeText={text =>
            setNewUser(prevUser => ({...prevUser, Name: text}))
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={newUser.Email}
          keyboardType="email-address"
          onChangeText={text =>
            setNewUser(prevUser => ({...prevUser, Email: text}))
          }
        />
        <TextInput
          style={styles.input}
          placeholder="DOB"
          value={newUser.DOB}
          keyboardType="email-address"
          onChangeText={text =>
            setNewUser(prevUser => ({...prevUser, DOB: text}))
          }
        />
        <TouchableOpacity
          style={styles.createButton}
          onPress={handleCreateUser}>
          <Text style={styles.buttonText}>Create User</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={users}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.userContainer}>
            <Text style={styles.userName}>Name: {item.Name}</Text>
            <Text style={styles.userName}>Email: {item.Email}</Text>
            <Text style={styles.userName}>DOB: {item.DOB}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => handleEditUser(item.id)}>
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeleteUser(item.id)}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#daa520',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'monospace',
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
    padding: 10,
    borderRadius: 5,
  },
  formContainer: {
    backgroundColor: '#34495e',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  formHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'monospace',
    color: '#fff',
  },
  input: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    color: '#000',
    fontSize: 15,
  },
  createButton: {
    backgroundColor: '#2ecc71',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userContainer: {
    backgroundColor: '#34495e',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  userName: {
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
    fontSize: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  editButton: {
    backgroundColor: '#3498db',
    padding: 10,
    // borderRadius: 5,
    borderTopLeftRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    width: 160,
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    // padding: 10,
    width: 160,
    justifyContent: 'center',
    alignItems: 'center',
    // borderRadius: 5,
    borderBottomEndRadius: 25,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    alignContent: 'center',
    fontSize: 15,
    justifyContent: 'center',
  },
});

export default AllUsers;
