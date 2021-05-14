import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';
import iplantas from '../interfaces/Plantas';
import {NotificationWaterPlant, CancelNotificationWaterPlant} from './Notifications';

interface storagePlantasProps {
   [id:string]:{
      data: iplantas;
      idNotification : string;
   }
}


export async function addPlanta(planta:iplantas) : Promise<void> {
   try{
      
      const idNotification  = await NotificationWaterPlant(planta);

      const oldPlants = await getPlantasToStorage();
      const newPlant = {
         [planta.id] : {
            data:planta,
            idNotification
         }
      }
           
      addPlantasToStorage({...oldPlants, ...newPlant})

   }
   catch(error){
      throw new Error(error);
   }
   
}

export async function getPlantas() : Promise<iplantas[]> {
   try{            
      const Plantas = await getPlantasToStorage();
      return sortPlantas(Plantas);
   }
   catch(error){
      throw new Error(error);
   }
   
}

export async function delPlantas(id:string) {
   try{
      const Plantas = await getPlantasToStorage();

      await CancelNotificationWaterPlant(Plantas[id].idNotification);

      delete Plantas[id];
      addPlantasToStorage(Plantas)      
   }
   catch(e){
      throw e;
   }
}

async function addPlantasToStorage(plantas:storagePlantasProps) {
   try{

   await AsyncStorage.setItem('@plantmanager:plantas', 
         JSON.stringify(plantas)
      )
   }
   catch(e){
      throw new Error(e);
   }
}
async function getPlantasToStorage() :  Promise<storagePlantasProps>{

   try{
      const data = await AsyncStorage.getItem('@plantmanager:plantas')
      const Plants = data ? (JSON.parse(data) as storagePlantasProps) : {};
      return Plants 
   }
   catch(e){
      throw new Error(e);
   }
   
}
function sortPlantas(plantas : storagePlantasProps) : iplantas[]
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