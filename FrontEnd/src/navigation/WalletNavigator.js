import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WalletScreen from "../screens/Wallet/WalletScreen";
import CardDetailsScreen from "../screens/Wallet/CardDetailsScreen";

const WalletStack = createNativeStackNavigator();

const WalletNavigator = () => (
  <WalletStack.Navigator>
    <WalletStack.Group screenOptions={{ headerShown: false }}>
      <WalletStack.Screen name="WalletScreen" component={WalletScreen} />
      <WalletStack.Screen name="CardDetails" component={CardDetailsScreen} />
    </WalletStack.Group>
  </WalletStack.Navigator>
);

export default WalletNavigator;
