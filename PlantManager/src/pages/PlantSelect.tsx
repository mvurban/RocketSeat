
import React, {useEffect, useState} from 'react'
import { View, Text, StyleSheet, SafeAreaView, Button } from 'react-native'
import colors from '../styles/colors'
import {Perfil} from '../components/Perfil'
import fonts from '../styles/fonts'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import ButtonAmbiente from '../components/ButtonAmbiente'
import api from '../services/api'
import PlantCardPrimary from '../components/PlantCardPrimary'

interface ambientesProps {
   key: string,
   title: string,
}

interface plantasProps {
   id: string,
   name: string,
   about: string,
   water_tips: string,
   photo: string,
   environments: [string],
   frequency: {
     times: number,
     repeat_every: string,
   }
}

export function PlantSelect() {

   const [ambientes, setAmbientes] = useState<ambientesProps[]>([]);
   const [plantas, setPlantas] = useState<plantasProps[]>([]);
   const [plantasFiltradas, setPlantasFiltradas] = useState<plantasProps[]>([]);
   const [ambienteSelecionado, setAmbienteSelecionado] = useState('all');

   useEffect(() => {
      async function feachAmbientes(){
         const {data} = await api.get('plants_environments');
         //setAmbientes(data)
         setAmbientes([
            {
               key:'all',
               title: 'Todos'
            }, ...data])

      }
      feachAmbientes()
      
   }, [])

   useEffect(() => {      
      async function feachPlants() {
         const{data} = await api.get('plants?_sort=name&_order=asc');
         setPlantas(data);
         setPlantasFiltradas(data);         
      }
      feachPlants();
   }, [])

   function handlerAmbienteSelecionado(AmbienteSelecionado : string){      
      setAmbienteSelecionado(AmbienteSelecionado);

      if(AmbienteSelecionado == 'all'){
         setPlantasFiltradas(plantas);
      }
      else
      {
         const plantasFiltradas = plantas.filter(planta=>planta.environments.includes(AmbienteSelecionado))
         setPlantasFiltradas(plantasFiltradas);
      }
   }



   return (
      <SafeAreaView style={styles.container}>
         <Perfil texto1='Olá,' texto2='Marcelo' avatar = ''></Perfil>
         <View style={styles.containerTitulo}>
            <Text style={styles.titulo}>Em qual ambiente</Text>
            <Text style={styles.subTitulo}>você quer colocar sua planta?</Text>
         </View>
         <View style={styles.containerBotoesAmbiente}>
            <FlatList 
               style={styles.ListaBotoesAmbiente}
               data={ambientes} 
               renderItem={({item}) => (
                  <ButtonAmbiente 
                     titulo={item.title} 
                     ativo={item.key == ambienteSelecionado}  
                     onPress={()=>{handlerAmbienteSelecionado(item.key)}} 
                  />
               )}
               horizontal
               showsHorizontalScrollIndicator = {false}
            ></FlatList>            
         </View>
         <View style={styles.containerPlantas}>
            <FlatList 
               style={styles.ListaCardsPlantas}
               data={plantasFiltradas}
               renderItem={({item}) => (
                  <PlantCardPrimary data={item} onPress={()=>{}} ></PlantCardPrimary>
               )}
               showsVerticalScrollIndicator = {false}
               numColumns={2}
            />
         </View>

      </SafeAreaView>
   )
}

const styles = StyleSheet.create({
   container:{
      flex:1,
      paddingVertical:80,
      paddingHorizontal:32,      
   },
   containerTitulo:{
      marginTop:40,
   },
   titulo:{
      color:colors.heading,
      fontFamily:fonts.heading,      
      fontSize:17,
   },
   subTitulo:{
      color:colors.heading,
      fontFamily:fonts.text,
      fontSize:17,
   },
   containerBotoesAmbiente:{
      marginTop:24,
   },
   ListaBotoesAmbiente:{
      width:'100%',
   },
   containerPlantas:{
      marginTop:40,
   },
   ListaCardsPlantas:{

   }

})
