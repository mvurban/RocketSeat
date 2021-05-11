import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';
import plantasProps from '../interfaces/Plantas';

interface storagePlantasProps {
   [id:string]:{
      data: plantasProps,
   }
}

export async function setPlanta(planta:plantasProps) : Promise<void> {
   try{
      const data = await AsyncStorage.getItem('@plantmanager:plantas')
      const oldPlants = data ? (JSON.parse(data) as storagePlantasProps) : {};
      const newPlant = {
         [planta.id] : {
            data:planta
         }
      }
      await AsyncStorage.setItem('@plantmanager:plantas', 
         JSON.stringify({
            ...newPlant,
            ...oldPlants
         })
      )
   }
   catch(error){
      throw new Error(error);
   }
   
}

export async function getPlantas() : Promise<plantasProps[]> {
   try{
      
      const data = await AsyncStorage.getItem('@plantmanager:plantas')
      const Plantas = data ? (JSON.parse(data) as storagePlantasProps) : {};
      return sortPlantas(Plantas);
   }
   catch(error){
      throw new Error(error);
   }
   
}

function sortPlantas(plantas : storagePlantasProps) : plantasProps[]
{
   const PlantasMap = Object
   .keys(plantas)
   .map((plant) => {
      return{
         ...plantas[plant].data, hour: format(new Date(plantas[plant].data.dateTimeNotification), 'HH:mm')
      }
   })
   const PlantasSorted = PlantasMap
   .sort((a, b) => 
      Math.floor(new Date(a.dateTimeNotification).getTime() /1000 - 
      Math.floor(new Date(b.dateTimeNotification).getTime() /1000))
   )
   return PlantasSorted;

}