import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SearchScreen from "./SearchScreen";
import UserScreen from "./UserScreen";
import ScanScreen from "./ScanScreen";
import PaymentMethodsScreen from "./PaymentMethodsScreen";
import TESTScreen from "./TESTScreen";


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
        <PayRequestStack.Screen name="User" component={UserScreen}/>

        <PayRequestStack.Group 
          screenOptions={{
            presentation: 'transparentModal',
            // cardStyle: {
            //   backgroundColor: 'transparent'
            // },
            // cardOverlayEnabled: true,
            }}
        >
          <PayRequestStack.Screen name="PaymentMethods" component={PaymentMethodsScreen} />
          <PayRequestStack.Screen name="Test" component={TESTScreen} />
        </PayRequestStack.Group>
      </PayRequestStack.Group>
      
    </PayRequestStack.Navigator>
  );
};

export default PayRequestStackScreen;
