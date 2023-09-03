import React from "react";
import SearchScreen from "../screens/Transfer/SearchScreen";
import UserScreen from "../screens/Transfer/UserScreen";
import QRScreen from "../screens/Transfer/QRScreen";
import PaymentMethodsScreen from "../screens/Transfer/PaymentMethodsScreen";
import { createStackNavigator } from "@react-navigation/stack";
import SendReviewScreen from "../screens/Transfer/SendReviewScreen";
import RequestReviewScreen from "../screens/Transfer/RequestReviewScreen";
import SendConfirmationScreen from "../screens/Transfer/SendConfirmationScreen";
import RequestConfirmationScreen from "../screens/Transfer/RequestConfirmationScreen";
import HomeScreen from "../screens/Home/HomeScreen";
import QRErrorScreen from "../screens/Transfer/QRErrorScreen";

const Stack = createStackNavigator();

const TransferNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="Scan" component={QRScreen} />

      <Stack.Group screenOptions={{ tabBayStyle: { display: "None" } }}>
        <Stack.Screen name="User" component={UserScreen} />

        <Stack.Group
          screenOptions={{
            presentation: "transparentModal",
            // cardStyle: {
            //   backgroundColor: 'transparent'
            // },
            // cardOverlayEnabled: true,
          }}
        >
          <Stack.Screen
            name="PaymentMethods"
            component={PaymentMethodsScreen}
          />
          <Stack.Screen
            name="SendReview"
            component={SendReviewScreen}
          />
          <Stack.Screen
            name="RequestReview"
            component={RequestReviewScreen}
          />
        </Stack.Group>

        <Stack.Screen
          name="SendConfirmation"
          component={SendConfirmationScreen}
        />
        <Stack.Screen
          name="RequestConfirmation"
          component={RequestConfirmationScreen}
        />
        <Stack.Screen
          name="QRError"
          component={QRErrorScreen}
          options={{
            gestureDirection: "vertical",
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default TransferNavigator;
