import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import {SvgFromUri} from 'react-native-svg';
import iPlantCard from '../interfaces/PlantCard'

export default function PlantCardSecundary({data, ...rest} : iPlantCard) {
   return (
      <View>
         <RectButton style={styles.container} {...rest}>
            <SvgFromUri width={50} height={50} uri={data.photo}></SvgFromUri>
            <Text style={styles.nome}>{data.name}</Text>
            <View style={styles.containerHorario}>
               <Text style={styles.labelHorario}>Regar às</Text>
               <Text style={styles.timeHorario}>{data.hour}</Text>
            </View>
         </RectButton>
      </View>
   )
}


const styles = StyleSheet.create({
   container:{      
      width:'100%',
      paddingHorizontal:10,
      paddingVertical:15,
      flexDirection:'row',
      borderRadius:20,
      backgroundColor:colors.shape,
      alignItems:'center',      
      marginBottom:5,
   },
   nome:{
      flex:1,
      fontFamily:fonts.heading,
      color:colors.heading,
      fontSize:17,
      marginLeft:10,      
   },
   containerHorario:{      
      alignItems:'flex-end',      
   },
   labelHorario:{
      fontSize:13,
      fontFamily:fonts.text,
      color:colors.body_light
   },
   timeHorario:{
      fontSize:16,
      fontFamily:fonts.heading,
      color:colors.body_dark

   },
})
