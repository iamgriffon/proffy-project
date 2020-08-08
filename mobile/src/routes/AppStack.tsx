import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import LandingPage from '../pages/Landing';
import GiveClasses from '../pages/GiveClasses';
import StudyTabs from './AppTabs';

const {Navigator, Screen} = createStackNavigator();

const AppStack = () => (
  <NavigationContainer>
    <Navigator screenOptions={{headerShown: false}}>
      <Screen name='LandingPage' component={LandingPage}/>
      <Screen name='GiveClasses' component={GiveClasses}/>
      <Screen name='Study' component={StudyTabs} />
    </Navigator>
  </NavigationContainer>
)
export default AppStack;