import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, TouchableOpacityProps } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import colors from '../styles/colors'
import fonts from '../styles/fonts'


// interface buttonParans extends TouchableOpacityProps{
interface buttonParans extends RectButtonProps{   
   titulo: string,
   destaque?: boolean,   
}

export default function ButtonAmbiente({titulo, destaque=false, ...rest} : buttonParans) {
   return (
      <View>
         <RectButton style={[styles.botaoAmbienteComum,  destaque ? styles.botaoAmbienteDestaque : styles.botaoAmbiente]} {...rest}>
            <Text style={destaque ? styles.botaoAmbienteTextDestaque : styles.botaoAmbienteText}>{titulo}</Text>
         </RectButton>
{/*          
         <TouchableOpacity style={destaque ? styles.botaoAmbienteDestaque : styles.botaoAmbiente} {...rest}>
            <Text style={destaque ? styles.botaoAmbienteTextDestaque : styles.botaoAmbienteText}>{titulo}</Text>
         </TouchableOpacity>
 */}
      </View>
   )
}

const styles = StyleSheet.create({
   botaoAmbienteComum:{
      marginRight:4,    
      borderRadius:12,
      paddingHorizontal: 17,
      paddingVertical:9,
   },
   botaoAmbiente:{
      backgroundColor:colors.shape,
   },
   botaoAmbienteDestaque:{
      backgroundColor:colors.green_light,
   },
   botaoAmbienteText:{
      color:colors.heading,
      fontFamily:fonts.text,
   },
   botaoAmbienteTextDestaque:{
      color:colors.green_dark,
      fontFamily:fonts.heading,
   },
})
