import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { selectCards } from "../../features/selfSlice";
import Currency from "react-currency-formatter";
import { FontAwesome } from "@expo/vector-icons";
import CardCard from "../../components/CardCard";

const WalletScreen = () => {
  const cards = useSelector(selectCards);

  return (
    <SafeAreaView>
      <View className="flex-row p-4">
        <TouchableOpacity className="bg-white py-2 px-4 rounded-full">
          <Text className="text-lg font-extrabold text-[#192C88]">Wallet</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="grow">
        <View className="p-4 shadow">
          <TouchableOpacity className="bg-white h-60 rounded-2xl">
            <View className="flex-col flex-1">
              <View className="flex-row p-4 space-x-4 flex-1">
                <FontAwesome name="paypal" size={30} color="#192C88" />
                <Text className="pt-2 flex-1 font-semibold">
                  DigiCFA balance
                </Text>
                <Text className="pt-2 font-semibold">
                  <Currency quantity={Number(0.0)} currency="USD" />
                </Text>
              </View>
              <Text className="px-4 text-5xl font-bold">
                <Currency quantity={Number(0.0)} currency="USD" />
              </Text>
              <View className="flex-1"></View>
            </View>
          </TouchableOpacity>

          {cards?.map((card) => (
            <CardCard
              key={card._id}
              name={card.name}
              accountHolder={card.accountHolder}
              cardNumber={card.cardNumber}
              cardType={card.cardType}
              expDate={card.expDate}
              cvv={card.cvv}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WalletScreen;
