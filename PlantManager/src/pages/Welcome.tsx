import React from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import wateringImg from '../assets/watering.png';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { Feather } from '@expo/vector-icons';

export function Welcome() {
   return (
      <View style={styles.container}>
         <Text style={styles.title}>
            Gerencie {'\n'}
            suas plantas de {'\n'}
            forma fácil
         </Text>
         <Image style={styles.image} source={wateringImg} resizeMode="contain"></Image>
         <Text style={styles.subtitle}>
            Não esqueça mais de regar suas plantas.
            Nós cuidamos de lembrar você sempre que precisar.
         </Text>
         <TouchableOpacity style={styles.button} activeOpacity={0.5} >
            <Feather name="chevron-right" style={styles.buttonIcon}></Feather>
         </TouchableOpacity>
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-around',
   },
   title: {
      fontSize: 32,
      fontFamily: fonts.heading,                  
      textAlign: 'center',
      color: colors.heading,
      marginTop: 45,
      lineHeight:38,
   },
   image: {      
      height: Dimensions.get("window").width * 0.6,
   },
   subtitle: {
      textAlign: 'center',
      fontSize: 17,
      fontFamily:fonts.text,
      paddingHorizontal: 45,
      color: colors.heading,
   },
   button: {
      backgroundColor: colors.green,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 16,
      height: 56,
      width: 56,
      marginBottom:30,
   },
   buttonIcon: {
      color: colors.white,
      fontSize: 32,
   }
})