import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SearchScreen from "./SearchScreen";
import UserScreen from "./UserScreen";
import QRScreen from "./QRScreen";
import PaymentMethodsScreen from "./PaymentMethodsScreen";
import { createStackNavigator } from "@react-navigation/stack";
import SendReviewScreen from "./SendReviewScreen";
import RequestReviewScreen from "./RequestReviewScreen";
import SendConfirmationScreen from "./SendConfirmationScreen";
import RequestConfirmationScreen from "./RequestConfirmationScreen";
import HomeScreen from "../Home/HomeScreen";
import HomeStackScreen from "../Home/HomeStackScreen";
import QRErrorScreen from "./QRErrorScreen";

const TransferStack = createStackNavigator();

const TransferStackScreen = () => {
  return (
    <TransferStack.Navigator screenOptions={{ headerShown: false }}>
      <TransferStack.Screen name="Search" component={SearchScreen} />
      <TransferStack.Screen name="Scan" component={QRScreen} />

      <TransferStack.Group screenOptions={{ tabBayStyle: { display: "None" } }}>
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
          <TransferStack.Screen
            name="PaymentMethods"
            component={PaymentMethodsScreen}
          />
          <TransferStack.Screen
            name="SendReview"
            component={SendReviewScreen}
          />
          <TransferStack.Screen
            name="RequestReview"
            component={RequestReviewScreen}
          />
        </TransferStack.Group>

        <TransferStack.Screen
          name="SendConfirmation"
          component={SendConfirmationScreen}
        />
        <TransferStack.Screen
          name="RequestConfirmation"
          component={RequestConfirmationScreen}
        />
        <TransferStack.Screen
          name="QRError"
          component={QRErrorScreen}
          options={{
            gestureDirection: "vertical",
          }}
        />
      </TransferStack.Group>
    </TransferStack.Navigator>
  );
};

export default TransferStackScreen;
