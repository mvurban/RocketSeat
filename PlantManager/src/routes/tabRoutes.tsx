import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import colors from '../styles/colors';
import PlantSelect from '../pages/PlantSelect';
import MyPlants from '../pages/MyPlants';
import { MaterialIcons } from '@expo/vector-icons';

const Pages = createBottomTabNavigator();

export default function tabRoutes() {
   return (
      <Pages.Navigator          
         tabBarOptions={{            
            activeTintColor:colors.green,
            inactiveTintColor:colors.heading,
            labelPosition: 'beside-icon',
            style:{
               paddingVertical: 20,
               height:66,
               paddingBottom:22,
            }
         }}>
         <Pages.Screen 
            name="Nova Planta" 
            component={PlantSelect}             
            options={{               
               tabBarIcon: (({size, color}) => (
                  <MaterialIcons 
                     name="format-list-bulleted"
                     size={size}
                     color={color}></MaterialIcons>
               ))
            }}
         />
         <Pages.Screen 
            name="Minhas Planta" 
            component={MyPlants} 
            options={{
               tabBarIcon: (({size, color}) => (
                  <MaterialIcons 
                     name="add-circle-outline"
                     size={size}
                     color={color}></MaterialIcons>
               ))
            }}
         />
      </Pages.Navigator>
   )
}
