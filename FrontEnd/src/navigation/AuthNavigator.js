import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import AuthLandingScreen from "../screens/Auth/AuthLandingScreen";
import SignupPhoneNumberScreen from "../screens/Auth/SignupPhoneNumberScreen";
import PhoneVerificationScreen from "../screens/Auth/PhoneVerificationScreen";
import SetPasswordScreen from "../screens/Auth/SetPasswordScreen";
import SetProfileScreen from "../screens/Auth/SetProfileScreen";

const Stack = createNativeStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator>
    <Stack.Group screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Landing" component={AuthLandingScreen} />
      <Stack.Screen name="PhoneNumber" component={SignupPhoneNumberScreen} />
      <Stack.Screen
        name="PhoneVerification"
        component={PhoneVerificationScreen}
      />
      <Stack.Screen name="Password" component={SetPasswordScreen} />
      <Stack.Screen name="Profile" component={SetProfileScreen} />
    </Stack.Group>
  </Stack.Navigator>
);

export default AuthNavigator;
