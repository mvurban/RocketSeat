import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import fonts from '../styles/fonts';
import foto from '../assets/foto.jpg';
import colors from '../styles/colors';

interface propsPerfil {
   texto1: string,
   texto2: string,
   avatar: string,
}

export default function Perfil({texto1, texto2, avatar}: propsPerfil) {
   return (
      <View style={styles.container}>
         <View>
            <Text style={styles.texto1}>{texto1}</Text> 
            <Text style={styles.texto2}>{texto2}</Text>
         </View>
         <View>
            <Image source={foto} style={styles.avatar}></Image>
         </View>
      </View>
   )
}

const styles = StyleSheet.create({
   container:{            
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between',     
   },   
   texto1:{
      color:colors.heading,
      fontFamily:fonts.text,
      fontSize:32,            
   },
   texto2:{
      color:colors.heading,
      fontFamily:fonts.heading,
      fontSize:32, 
      lineHeight:36
   },
   avatar:{
      width:56,
      height:56,
      borderRadius:28,
   }
})
