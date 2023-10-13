import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { selectCards } from "../../redux/api/selfSlice";
import BankCardCard from "../../components/cards/BankCardCard";

const CardDetailsScreen = () => {
  const navigation = useNavigation();

  const {
    params: { index },
  } = useRoute();

  const card = useSelector(selectCards)[index];

  return (
    <SafeAreaView className="bg-[#e9e7e2]">
      {/* Top Bar */}
      <View className="flex-row justify-items-start items-center space-x-2 pt-1 mx-4">
        <TouchableOpacity onPress={navigation.goBack} className="flex-1">
          <Ionicons name="arrow-back" size={30} color="grey" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold">
          {card.cardType.charAt(0).toUpperCase() + card.cardType.slice(1)} ••••
          {card.cardNumber.slice(-4)}
        </Text>

        <View className="flex-1"></View>
      </View>

      <View className="p-4 shadow">
        <BankCardCard
          name={card.name}
          accountHolder={card.accountHolder}
          cardNumber={card.cardNumber}
          cardType={card.cardType}
          expDate={card.expDate}
          cvv={card.cvv}
        />
      </View>

      <View className="bg-white p-4">
        <View className="flex-col">
          <Text className="text-gray-600">Name</Text>
          <Text className="text-black text-lg font-semibold">{card.name}</Text>

          <Text className="text-gray-600 pt-8">Expires on</Text>
          <Text className="text-black text-lg font-semibold">
            {card.expDate.substring(5, 7)}/{card.expDate.substring(2, 4)}
          </Text>

          <Text className="text-gray-600 pt-8">Billing address</Text>
          <Text className="text-black text-lg font-semibold">
            {card.billingAddress}
          </Text>

          <TouchableOpacity className="pt-8 flex-row space-x-2">
            <FontAwesome5 name="pen" size={24} color="#3370E2" />
            <Text className="text-[#3370E2] text-lg font-bold">Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity className="pt-8 flex-row space-x-2">
            <Ionicons name="trash" size={24} color="#3370E2" />
            <Text className="text-[#3370E2] text-lg font-bold">Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CardDetailsScreen;
