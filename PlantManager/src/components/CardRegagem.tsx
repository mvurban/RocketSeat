import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import colors from '../styles/colors'
import fonts from '../styles/fonts'
import imageGota from '../assets/waterdrop.png'

interface cardRegagemProps {
   dica: string
}

export default function CardRegagem({dica}:cardRegagemProps) {
   return (
      <View style={styles.container}>
         <Image source={imageGota}></Image>
         <Text style={styles.descricao}>{dica}</Text>
      </View>
   )
}


const styles = StyleSheet.create({
   container:{      
      height:88,      
      width:'100%',
      flexDirection:'row',
      borderRadius:20,
      backgroundColor:colors.blue_light,
      alignItems:'center',
      justifyContent:'space-between',      
      paddingHorizontal:16,
   },
   gota:{
      paddingLeft:16,
   },
   descricao:{
      fontFamily:fonts.text,
      color:colors.blue,
      fontSize:15,      
      width:'70%',
   },
})
