import { Text } from "react-native";
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";


import HomeNavigator from "./HomeNavigator";
import AuthNavigator from "./AuthNavigator";
import TransferNavigator from "./TransferNavigator";
import WalletNavigator from "./WalletNavigator";
import ProfileNavigator from "./ProfileNavigator";


const NavBar = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();

const AppNavigator = ({isLoggedIn}) => {

  const { t } = useTranslation();

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
    "PhoneNumber",
    "PhoneNumberDetails",
    "AddPhoneNumber",
    "Addresses",
  ];

  // Whether normal screens or auth screens
  const navigationScreens = isLoggedIn ? (
    <NavBar.Group screenOptions={{ headerShown: false }}>
      <NavBar.Screen name={'Home'} component={HomeNavigator} options={{tabBarLabel: t('home')}}/>

      <NavBar.Screen name={"Transfer"} component={TransferNavigator} options={{tabBarLabel: t('transfer')}}/>

      <NavBar.Screen name={"Wallet"} component={WalletNavigator} options={{tabBarLabel: t('wallet')}}/>

      <NavBar.Screen name={"Me"} component={ProfileNavigator}options={{tabBarLabel: t('me')}} />
    </NavBar.Group>
  ) : (
    <NavBar.Screen
      name="Auth"
      component={AuthNavigator}
      options={{
        headerShown: false,
        tabBarStyle: { display: "none" },
      }}
    />
  );

  return (
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
  );
};

export default AppNavigator;
