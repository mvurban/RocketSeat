import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/core';
import Button  from '../components/Button';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import iConfirmation from '../interfaces/Confirmacao'

export default function Confirmation() {

   const navigation = useNavigation();
   const routes = useRoute();
   const {
      title,
      subtitle,
      buttonTitle,
      icon, 
      nextPage
   } = routes.params as iConfirmation;

   const emojis = {
      'smile':'😄', 
      'hug':'🤗'
   }

   function handlerContinuar(){
      navigation.navigate(nextPage);
   }

   return (
      <SafeAreaView style={styles.container}>
         <View style={styles.wrapper}>
            <Text style={styles.emoji}>
               {emojis[icon]}
            </Text>
            <Text style={styles.heading}>
               {title}               
            </Text>
            <Text style={styles.subTitle}>
               {subtitle}
            </Text>
            <View style={styles.buttonContainer}>                  
               <Button texto={buttonTitle} onPress={handlerContinuar}></Button>
            </View>
         </View>
      </SafeAreaView>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   wrapper: {
      flex: 1,
      borderWidth: 0,
      marginVertical: '15%',
      marginHorizontal: '12%',
      alignItems: 'center',
      justifyContent: 'center',
   },
   emoji: {
      fontSize: 96,
   },
   heading: {
      fontFamily: fonts.heading,
      color: colors.heading,
      fontSize: 24,
      lineHeight: 32,
      marginVertical: 20,
      marginTop: 60,
      textAlign: 'center',
   },
   subTitle: {
      fontFamily: fonts.text,
      color: colors.heading,
      fontSize: 17,
      lineHeight: 25,
      textAlign: 'center',
   },
   buttonContainer: {
      width: '100%',
      marginVertical: 20,
   }
})