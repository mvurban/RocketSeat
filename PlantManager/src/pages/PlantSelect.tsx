
import React, {useEffect, useState, createRef} from 'react'
import { View, Text, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Perfil from '../components/Perfil'
import fonts from '../styles/fonts'
import colors from '../styles/colors'
import api from '../services/api'
import ButtonAmbiente from '../components/ButtonAmbiente'
import PlantCardPrimary from '../components/PlantCardPrimary'
import Loading from '../components/Loading'
import plantasProps from '../interfaces/Plantas'
import ambientesProps from '../interfaces/Ambientes'

export default function PlantSelect() {

   const [ambientes, setAmbientes] = useState<ambientesProps[]>([]);
   const [plantas, setPlantas] = useState<plantasProps[]>([]);
   const [plantasFiltradas, setPlantasFiltradas] = useState<plantasProps[]>([]);
   const [ambienteSelecionado, setAmbienteSelecionado] = useState('all');
   const [userName, setUserName] = useState('');
   const [loading, setLoading] = useState(true)
   const [page, setPage] = useState(1)
   const [loadingMore, setloadingMore] = useState(false)
   const flatListRef = createRef<FlatList<any>>();
   const navigation = useNavigation();

   
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
   function handlerPlantSelect(plant:plantasProps)
   {      
      navigation.navigate('PlantSave', {plant});
   }

   useEffect(() => {      
      feachAmbientes()      
      feachPlants();

      async function loadUserName() {
         const user = await AsyncStorage.getItem('@plantmanager:userName');
         setUserName(user || '');
      }
      loadUserName();
   }, [])


   if(loading){
      return (
         <Loading></Loading>
      )
   }      

   return (
      <SafeAreaView style={styles.container}>         
         <Perfil texto1='Olá,' texto2={userName} ></Perfil>
         <View style={styles.containerTitulo}>
            <Text style={styles.titulo}>Em qual ambiente</Text>
            <Text style={styles.subTitulo}>você quer colocar sua planta?</Text>
         </View>
         <View style={styles.containerBotoesAmbiente}>
            <FlatList 
               style={styles.ListaBotoesAmbiente}
               data={ambientes} 
               keyExtractor = {(item)=>item.key}
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
               keyExtractor = {(item)=>item.id}
               renderItem={({item}) => (
                  <PlantCardPrimary data={item} onPress={()=>handlerPlantSelect(item)} ></PlantCardPrimary>
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
      backgroundColor:colors.white, 
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
      marginBottom:165,
   },
})
