import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import AccountInfoScreen from "../screens/Profile/AccountInfoScreen";
import MessageCenterScreen from "../screens/Profile/MessageCenterScreen";
import SecurityScreen from "../screens/Profile/SecurityScreen";
import PhoneNumberScreen from "../screens/Profile/PhoneNumberScreen";
import AddressScreen from "../screens/Profile/AddressScreen";
import PhoneNumberDetailsScreen from "../screens/Profile/PhoneNumberDetailsScreen";
import AddPhoneNumberScreen from "../screens/Profile/AddPhoneNumberScreen";
import PhoneVerificationScreen from "../screens/Auth/PhoneVerificationScreen";
import SupportScreen from "../screens/Profile/SupportScreen";

const Stack = createNativeStackNavigator();

const ProfileNavigator = () => (
  <Stack.Navigator>
    <Stack.Group screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="AccountInfo" component={AccountInfoScreen} />
      <Stack.Screen name="PhoneNumber" component={PhoneNumberScreen}/>
      <Stack.Screen name="PhoneNumberDetails" component={PhoneNumberDetailsScreen}/>
      <Stack.Screen name="AddPhoneNumber" component={AddPhoneNumberScreen}/>
      <Stack.Screen name="Address" component={AddressScreen} />
      <Stack.Screen
        name="PhoneVerification"
        component={PhoneVerificationScreen}
      />
      <Stack.Screen name="Support" component={SupportScreen} />
    </Stack.Group>
    <Stack.Screen name="MessageCenter" component={MessageCenterScreen} />
    <Stack.Screen name="Security" component={SecurityScreen} />
  </Stack.Navigator>
);

export default ProfileNavigator;
