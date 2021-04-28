import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import colors from '../styles/colors' ;
import {Welcome} from '../pages/Welcome';
import {UserIdentification} from '../pages/UserIdentification';
import {Confirmation} from '../pages/Confirmation';
import {PlantSelect } from '../pages/PlantSelect';

const pages = createStackNavigator();

const AppRoutes: React.FC = () =>(
   <pages.Navigator headerMode="none" screenOptions={{cardStyle: {backgroundColor:colors.white}}}>
      <pages.Screen name="Welcome" component={Welcome} />
      <pages.Screen name="UserIdentification" component={UserIdentification} /> 
      <pages.Screen name="Confirmation" component={Confirmation} />
      <pages.Screen name="PlantSelect" component={PlantSelect} />

   </pages.Navigator>
)

export default AppRoutes;