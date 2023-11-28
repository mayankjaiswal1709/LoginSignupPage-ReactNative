import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/Home.js';
import Signup from './src/Signup.js';
import Login from './src/Login.js';
import EditProfile from './src/EditProfile.js';
import AllUsers from './src/AllUsers';
import EditUserDetail from './src/EditUserDetail';
import ForgotPassword from './src/ForgetPassword.js';


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown :false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="AllUsers" component={AllUsers} />
        <Stack.Screen name="EditUserDetail" component={EditUserDetail} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;