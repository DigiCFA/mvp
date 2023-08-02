import {
  View,
  Text,
  useWindowDimensions,
  Pressable,
  StyleSheet,
  Animated,
  Button,
  TouchableOpacity,
} from "react-native";
import React from "react";

import { useCardAnimation } from "@react-navigation/stack";
import { useNavigation, useRoute, useTheme } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import CardsColumn from "../../components/CardsColumn";

const PaymentMethodsScreen = () => {

  // Need to update this Screen on which card we ended up choosing!!
  const cardID = 0
  const cardName = 'DigiCFA Balance'
  const cardType = 'Balance'
  const cardNumber = 'N/A'



  const { height } = useWindowDimensions();
  const { current } = useCardAnimation();
  const navigation = useNavigation();

  const {
    params: { name, amount, message },
  } = useRoute();

  return (
    <View className="flex-1 items-center justify-center">
      <Pressable
        // Convert this to tailwind, probably not hard
        style={[
          StyleSheet.absoluteFill,
          { backgroundColor: "rgba(0,0,0,0.5)" },
        ]}
        onPress={navigation.goBack}
      />

      {/* Responsible for modal */}
      <Animated.View
        style={{
          height: height,
          width: "100%",
          transform: [
            {
              translateY: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [height, height * 0.3],
                extrapolate: "clamp",
              }),
            },
          ],
        }}
      >
        <View className="flex-1 p-4 bg-white rounded-3xl">
          <View className="flex-col h-2/3">
            {/* Top Portion */}
            <View className="flex-row mb-4">
              <TouchableOpacity onPress={navigation.goBack} className="flex-1">
                <Ionicons name="arrow-back" size={30} color="grey" />
              </TouchableOpacity>

              <Text className="text-lg font-semibold">Choose a way to pay</Text>

              <View className="flex-1"></View>
            </View>

            {/* Cards */}
            <ScrollView>
              <CardsColumn />
              <Text>{name}, {amount}, {message}</Text>
            </ScrollView>

            {/* Bottom Portion */}
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
                navigation.navigate("SendReview", {
                name, amount, message, cardID, cardName, cardType, cardNumber
              })}}
              className="bg-blue-900 rounded-full py-3 px-14 items-center"
            >
              <Text className="text-white text-xl font-extrabold">Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

export default PaymentMethodsScreen;
