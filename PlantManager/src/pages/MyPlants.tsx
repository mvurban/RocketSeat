import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'
import Perfil from '../components/Perfil'
import CardRegagem from '../components/CardRegagem'
import { FlatList } from 'react-native-gesture-handler'
import colors from '../styles/colors'
import fonts from '../styles/fonts'
import {getPlantas} from '../storage/Plantas'
import iPlantas from '../interfaces/Plantas'
import iPlantCard from '../interfaces/PlantCard'
import Loading from '../components/Loading'
import { formatDistance } from 'date-fns'
import { pt } from 'date-fns/locale'
import PlantCardSecundary from '../components/PlantCardSecundary'

export default function MyPlants() {

   const [myPlants, setMyPlants] = useState<iPlantas[]>();
   const [loading, setLoading] = useState(true);
   const [regagem, setRegagem] = useState<string>('');
   const [plantCard, setPlantCard] = useState<iPlantCard>();

   useEffect(() => {
      async function loadingPlants() {
         try{
            setLoading(true);
            const myPlantas = await getPlantas();          

            const time = formatDistance(
               new Date(myPlantas[0].dateTimeNotification).getTime(),
               new Date().getTime(), { locale:pt}
               )
            setRegagem(`Regue sua ${myPlantas[0].name} daqui a ${time}`);
            


            if(!myPlantas)
            {
               Alert.alert('Atenção', 'Você ainda não tem plantas cadastradas.');
               return
            }
            setMyPlants(myPlantas);
         }
         catch (e) {
            Alert.alert('Atenção', `Não foi possível recuperar suas plantas: ${e.message}`);
            setMyPlants([]);
            return
         } 
      }     
      loadingPlants(); 
      setLoading(false)
   }, [])

   {
      if(loading){
         return (<Loading></Loading>)
      }
   }

   return (
      <View style={styles.container}>
         <View style={styles.containerPerfil}>
            <Perfil texto1='Minhas' texto2='Plantinhas'></Perfil>
         </View>
         <CardRegagem dica={regagem || ''}></CardRegagem>
         <Text style={styles.tituloPlantas}>Próximas regadas</Text>         
         <FlatList                
               data={myPlants} 
               keyExtractor = {(item)=>item.id}
               renderItem={({item}) => (
                  <PlantCardSecundary data={item}></PlantCardSecundary>                  
                  //    titulo={item.title} 
                  //    ativo={item.key == ambienteSelecionado}  
                  //    onPress={()=>{handlerAmbienteSelecionado(item.key)}} 
                  // />
               )}               
               showsVerticalScrollIndicator = {false}
               contentContainerStyle={{flex:1}}
            ></FlatList>    

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
