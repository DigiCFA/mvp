import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SearchScreen from "./SearchScreen";
import UserScreen from "./UserScreen";
import ScanScreen from "./ScanScreen";
import PaymentMethodsScreen from "./PaymentMethodsScreen";
import TESTScreen from "../TESTScreen";
import { createStackNavigator } from "@react-navigation/stack";
import SendReviewScreen from "./SendReviewScreen";

const TransferStack = createStackNavigator();

const TransferStackScreen = () => {
  return (
    <TransferStack.Navigator screenOptions={{ headerShown: false }}>
      <TransferStack.Screen
        name="Search"
        component={SearchScreen}
      />
      <TransferStack.Screen name="Scan" component={ScanScreen} />

      <TransferStack.Group
        screenOptions={{ tabBayStyle: { display: "None" } }}
      >
        <TransferStack.Screen name="User" component={UserScreen} />

        <TransferStack.Group
          screenOptions={{
            presentation: "transparentModal",
            // cardStyle: {
            //   backgroundColor: 'transparent'
            // },
            // cardOverlayEnabled: true,
          }}
        >
          <TransferStack.Screen name="PaymentMethods" component={PaymentMethodsScreen}/>
          <TransferStack.Screen name="SendReview" component={SendReviewScreen}/>
          <TransferStack.Screen name="Test" component={TESTScreen} />
        </TransferStack.Group>
      </TransferStack.Group>
    </TransferStack.Navigator>
  );
};

export default TransferStackScreen;
