import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, TextInput } from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { Button } from '../components/Button';

export function Confirmation() {
   return (
      <SafeAreaView style={styles.container}>
         <View style={styles.wrapper}>
            <Text style={styles.emoji}>
               😀
            </Text>
            <Text style={styles.heading}>
               Prontinho
            </Text>
            <Text style={styles.subTitle}>
               Agora vamos começar a cuidar das suas 
               plantinhas com muito cuidado.
            </Text>
            <View style={styles.buttonContainer}>
                  <Button texto='Continuar'></Button>
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