import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MeScreen from "./ProfileScreen";
import AccountInfoScreen from "./AccountInfoScreen";
import MessageCenterScreen from "./MessageCenterScreen";
import SecurityScreen from "./SecurityScreen";

const MeStack = createNativeStackNavigator();

const MeStackScreen = () => {
  return (
    <MeStack.Navigator>
      <MeStack.Group screenOptions={{ headerShown: false }}>
        <MeStack.Screen name="MeScreen" component={MeScreen} />
        <MeStack.Screen name="AccountInfo" component={AccountInfoScreen} />
      </MeStack.Group>
      <MeStack.Screen name="MessageCenter" component={MessageCenterScreen} />
      <MeStack.Screen name="Security" component={SecurityScreen} />
    </MeStack.Navigator>
  );
};

export default MeStackScreen;
