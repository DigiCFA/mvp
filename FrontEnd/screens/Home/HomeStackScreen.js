import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./HomeScreen";
import SearchScreen from "../Transfer/SearchScreen";
import ScanScreen from "../Transfer/ScanScreen";
import TransactionScreen from "./TransactionScreen";

const HomeStack = createNativeStackNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Group screenOptions={{ headerShown: false }}>
        <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
        <HomeStack.Screen
          name="Search"
          component={SearchScreen}
          options={{
            gestureDirection: "vertical",
            // presentation: 'presentationModal',
            }}/>
        <HomeStack.Screen name="Transaction" component={TransactionScreen}/>
      </HomeStack.Group>

      <HomeStack.Screen name="Scan" component={ScanScreen} />
    </HomeStack.Navigator>
  );
};

export default HomeStackScreen;
