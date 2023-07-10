import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SearchScreen from "./SearchScreen";
import UserScreen from "./UserScreen";
import ScanScreen from "./ScanScreen";

const PayRequestStack = createNativeStackNavigator();

const PayRequestStackScreen = () => {
  return (
    <PayRequestStack.Navigator>
      <PayRequestStack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerShown: false,
          // presentation: 'presentationModal',
        }}
      />
      <PayRequestStack.Screen
        name="User"
        component={UserScreen}
        options={{
          headerShown: false,
          tabBarStyle: { display: "none" },
        }}
      />
      <PayRequestStack.Screen name="Scan" component={ScanScreen} />
    </PayRequestStack.Navigator>
  );
};

export default PayRequestStackScreen;
