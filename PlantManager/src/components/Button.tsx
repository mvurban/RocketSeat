import React from 'react';
import { TouchableOpacity, StyleSheet, Text, TouchableOpacityProps,  } from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface buttonProps extends TouchableOpacityProps  {
   texto : string
}

export default function Button({texto, ...rest} : buttonProps){
   return (
      <TouchableOpacity style={styles.container} {...rest}>
         <Text style={styles.textButton}>
            {texto}
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
      width:'100%',
   },
   textButton:{
      color:colors.white,      
      fontFamily:fonts.text,
      fontSize:17,            
   }  
});