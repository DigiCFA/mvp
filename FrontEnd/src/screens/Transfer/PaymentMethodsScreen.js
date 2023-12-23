import {
  View,
  Text,
  useWindowDimensions,
  Pressable,
  StyleSheet,
  Animated,
  TouchableOpacity,
  ScrollView
} from "react-native";
import React, { useState, useTransition } from "react";

import { useCardAnimation } from "@react-navigation/stack";
import { useNavigation, useRoute, useTheme } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import CardsColumn from "../../components/CardsColumn";
import { useSelector } from "react-redux";
import { selectCardsFromUser, selectBalanceFromUser} from "../../redux/api/apiProfileSlice";
import { useGetSessionQuery } from "../../redux/api/apiAuthSlice";
import { useTranslation } from "react-i18next";
import { dinero, toSnapshot ,lessThan} from 'dinero.js';
import { USD } from '@dinero.js/currencies';

const PaymentMethodsScreen = () => {

  const { t } = useTranslation();
  
  const {data: session} = useGetSessionQuery()

  const defaultBalance = useSelector(selectBalanceFromUser(session.userId))
  const defaultPayment = {
    cardName: "DigiCFA Balance",
    cardType: "balance",
    cardNumber: "N/A",
    balance: defaultBalance,
  }


  const [selectedCard, setSelectedCard] = useState(defaultPayment);

  const cardID = selectedCard.cardID;
  const cardName = selectedCard.cardName;
  const cardType = selectedCard.cardType;
  const cardNumber = selectedCard.cardNumber;
  const balance = selectedCard.balance;

  const [balanceSufficient, setBalanceSufficient] = useState(true);

  const sendSelectedCard = (card) => {
    setSelectedCard(card);
  };

  const { height } = useWindowDimensions();
  const { current } = useCardAnimation();
  const navigation = useNavigation();

  const {
    params: { receiverId, name, amount, message },
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

              <Text className="text-lg font-semibold">{t('choosePayment')}</Text>

              <View className="flex-1"></View>
            </View>

            {/* Cards */}
            <ScrollView>
              <CardsColumn
                sendSelectedCard={sendSelectedCard}
                balanceSufficient={balanceSufficient}
              />
              {/* <Text>{receiverId}, {name}, {amount}, {message}</Text> */}
              {/* <Text>
                {selectedCard.cardID}, {selectedCard.cardName},{" "}
                {selectedCard.cardNumber}
              </Text> */}
            </ScrollView>

            {/* Bottom Portion */}
            <View>
              <View className="mb-1">
                {!balanceSufficient && (
                  <Text className="font-semibold text-base text-red-600 text-center">
                    {t('insufficientBalance')}
                  </Text>
                )}
              </View>

              <TouchableOpacity
                onPress={() => {

                  console.log(balance);
                  if (balance && lessThan(dinero(balance),dinero(amount))){
                    setBalanceSufficient(false);
                  } else {
                    navigation.goBack();
                    navigation.navigate("SendReview", {
                      receiverId,
                      name,
                      amount:toSnapshot(dinero(amount)),
                      message,
                      cardID,
                      cardName,
                      cardType,
                      cardNumber,
                      balance:toSnapshot(dinero(balance)),
                    });
                  }
                }}
                className="bg-blue-900 rounded-full py-3 px-14 items-center"
              >
                <Text className="text-white text-xl font-extrabold">{t('send')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

export default PaymentMethodsScreen;
