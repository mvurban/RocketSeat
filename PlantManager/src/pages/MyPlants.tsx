import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Perfil from '../components/Perfil'
import CardRegagem from '../components/CardRegagem'
import { FlatList } from 'react-native-gesture-handler'
import colors from '../styles/colors'
import fonts from '../styles/fonts'

export default function MyPlants() {
   return (
      <View style={styles.container}>
         <View style={styles.containerPerfil}>
            <Perfil texto1='Minhas' texto2='Plantinhas'></Perfil>
         </View>
         <CardRegagem dica='teste'></CardRegagem>
         <Text style={styles.tituloPlantas}>Próximas regadas</Text>         
         

      </View>
   )
}

const styles = StyleSheet.create({
   container:{
      flex:1,
      paddingHorizontal:32,
      paddingVertical:50,
   },
   containerPerfil:{
      marginBottom:40,
   },
   tituloPlantas:{
      color:colors.heading,
      fontFamily:fonts.heading,
      fontSize:24,      
      marginTop:40,
      marginBottom:16,
   },
})
