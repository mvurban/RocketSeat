import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, TextInput } from 'react-native';
import colors from '../styles/colors';
import  fonts from '../styles/fonts';

export function UserIdentification(){
   return(
      <SafeAreaView style={styles.container}>
         <View style={styles.wrapper}>
            <Text style={styles.emoji}>😀</Text>
            <Text style={styles.heading}>
               Como podemos {'\n'}
               chamar você?
            </Text>
            <TextInput style={styles.textInput}></TextInput>
         </View>         
      </SafeAreaView>
   )
}

const styles = StyleSheet.create({
   container:{
      flex:1,      
   },
   wrapper:{
      flex:1,
      borderWidth:0,
      marginVertical:'15%',
      marginHorizontal:'10%',
      alignItems:'center',      
   },
   emoji:{
      fontSize:30,
   },
   heading:{
      fontFamily: fonts.heading,
      color:colors.heading,
      fontSize:24,
   },
   textInput:{
      borderBottomWidth: 1,
      borderBottomColor:colors.gray,
      width: '100%',
      paddingHorizontal:30,
      marginHorizontal:30,
      fontSize:18,
      color:colors.body_dark,
      fontFamily:fonts.text,
      textAlignddfd:'center',
   }
})