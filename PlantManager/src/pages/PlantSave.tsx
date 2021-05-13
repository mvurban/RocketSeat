import React, { useState } from 'react'
import { View, Text, StyleSheet, Platform, Alert } from 'react-native'
import { SvgFromUri } from 'react-native-svg'
import { useNavigation, useRoute } from '@react-navigation/core'
import { format, isBefore } from 'date-fns'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import plantasProps from '../interfaces/Plantas'
import colors from '../styles/colors'
import fonts from '../styles/fonts'
import CardRegagem from '../components/CardRegagem';
import Button from '../components/Button'
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import { addPlanta, getPlantas } from '../storage/Plantas';

interface Params {
   plant: plantasProps,
}

export default function PlantSave() {

   const route = useRoute();
   const { plant } = route.params as Params;
   const [selectedDateTime, setSelecedDateTime] = useState(new Date());
   const [showDatePicker, setShowDatePicker] = useState(Platform.OS == 'ios');
   const navigation = useNavigation();


   function handlerChangeTime(event: Event, dateTime: Date | undefined) {
      setShowDatePicker(oldState => !oldState)

      if (dateTime)
         setSelecedDateTime(dateTime);

      /*
      if(dateTime && isBefore(dateTime, new Date()) )
      {
         setSelecedDateTime(new Date());
         Alert.alert('Escolha um horário no futuro! ⏱️ ')
      }
      else if(dateTime)
         setSelecedDateTime(dateTime);      
      */

   }
   function handlerOpenDatePickerAndroid() {
      setShowDatePicker(coco => !coco)
   }
   async function handlerCadastrarPlanta() {
      const data = await getPlantas();

      try {

         await addPlanta({ ...plant, dateTimeNotification: selectedDateTime });

         navigation.navigate('Confirmation', {
            title: 'Tudo Certo',
            subtitle: 'Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha com bastante amor.',
            buttonTitle: 'Muito obrigado :D',
            icon: 'hug',
            nextPage: 'tabRoutes',
         })

      }
      catch {
         Alert.alert('Não foi possível gravar a planta, tente novamente mais tarde 😢')
      }
   }

   return (
      <View>
         <ScrollView showsVerticalScrollIndicator={true} >
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
                  <View style={styles.quadroHorario}>
                     {
                        showDatePicker &&
                        (
                           <DateTimePicker
                              value={selectedDateTime}
                              mode='time'
                              display='spinner'
                              onChange={handlerChangeTime}
                           />
                        )
                     }
                     {
                        Platform.OS == 'android' && (
                           <TouchableOpacity style={styles.botaoEscolherHorario} onPress={() => { handlerOpenDatePickerAndroid() }}>
                              <Text style={styles.textBotaoEscolherHorario}>{`Mudar horário ${format(selectedDateTime, 'HH:mm')}`}</Text>
                           </TouchableOpacity>
                        )
                     }
                  </View>
                  <Button texto='Cadastrar Planta' onPress={() => { handlerCadastrarPlanta() }}></Button>
               </View>
            </View>
         </ScrollView>
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
   },
   containerTop: {
      alignItems: 'center',
      backgroundColor: colors.shape,
      paddingHorizontal: 32,
      width: '100%',
   },
   containerBotton: {
      alignItems: 'center',
      backgroundColor: colors.white,
      paddingHorizontal: 32,
      width: '100%',      
   },
   planta: {
      height: 50,
      marginTop: 50,
   },
   nomePlanta: {
      color: colors.heading,
      fontFamily: fonts.heading,
      fontSize: 24,
      marginTop: 32,
   },
   sobrePlanta: {
      color: colors.heading,
      fontFamily: fonts.text,
      fontSize: 17,
      marginTop: 16,
      marginBottom: 76,
   },
   containerCardRegagem: {
      bottom: 44,
   },
   tituloHorario: {
      color: colors.heading,
      fontFamily: fonts.text,
      fontSize: 13,
      marginTop: 36,
   },
   quadroHorario: {
      marginTop: 16,
      marginBottom: 50,
   },
   botaoEscolherHorario: {
      padding: 10,
      backgroundColor: colors.white,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
   },
   textBotaoEscolherHorario: {
      fontFamily: fonts.text,
      color: colors.body_dark,
      fontSize: 20
   },
})
