import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MeScreen from './MeScreen';
import AccountInfoScreen from './AccountInfoScreen';
import MessageCenterScreen from './MessageCenterScreen';
import SecurityScreen from './SecurityScreen';

const MeStack = createNativeStackNavigator();

const MeStackScreen = () => {
  return (
    <MeStack.Navigator >
        <MeStack.Screen name="MeScreen" component={MeScreen} options={{ headerShown: false }} />
        <MeStack.Screen name="AccountInfo" component={AccountInfoScreen} />
        <MeStack.Screen name="MessageCenter" component={MessageCenterScreen} />
        <MeStack.Screen name="Security" component={SecurityScreen} />
    </MeStack.Navigator>
  )
}

export default MeStackScreen