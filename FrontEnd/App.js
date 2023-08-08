import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";

import HomeScreen from "./screens/HomeScreen";
import SearchScreen from "./screens/SearchScreen";
import CardsScreen from "./screens/CardsScreen";
import MeScreen from "./screens/MeScreen";
import HomeStackScreen from "./screens/HomeStackScreen";
import CardsStackScreen from "./screens/CardsStackScreen";
import PayRequestStackScreen from "./screens/PayRequestStackScreen";
import MeStackScreen from "./screens/MeStackScreen";
import ScanScreen from "./screens/ScanScreen";
import TESTScreen from "./screens/TESTScreen";
import LoginSignupStackScreen from "./screens/loginSignup/LoginSignupStackScreen";

const NavBar = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();

export default function App() {

  [userToken, setUserToken] = useState(null)

  const navigationScreens = (userToken == null) ? (
    <NavBar.Screen 
      component={LoginSignupStackScreen}
      name="LoginSignup"
      options={{
        headerShown: false,
        tabBarStyle: {display: "none"}
      }}
    />
  ) : (
    <NavBar.Group 
        screenOptions={{
          headerShown: false,
    }}>
      <NavBar.Screen
        name="Transfer"
        component={PayRequestStackScreen}
      />

      <NavBar.Screen
        name="Home"
        component={HomeStackScreen}
      />

      <NavBar.Screen
        name="Wallet"
        component={CardsStackScreen}
      />

      <NavBar.Screen
        name="Me"
        component={MeStackScreen}
      />
    </NavBar.Group>
  )
 
  return (
    <NavigationContainer>
      <NavBar.Navigator
        screenOptions={({ route }) => ({
          // can also put into each screen component, but put here as a function for convenience
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name == "Home") {
              // iconName = focused ? 'ios-home' : 'ios-home-outline';
              iconName = "home";
            } else if (route.name == "Transfer") {
              iconName = "cart";
            } else if (route.name == "Wallet") {
              iconName = "card";
            } else if (route.name == "Me") {
              iconName = "body";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarLabelStyle: { fontWeight: "bold", fontSize: 12 },
          tabBarActiveTintColor: "#3370E2",
          tabBarInactiveTintColor: "#192C88",
          headerStyle: { backgroundColor: "#e9e7e2" },
          headerTintColor: "#000000",
          headerTintStyle: { fontWeight: "bold" },

          // Hide the tab bar for certain screens
          tabBarStyle: ((route) => {
            const routeName = getFocusedRouteNameFromRoute(route);
            if (routeName === "User" || routeName === "PaymentMethods") {
              return {
                display: "none",
              };
            }
            return {
              // For routes which are not User
              height: 100,
              paddingTop: 10,
            };
          })(route),
        })}
      >
      {navigationScreens}
      </NavBar.Navigator>
    </NavigationContainer>
  );
}
