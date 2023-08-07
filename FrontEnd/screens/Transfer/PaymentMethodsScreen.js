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
import React, { useState } from "react";

import { useCardAnimation } from "@react-navigation/stack";
import { useNavigation, useRoute, useTheme } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import CardsColumn from "../../components/CardsColumn";
import { useSelector } from "react-redux";
import { selectCards } from "../../features/selfSlice";

const PaymentMethodsScreen = () => {

  // Need to update this Screen on which card we ended up choosing!!


  const [selectedCard, setSelectedCard] = useState({
    cardID: '0',
    cardName: 'DigiCFA Balance',
    cardType: 'Balance',
    cardNumber: 'N/A'
  })

  const cardID = selectedCard.cardID;
  const cardName = selectedCard.cardName;
  const cardType = selectedCard.cardType;
  const cardNumber = selectedCard.cardNumber;

  const sendSelectedCard = (card) => {
    setSelectedCard(card)
  }

  const { height } = useWindowDimensions();
  const { current } = useCardAnimation();
  const navigation = useNavigation();

  const {
    params: { receiverID, name, amount, message },
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
              <CardsColumn sendSelectedCard={sendSelectedCard}/>
              <Text>{receiverID}, {name}, {amount}, {message}</Text>
              <Text>{selectedCard.cardID}, {selectedCard.cardName}, {selectedCard.cardNumber}</Text>
            </ScrollView>

            {/* Bottom Portion */}
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
                navigation.navigate("SendReview", {
                receiverID, name, amount, message, cardID, cardName, cardType,cardNumber
              })}}
              className="bg-blue-900 rounded-full py-3 px-14 items-center"
            >
              <Text className="text-white text-xl font-extrabold">Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

export default PaymentMethodsScreen;
