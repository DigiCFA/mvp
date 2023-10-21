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
import React, { useEffect } from "react";

import { useCardAnimation } from "@react-navigation/stack";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Currency from "react-currency-formatter";
import PaymentMethodCard from "../../components/cards/PaymentMethodCard";

import { useCreateDirectTransactionMutation } from "../../redux/api/apiProfileSlice";
import { useGetSessionQuery } from "../../redux/api/apiAuthSlice";

const SendReviewScreen = () => {
  const { height } = useWindowDimensions();
  const { current } = useCardAnimation();
  const navigation = useNavigation();

  const {data: session, isLoading: sessionIsLoading, 
    isSuccess: sessionIsSuccess, isError: sessionIsError} = useGetSessionQuery()

  const [createDirectTransaction, {data: transaciton, isLoading: transactionIsLoading,
    isSuccess: transactionIsSuccess, isError: transactionIsError}] = useCreateDirectTransactionMutation()

  const sender = session.userId

  const {
    params: {
      receiverId,
      name,
      amount,
      message,
      cardID,
      cardName,
      cardType,
      cardNumber,
      balance,
    },
  } = useRoute();

  const paymentMethod =
    cardType.toLowerCase() === "balance"
      ? "balance"
      : cardType.charAt(0).toUpperCase() +
        cardType.slice(1) +
        " " +
        cardNumber.slice(-4);

  onPressCreateTransaction = async () => {
    navigation.navigate("SendConfirmation", {
      name,
      amount,
      message,
    });
    try {
      const isPayment = true, isApproved = true
      await createDirectTransaction({amountTransferred: amount, sender, receiver: receiverId, paymentMethod, isPayment, isApproved, message}).unwrap()
    } catch (error) {
      console.log(error)
    }
  }

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
                outputRange: [height, height * 0.5],
                extrapolate: "clamp",
              }),
            },
          ],
        }}
      >
        <View className="flex-1 p-4 bg-white rounded-3xl">
          <View className="flex-col h-[45%]">
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

            <PaymentMethodCard
              cardID={cardID}
              cardName={cardName}
              cardType={cardType}
              cardNumber={cardNumber}
              balance={balance}
              balanceSufficient={true}
            />

            <Text className="text-lg mt-4">
              <Text className="font-bold">
                Send <Text className="italic">{name}</Text>:{" "}
              </Text>
              "{message}"
            </Text>

            <View className="flex-row mt-8">
              <Text className="text-lg font-bold flex-1">Total</Text>
              <Text className="text-lg font-bold">
                <Currency quantity={Number(amount)} currency="USD" /> USD
              </Text>
            </View>

            {/* Preferred Method of Payment */}

            <View className="flex-1"></View>
            {/* Cards
              <UserCard />
              <ScrollView>
                <CardsColumn />
                <Text>{name}, {amount}, {message}</Text>
              </ScrollView> */}

            {/* Bottom Portion */}
            <TouchableOpacity
              onPress={onPressCreateTransaction}
              className="bg-blue-900 rounded-full py-3 px-14 items-center"
            >
              <Text className="text-white text-xl font-extrabold">Send</Text>
              {/* <Text>{senderId} + {receiverId}</Text> */}
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

export default SendReviewScreen;
