import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import WalletScreen from './WalletScreen';
import CardDetailsScreen from './CardDetailsScreen';

const WalletStack = createNativeStackNavigator();

const WalletStackScreen = () => {
  return (
    <WalletStack.Navigator>
      <WalletStack.Group screenOptions={{headerShown: false}}>
        <WalletStack.Screen name="WalletScreen" component={WalletScreen}/>
        <WalletStack.Screen name="CardDetails" component={CardDetailsScreen} />
      </WalletStack.Group>
    </WalletStack.Navigator>
  )
}

export default WalletStackScreen