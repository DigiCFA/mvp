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
import Currency from "react-currency-formatter";

const SendReviewScreen = () => {
  const { height } = useWindowDimensions();
  const { current } = useCardAnimation();
  const navigation = useNavigation();

  const {
    params: {
      name,
      amount,
      message,
      cardID,
      cardName,
      cardType,
      cardNumber,
    },
  } = useRoute();

  // const preferredCard

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
                outputRange: [height, height * 0.65],
                extrapolate: "clamp",
              }),
            },
          ],
        }}
      >
        <View className="flex-1 p-4 bg-white rounded-3xl">
          <View className="flex-col h-[30%]">
          
            {/* Top Portion */}
            <View className="flex-row mb-4">
              <View className="flex-1"></View>

              <Text className="text-lg font-semibold">Review</Text>

              <TouchableOpacity
                onPress={navigation.goBack}
                className="flex-1 items-end"
              >
                <Ionicons name="close" size={30} color="grey" />
              </TouchableOpacity>
            </View>


            <Text className="text-lg mt-4">
              Request from <Text className="italic">{name}</Text>:
            </Text>

            <View className="flex-row mt-8">
              <Text className='text-lg font-bold flex-1'>Total</Text>
              <Text className="text-lg font-bold">
                <Currency quantity={Number(amount)} currency="USD"/> USD
              </Text>
            </View>

            {/* Preferred Method of Payment */}

            <View className='flex-1'></View>
            {/* Cards
              <UserCard />
              <ScrollView>
                <CardsColumn />
                <Text>{name}, {amount}, {message}</Text>
              </ScrollView> */}

            {/* Bottom Portion */}
            <TouchableOpacity
              onPress={() => navigation.navigate("RequestConfirmation", {name, amount, message})}
              className="bg-blue-900 rounded-full py-3 px-14 items-center"
            >
              <Text className="text-white text-xl font-extrabold">Request</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

export default SendReviewScreen;
