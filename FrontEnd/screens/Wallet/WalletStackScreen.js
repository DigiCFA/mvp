import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import WalletScreen from './WalletScreen';

const WalletStack = createNativeStackNavigator();

const WalletStackScreen = () => {
  return (
    <WalletStack.Navigator>
      <WalletStack.Group screenOptions={{headerShown: false}}>
        <WalletStack.Screen name="WalletScreen" component={WalletScreen}/>
      </WalletStack.Group>
    </WalletStack.Navigator>
  )
}

export default WalletStackScreen