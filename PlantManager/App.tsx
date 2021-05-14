import React, {useEffect} from 'react';
import AppLoading from  'expo-app-loading';
import * as Notifications from 'expo-notifications';
import {useFonts, Jost_400Regular, Jost_600SemiBold} from '@expo-google-fonts/jost'
import iPlant from './src/interfaces/Plantas'
import  Routes from './src/routes';

export default function App(){

   const [ fontsLoaded, fontsLoadedError ] = useFonts({
      Jost_400Regular,
      Jost_600SemiBold,
   });
   
   useEffect(() => {
      
      ////Escutando uma notificação      
      // const subscription = Notifications.addNotificationReceivedListener(
      //    async function notification(notifica)  {
      //       const data = notifica.request.content.data.plant as iPlant;
      //       console.log(data);            
      //    }
      // )
      // return () => subscription.remove();

      ////Recupera todas as notificações agendadas
      // async function notifications(){
      //    const data = await Notifications.getAllScheduledNotificationsAsync();
      //    console.log('#### Notificações Agendadas ####', data);
      // }      
      //notifications();

      ////Cancela todas as notificações agendadas
      // async function notifications(){
      //    await Notifications.cancelAllScheduledNotificationsAsync();
      //    const data = await Notifications.getAllScheduledNotificationsAsync();
      //    console.log('#### Notificações Agendadas ####', data);
      // }      
      // notifications();

   }, [])


   if(!fontsLoaded)
      return <AppLoading />

  return(
   //  <Welcome />
   //<UserIdentification></UserIdentification>
    <Routes />
  )
}