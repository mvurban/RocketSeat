import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import fonts from '../styles/fonts'

interface propsPerfil {
   texto1: string,
   texto2: string,
   avatar: string,
}

export function Perfil({texto1, texto2, avatar}: propsPerfil) {
   return (
      <View style={styles.container}>
         <View style={styles.containerText}>
            <Text style={styles.texto1}>{texto1} {'\n'}</Text> 
            <Text style={styles.texto2}>{texto2}</Text>
         </View>
         <View>
            <Text>teste</Text>
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
   containerText:{
      
   },
   texto1:{
      fontFamily:fonts.text,
      fontSize:32,            
      height:36,      
   },
   texto2:{
      fontFamily:fonts.heading,
      fontSize:32,      
   }
})
