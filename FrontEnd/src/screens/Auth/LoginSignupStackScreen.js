import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import AuthLandingScreen from "./AuthLandingScreen";
import SignupPhoneNumberScreen from "./SignupPhoneNumberScreen";
import PhoneVerificationScreen from "./PhoneVerificationScreen";
import SetPasswordScreen from "./SetPasswordScreen";
import SetProfileScreen from "./SetProfileScreen";

const LoginSignupStackScreen = () => {
  Stack = createNativeStackNavigator();

  return (
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
};

export default LoginSignupStackScreen;
