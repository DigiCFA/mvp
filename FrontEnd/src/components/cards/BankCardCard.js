import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";

import mastercard from "../../../assets/cards/mastercard.png";
import { useNavigation } from "@react-navigation/native";

const BankCardCard = ({
  name,
  index,
  accountHolder,
  cardNumber,
  cardType,
  expDate,
  cvv,
}) => {
  const navigation = useNavigation();

  return (
    cardType !== "balance" && (
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate("CardDetails", { index })}
          className="bg-white h-60 rounded-2xl mt-4"
        >
          <View className="flex-col flex-1 px-4 pt-6 pb-2">
            {/* Top Portion */}
            <View className="flex-row space-x-4 flex-1">
              {/* <FontAwesome name="paypal" size={30} color="#192C88" /> */}
              <Text className="pt-2 flex-1 text-lg font-semibold">{name}</Text>
              <Text className="pt-2 text-lg font-semibold">
                {cardType.charAt(0).toUpperCase() + cardType.slice(1)}
              </Text>
            </View>

            <Text className="text-3xl font-semibold pl-4 tracking-[-2px]">
              {cardNumber}
            </Text>
            <View className="flex-row pt-2 pl-4">
              <Text className="font-semibold self-end flex-1">CVV: {cvv}</Text>
              <Text className="text-[10px] font-semibold self-end">
                VALID{"\n"}THRU{" "}
              </Text>
              <Text className="text-lg font-semibold self-end pl-1">
                {expDate.substring(5, 7)}/{expDate.substring(2, 4)}
              </Text>
              <View className="flex-1"></View>
            </View>
            <View className="pt-2 flex-row ">
              <Text className="text-xl flex-1 self-end">
                {accountHolder.toUpperCase()}
              </Text>
              <Image source={mastercard} className="w-[80] h-[50]" />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    )
  );
};

export default BankCardCard;
