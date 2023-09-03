import { Text } from "react-native";
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import * as Linking from "expo-linking";
import { Provider, useSelector, useDispatch } from "react-redux";
import { createStoreWithPreloadedState } from "./store";

import HomeStackScreen from "./screens/Home/HomeStackScreen";
import WalletStackScreen from "./screens/Wallet/WalletStackScreen";
import TransferStackScreen from "./screens/Transfer/TransferStackScreen";
import MeStackScreen from "./screens/Profile/MeStackScreen";
import LoginSignupStackScreen from "./screens/Auth/LoginSignupStackScreen";
import { getSession } from "./redux/reducers/sessionSlice";
import {
  fetchUserById,
  fetchTransactionsById,
} from "./redux/reducers/selfSlice";

const NavBar = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();

const tabHiddenRoutes = [
  "User",
  "PaymentMethods",
  "SendReview",
  "SendConfirmation",
  "RequestReview",
  "RequestConfirmation",
  "Transaction",
  "CardDetails",
  "QRError",
  "Scan",
  "AccountInfo",
  "MessageCenter",
  "Security",
];

const prefix = Linking.createURL("/");

const App = () => {
  let userId = useSelector((state) => state.session.userId);
  userId = "64eb0d88eaf1bbe6d5741736";
  let isLoggedIn = Boolean(userId);
  // isLoggedIn = true;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSession());
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchUserById(userId));
      dispatch(fetchTransactionsById(userId));
    }
  }, [isLoggedIn]);

  const config = {
    screens: {
      Transfer: {
        path: "pay",
        // initialRouteName: 'Search',
        screens: {
          User: {
            path: "user/:id/:name",
            parse: {
              name: (name) => {
                let firstName = name.split("_")[0];
                let lastName = name.split("_")[1];
                let fullName =
                  firstName.charAt(0).toUpperCase() +
                  firstName.slice(1) +
                  " " +
                  lastName.charAt(0).toUpperCase() +
                  lastName.slice(1);

                return fullName;
              },
            },
          },
          // Catch all
          QRError: "*",
        },
      },
    },
  };

  const linking = {
    prefixes: [prefix],
    config,
  };

  const fallback = `
    <Text>Loading...</Text>
  `;

  const navigationScreens = isLoggedIn ? (
    <NavBar.Group screenOptions={{ headerShown: false }}>
      <NavBar.Screen name="Home" component={HomeStackScreen} />

      <NavBar.Screen name="Transfer" component={TransferStackScreen} />

      <NavBar.Screen name="Wallet" component={WalletStackScreen} />

      <NavBar.Screen name="Me" component={MeStackScreen} />
    </NavBar.Group>
  ) : (
    <NavBar.Screen
      component={LoginSignupStackScreen}
      name="LoginSignup"
      options={{
        headerShown: false,
        tabBarStyle: { display: "none" },
      }}
    />
  );

  return (
    <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
      <NavBar.Navigator
        screenOptions={({ route }) => ({
          // can also put into each screen component, but put here as a function for convenience
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              // iconName = focused ? 'ios-home' : 'ios-home-outline';
              iconName = "home";
            } else if (route.name === "Transfer") {
              iconName = "cart";
            } else if (route.name === "Wallet") {
              iconName = "card";
            } else if (route.name === "Me") {
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
            const currentRoute = getFocusedRouteNameFromRoute(route);
            if (tabHiddenRoutes.includes(currentRoute)) {
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
};

export default AppWrapper = () => {
  const store = createStoreWithPreloadedState({});
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
