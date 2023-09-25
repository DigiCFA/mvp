import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import AccountInfoScreen from "../screens/Profile/AccountInfoScreen";
import MessageCenterScreen from "../screens/Profile/MessageCenterScreen";
import SecurityScreen from "../screens/Profile/SecurityScreen";
import PhoneNumberScreen from "../screens/Profile/PhoneNumberScreen";
import AddressScreen from "../screens/Profile/AddressScreen";
import PhoneNumberDetailsScreen from "../screens/Profile/PhoneNumberDetailsScreen";

const Stack = createNativeStackNavigator();

const ProfileNavigator = () => (
  <Stack.Navigator>
    <Stack.Group screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="AccountInfo" component={AccountInfoScreen} />
      <Stack.Screen name="PhoneNumber" component={PhoneNumberScreen}/>
      <Stack.Screen name="PhoneNumberDetails" component={PhoneNumberDetailsScreen}/>
      <Stack.Screen name="Address" component={AddressScreen} />
    </Stack.Group>
    <Stack.Screen name="MessageCenter" component={MessageCenterScreen} />
    <Stack.Screen name="Security" component={SecurityScreen} />
  </Stack.Navigator>
);

export default ProfileNavigator;
