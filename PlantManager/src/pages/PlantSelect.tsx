
import React from 'react'
import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import colors from '../styles/colors'
import {Perfil} from '../components/Perfil'

export function PlantSelect() {
   return (
      <SafeAreaView style={styles.container}>
         <View>
            <Perfil texto1='Olá,' texto2='João' avatar = ''></Perfil>
         </View>
      </SafeAreaView>
   )
}

const styles = StyleSheet.create({
   container:{
      flex:1,
      paddingVertical:80,
      paddingHorizontal:32,
      backgroundColor:colors.background,
   }
})
