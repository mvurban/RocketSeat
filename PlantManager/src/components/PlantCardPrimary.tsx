import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import {SvgFromUri} from 'react-native-svg';

interface PlantCardProps extends RectButtonProps {
   data: {
      name:string,
      photo:string
   }
}

export default function PlantCardPrimary({data, ...rest} : PlantCardProps) {
   return (
      <View>
         <RectButton style={styles.container} {...rest}>
            <SvgFromUri width={80} height={80} uri={data.photo}></SvgFromUri>
            <Text style={styles.nome}>{data.name}</Text>
         </RectButton>
      </View>
   )
}


const styles = StyleSheet.create({
   container:{
      flex:1,
      width:148,
      height:154,
      borderRadius:20,
      backgroundColor:colors.shape,
      alignItems:'center',
      justifyContent:'center',
      marginHorizontal:8,
      marginBottom:16,
   },
   nome:{
      fontFamily:fonts.heading,
      color:colors.heading,
      fontSize:13,
   },
   containerImage:{
      height:'20%',
      width:'20%'
   }
})
