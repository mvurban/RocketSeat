import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import LottieView from 'lottie-react-native'
import load from '../assets/load.json'

export default function Loading() {
   return (
      <View style={styles.container}>
         <LottieView 
            source={load}
            autoPlay
            loop
            style={styles.animation}
         />
      </View>
   )
}

const styles = StyleSheet.create({
   container:{
      flex:1,
      alignItems:'center',
      justifyContent:'center',
   },
   animation:{
      backgroundColor:'transparent',
      width:200,
      height:200,
   }
})
