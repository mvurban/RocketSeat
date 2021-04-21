import React from 'react';
import { TouchableOpacity, StyleSheet, Text, ButtonProps } from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface buttonProps  {
   texto : string,
}

export function Button(props : buttonProps){
   return (
      <TouchableOpacity style={styles.container}>
         <Text style={styles.textButton}>
            {props.texto}
         </Text>
      </TouchableOpacity>
   )
}

const styles = StyleSheet.create({
   container:{      
      backgroundColor:colors.green,
      height:56,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:16,      
   },
   textButton:{
      color:colors.white,      
      fontFamily:fonts.text,
      fontSize:17,            
   }  
});