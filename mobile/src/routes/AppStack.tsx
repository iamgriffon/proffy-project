import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import LandingPage from '../pages/Landing';
import GiveClasses from '../pages/GiveClasses';

const {Navigator, Screen} = createStackNavigator();

const AppStack = () => (
  <NavigationContainer>
    <Navigator screenOptions={{headerShown: false}}>
      <Screen name='LandingPage' component={LandingPage}/>
      <Screen name='GiveClasses' component={GiveClasses}/>
    </Navigator>
  </NavigationContainer>
)
export default AppStack;