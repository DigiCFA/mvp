import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";


import HomeStackScreen from "./screens/Home/HomeStackScreen";
import WalletStackScreen from "./screens/Wallet/WalletStackScreen";
import TransferStackScreen from "./screens/Transfer/TransferStackScreen";
import MeStackScreen from "./screens/Me/MeStackScreen";
import LoginSignupStackScreen from "./screens/LoginSigup/LoginSignupStackScreen";
import { store } from "./store"
import { Provider } from "react-redux";

const NavBar = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();

export default function App() {
  [userToken, setUserToken] = useState("");

  const navigationScreens =
    userToken == null ? (
      <NavBar.Screen
        component={LoginSignupStackScreen}
        name="LoginSignup"
        options={{
          headerShown: false,
          tabBarStyle: { display: "none" },
        }}
      />
    ) : (
      <NavBar.Group screenOptions={{ headerShown: false }}>
        <NavBar.Screen name="Home" component={HomeStackScreen} />

        <NavBar.Screen name="Transfer" component={TransferStackScreen} />

        <NavBar.Screen name="Wallet" component={WalletStackScreen} />

        <NavBar.Screen name="Me" component={MeStackScreen} />
      </NavBar.Group>
    );

  return (
    <NavigationContainer>
      <Provider store={store}>
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
              if (
                routeName === "User" ||
                routeName === "PaymentMethods" ||
                routeName === "SendReview" ||
                routeName === "SendConfirmation" ||
                routeName === "RequestReview" ||
                routeName === "RequestConfirmation" ||
                routeName === "Transaction"
              ) {
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
      </Provider>
    </NavigationContainer>
  );
}
