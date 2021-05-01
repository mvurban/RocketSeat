
import React, {useEffect, useState, createRef, useRef} from 'react'
import { View, Text, StyleSheet, SafeAreaView, ActivityIndicator, FlatListProps } from 'react-native'
import colors from '../styles/colors'
import {Perfil} from '../components/Perfil'
import fonts from '../styles/fonts'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import ButtonAmbiente from '../components/ButtonAmbiente'
import api from '../services/api'
import PlantCardPrimary from '../components/PlantCardPrimary'
import Loading from '../components/Loading'
import {useScrollToTop} from '@react-navigation/native'

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
   const [loading, setLoading] = useState(true)
   const [page, setPage] = useState(1)
   const [loadingMore, setloadingMore] = useState(false)
   const [loadedAll, setloadedAll] = useState(false)
   const flatListRef = createRef<FlatList<any>>();

   
   async function feachAmbientes(){
      const {data} = await api.get('plants_environments');
      //setAmbientes(data)
      setAmbientes([
         {
            key:'all',
            title: 'Todos'
         }, ...data])
   }
   async function feachPlants() {
      const{data} = await api.get(`plants?_sort=name&_order=asc&_page=${page}&_limit=6`);

      if(page > 1){
         setPlantas(oldValues => [...oldValues, ...data])
         setPlantasFiltradas(oldValues => [...oldValues, ...data]);     
      }
      else
      {
         setPlantas(data);
         setPlantasFiltradas(data);     
      }          
      setLoading(false);
      setloadingMore(false);
   }
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

      if (flatListRef && flatListRef.current){         
         flatListRef.current.scrollToIndex({index:0, animated:false});
      }
     
   }
   function handlerFeachMore(distanciaDoFim:number){
      //console.log(distanciaDoFim);      

      if(distanciaDoFim < 1)
         return
      
      setloadingMore(true);
      setPage(oldValue => oldValue + 1);
      feachPlants();
   }
    
   useEffect(() => {
      feachAmbientes()      
   }, [])

   useEffect(() => {      
      feachPlants();
   }, [])


   if(loading){
      return (
         <Loading></Loading>
      )
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
               data={plantasFiltradas}
               renderItem={({item}) => (
                  <PlantCardPrimary data={item} onPress={()=>{}} ></PlantCardPrimary>
               )}                 
               ref={flatListRef}               
               showsVerticalScrollIndicator = {false}
               numColumns={2}
               onEndReachedThreshold={0.2}               
               onEndReached={({distanceFromEnd}) => handlerFeachMore(distanceFromEnd)}
               ListFooterComponent={
                  loadingMore 
                  ?
                     <ActivityIndicator color={colors.green}></ActivityIndicator>
                  :
                     <></>
               }
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
      height:400,
      
   },
})
