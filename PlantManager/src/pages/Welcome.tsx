import React from 'react';
import {Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import wateringImg from '../assets/watering.png';
import colors from '../styles/colors';


export function Welcome(){
  return(
    <View style={styles.container}>
      <Text style={styles.title}>
        Gerencie {'\n'} 
        suas plantas  {'\n'}
        de forma fácil
      </Text>
      <Image style={styles.image} source={wateringImg}></Image>
      <Text style={styles.subtitle}>
        Não esqueça mais de regar suas plantas. 
        Nós cuidamos de lembrar você sempre que precisar.
      </Text>
      <TouchableOpacity style={styles.button} activeOpacity={0.5} >
        <Text style={styles.buttontext}>
          >
        </Text>
      </TouchableOpacity>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems:'center' ,
    justifyContent:'space-around',
  },
  title:{
    fontSize:32,
    fontWeight:'bold',
    textAlign: 'center',
    color:colors.heading,
    marginTop:38,
  },  
  image:{
    width:292,
    height:284,
  },
  subtitle:{
    textAlign:'center',
    fontSize:18,
    paddingHorizontal:20,
    color:colors.heading, 
  },
  button:{
    backgroundColor:colors.green,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:16,    
    height:56,
    width:56,
  },
  buttontext:{
    color:colors.white,
    fontSize:25,
  }
})

