import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MeScreen from './MeScreen';
import AccountInfoScreen from './AccountInfoScreen';

const MeStack = createNativeStackNavigator();

const MeStackScreen = () => {
  return (
    <MeStack.Navigator>
        <MeStack.Screen name="MeScreen" component={MeScreen} />
        <MeStack.Screen name="AccountInfo" component={AccountInfoScreen} />
    </MeStack.Navigator>
  )
}

export default MeStackScreen