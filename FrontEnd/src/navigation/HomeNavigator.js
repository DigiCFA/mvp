import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/Home/HomeScreen";
import SearchScreen from "../screens/Transfer/SearchScreen";
import QRScreen from "../screens/Transfer/QRScreen";
import TransactionScreen from "./screens/TransactionScreen";
import QRErrorScreen from "../screens/Transfer/QRErrorScreen";

const Stack = createNativeStackNavigator();

const HomeNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Group>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          gestureDirection: "vertical",
          // presentation: 'presentationModal',
        }}
      />
      <Stack.Screen name="Transaction" component={TransactionScreen} />
    </Stack.Group>

    <Stack.Screen name="Scan" component={QRScreen} />
  </Stack.Navigator>
);

export default HomeNavigator;
