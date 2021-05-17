import React from 'react';
import * as Notifications from 'expo-notifications';
import iPlantas from '../interfaces/Plantas'

export async function NotificationWaterPlant(plant : iPlantas) : Promise<string> {
   
   try{
      const nextTime = new Date(plant.dateTimeNotification);
      const now = new Date();

      const {times, repeat_every} = plant.frequency;
      if(repeat_every == 'week'){
         const interval = Math.trunc(7 / times)
         nextTime.setDate(now.getDate() + interval)
      }
       else{
          nextTime.setDate(nextTime.getDate() + 1)
      }

      const seconds = Math.abs(Math.ceil((now.getTime() - nextTime.getTime()) / 1000))
      const notificationId = await Notifications.scheduleNotificationAsync({
         content:{
            title:'Opa, tá na hora de regar ☘️',
            body:`Sua planta ${plant.name} está com sede, vamos regá-la`,
            sound: true,
            priority: Notifications.AndroidNotificationPriority.HIGH,
            data : {
               plant
            },
         },
         trigger: {
            seconds: seconds < 60 ? 60 : seconds,
            repeats: true            
         }
      });

      return notificationId
   }
   catch(e){
      throw new Error(e);
   }
}

export async function CancelNotificationWaterPlant(IdNotification : string)  {

   try{
      if(IdNotification && IdNotification.length > 0)
         //await Notifications.cancelAllScheduledNotificationsAsync();
         await Notifications.cancelScheduledNotificationAsync(IdNotification);
   }
   catch(e){
      throw new Error(e);
   }
}