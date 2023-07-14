import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SearchScreen from "./SearchScreen";
import UserScreen from "./UserScreen";
import ScanScreen from "./ScanScreen";
import PaymentMethodsScreen from "./PaymentMethodsScreen";

const PayRequestStack = createNativeStackNavigator();

const PayRequestStackScreen = () => {
  return (
    <PayRequestStack.Navigator screenOptions={{headerShown: false}}>
      <PayRequestStack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          // presentation: 'presentationModal',
        }}
      />
      <PayRequestStack.Screen name="Scan" component={ScanScreen} />

      <PayRequestStack.Group screenOptions={{ tabBayStyle: {display: "None"}}}>
        <PayRequestStack.Screen
          name="User"
          component={UserScreen}
          options={{
            // tabBarStyle: { display: "none" },
          }}
        />

        <PayRequestStack.Group 
          screenOptions={{
            presentation: 'modal',
            // cardStyle: {
            //   backgroundColor: 'transparent'
            // },
            // cardOverlayEnabled: true,
            }}
        >
          <PayRequestStack.Screen
            name="PaymentMethods"
            component={PaymentMethodsScreen}
            options={{
              // presentation: 'transparentModal',
              // tabBarStyle: { display: "none" },
            }}
          />
        </PayRequestStack.Group>
      </PayRequestStack.Group>
      
    </PayRequestStack.Navigator>
  );
};

export default PayRequestStackScreen;
