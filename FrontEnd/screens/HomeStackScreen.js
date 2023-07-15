import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './HomeScreen';
import SearchScreen from './SearchScreen';
import ScanScreen from './ScanScreen';

const HomeStack = createNativeStackNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator>
        <HomeStack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }}/>
        <HomeStack.Screen name="Search" component={SearchScreen} 
        options={{ 
          headerShown: false,
          gestureDirection: 'vertical'
          // presentation: 'presentationModal',
          }} />
        <HomeStack.Screen name="Scan" component={ScanScreen} />
    </HomeStack.Navigator>
  )
}

export default HomeStackScreen