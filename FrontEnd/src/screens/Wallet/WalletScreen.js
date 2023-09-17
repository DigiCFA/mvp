import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { selectBalance, selectCards } from "../../redux/reducers/selfSlice";
import Currency from "react-currency-formatter";
import { FontAwesome, Feather } from "@expo/vector-icons";
import BankCardCard from "../../components/cards/BankCardCard";

const WalletScreen = () => {
  const cards = useSelector(selectCards);
  const balance = useSelector(selectBalance);

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-row p-4 items-center">
        <TouchableOpacity className="bg-white py-2 px-4 rounded-full">
          <Text className="text-lg font-extrabold text-blueDark">Wallet</Text>
        </TouchableOpacity>
        <View className="flex-1"></View>
        <TouchableOpacity>
          <Feather name="plus-circle" size={40} color="#3370E2" />
        </TouchableOpacity>
      </View>

      <ScrollView>
        <View className="p-4 shadow-sm flex-1">
          <View className="bg-white h-60 rounded-2xl">
            <View className="flex-col flex-1">
              <View className="flex-row p-4 space-x-4 flex-1">
                <FontAwesome name="paypal" size={30} color="#192C88" />
                <Text className="pt-2 flex-1 text-lg font-semibold">
                  DigiCFA balance
                </Text>
                <Text className="pt-2 text-lg font-semibold">
                  <Currency quantity={Number(balance)} currency="USD" />
                </Text>
              </View>
              <Text className="px-4 text-5xl font-bold">
                <Currency quantity={Number(balance)} currency="USD" />
              </Text>
              <View className="flex-1"></View>
            </View>
          </View>

          {cards?.map((card, index) => (
            <BankCardCard
              key={card._id}
              index={index}
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
