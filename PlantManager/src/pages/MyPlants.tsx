import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'
import Perfil from '../components/Perfil'
import CardRegagem from '../components/CardRegagem'
import { FlatList } from 'react-native-gesture-handler'
import colors from '../styles/colors'
import fonts from '../styles/fonts'
import {getPlantas, delPlantas} from '../storage/Plantas'
import iPlantas from '../interfaces/Plantas'
import Loading from '../components/Loading'
import { formatDistance } from 'date-fns'
import { pt } from 'date-fns/locale'
import PlantCardSecundary from '../components/PlantCardSecundary'


export default function MyPlants() {

   const [myPlants, setMyPlants] = useState<iPlantas[]>();
   const [loading, setLoading] = useState(true);
   const [regagem, setRegagem] = useState<string>('');
   
   function handleRemover(planta : iPlantas){
      Alert.alert('Remover',`Deseja remover a planta ${planta.name}?`,[
         {
            text:'Sim',
            onPress: async() =>
             {
                delPlantas(planta.id)        
                setMyPlants((oldData) => oldData?.filter((item) => item.id != planta.id));

                ////Não funciona pq tenho o useEfect não funciona de forma automática. setMyPlants(myPlantas);                
                //await loadingPlants();
            }
         },         
         {
            text: 'Não',
            style: 'cancel'
         },         

      ])
   }

   function temPlantas(myPlants : iPlantas[]) : boolean {      
      return myPlants.length > 0
   }

   async function loadingPlants() {
      try{

         setLoading(true);
         const myPlantas = await getPlantas();          
         
         if(myPlantas && temPlantas(myPlantas))
         {
            const time = formatDistance(
               new Date(myPlantas[0].dateTimeNotification).getTime(),
               new Date().getTime(), { locale:pt} 
               )
            
            setRegagem(`Regue sua ${myPlantas[0].name} daqui a ${time}`);
            setMyPlants(myPlantas);
         }
         else{
            Alert.alert('Atenção', 'Você ainda não tem plantas cadastradas.');
            return
         }
      }
      catch (e) {
         Alert.alert('Atenção', `Não foi possível recuperar suas plantas: ${e.message}`);
         setMyPlants([]);
         return
      } 
     finally{
      setLoading(false)
     }
   } 

   useEffect(() => {  
      loadingPlants(); 
   }, [])

   if(loading){
      return (<Loading></Loading>)
   }

   return (
      <View style={styles.container}>
         <View style={styles.containerPerfil}>
            <Perfil texto1='Minhas' texto2='Plantinhas'></Perfil>
         </View>
         <CardRegagem dica={regagem || ''}></CardRegagem>
         <Text style={styles.tituloPlantas}>Próximas regadas</Text>     
         <View style={styles.containerPlantas}>
            <FlatList                
                  data={myPlants} 
                  keyExtractor = {(item)=>item.id.toString()}
                  renderItem={({item}) => (
                     <PlantCardSecundary handleRemover={()=>handleRemover(item)} data={item}></PlantCardSecundary>                  
                  )}               
                  showsVerticalScrollIndicator = {false}               
               ></FlatList>    
            </View>    
      </View>
   )
}

const styles = StyleSheet.create({
   container:{
      flex:1,
      paddingHorizontal:32,
      paddingVertical:50,
      backgroundColor:colors.white,
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
   containerPlantas:{            
      marginBottom:265,      
   },
})
