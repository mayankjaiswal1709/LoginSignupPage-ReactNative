
import React, { Component } from "react";
import {View,Text,Animated, StyleSheet} from 'react-native';
import Background from './Background';
import Btn from './Btn';
import { darkGreen, green } from './Constants';

const Home = (props) => {

    state = {
        fadeValue: new Animated.Value(0)
      };
    
      _start = () => {
        Animated.timing(this.state.fadeValue, {
          toValue: 1,
          duration: 1000
        }).start();
      };

    return (
        <View style={styles.background}>
            <View style={{marginHorizontal:40 ,marginVertical:100}}>
            <Text style={{color:"black",fontSize:30}}>Work you only </Text>
            <Text style={{color:"black",fontSize:50,marginBottom:40}}>Dreamed of </Text>
            <Btn bgColor={green}  textColor='white' btnLabel="Login" Press={()=> props.navigation.navigate("Login")} />
            <Btn bgColor='white' textColor={darkGreen} btnLabel="Signup" Press={()=>props.navigation.navigate("Signup")} />
            </View>
            
        </View>
    );
}

const styles = StyleSheet.create({
    background:{
        backgroundColor:'#f4f4f4',
        
    }
})

export default Home;
