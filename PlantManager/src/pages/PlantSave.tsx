import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import {SvgFromUri} from  'react-native-svg'
import {useRoute} from '@react-navigation/core'
import plantasProps from '../interfaces/Plantas'
import colors from '../styles/colors'
import fonts from '../styles/fonts'
import CardRegagem from '../components/CardRegagem';
import Button from '../components/Button'

interface Params {
   plant: plantasProps,
}

export default function PlantSave() {

   const route = useRoute();
   const {plant}  = route.params as Params;
   
   return (
      <View style={styles.container}>
         <View style={styles.containerTop}>
            <SvgFromUri uri={plant.photo} 
               style={styles.planta}
               height={150} 
               width={150}></SvgFromUri>
            <Text style={styles.nomePlanta}>{plant.name}</Text>
            <Text style={styles.sobrePlanta}>{plant.about}</Text>
         </View>
         <View style={styles.containerBotton}>            
            <View style={styles.containerCardRegagem}>
               <CardRegagem dica={plant.water_tips}></CardRegagem>
            </View>
            <Text style={styles.tituloHorario}>Escolha o melhor horário para ser lembrado:</Text>
            <Text style={styles.quadroHorario}>Quadro de seleção de hora</Text>
            <Button texto='Cadastrar Planta' onPress={()=>{}}></Button>                 
         </View>
      </View>
   )
}

const styles = StyleSheet.create({
   container:{
      flex:1,
      alignItems:'center',
   },
   containerTop:{
      
      alignItems:'center',
      backgroundColor:colors.shape,      
      paddingHorizontal:32,         
      width:'100%',         
   },
   containerBotton:{
      
      alignItems:'center',
      backgroundColor:colors.white,      
      paddingHorizontal:32,      
      width:'100%',            
   },
   planta:{
      height:50,
      marginTop:50,
   },
   nomePlanta:{
      color:colors.heading,
      fontFamily:fonts.heading,
      fontSize:24,
      marginTop:32,
   },
   sobrePlanta:{
      color:colors.heading,
      fontFamily:fonts.text,
      fontSize:17,
      marginTop:16,
      marginBottom:76,
   },
   containerCardRegagem:{           
      bottom:44,
   },
   tituloHorario:{
      color:colors.heading,
      fontFamily:fonts.text,
      fontSize:13,
      marginTop:36,
   },
   quadroHorario:{
      marginTop:16,
      marginBottom:50,
   },   

})
