import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons"

const CardCard = ({
    name,
    accountHolder,
    cardNumber,
    cardType,
    expDate,
    cvv,
}) => {


  return (
    <View>
      <TouchableOpacity className="bg-white h-60 rounded-2xl mt-4">
        <View className="flex-col flex-1 px-8 pt-6 pb-2">

          {/* Top Portion */}
          <View className="flex-row space-x-4 flex-1">
            <FontAwesome name="paypal" size={30} color="#192C88" />
            <Text className="pt-2 flex-1 font-semibold">{name}</Text>
            <Text className="pt-2 font-semibold">
              {cardType.charAt(0).toUpperCase() + cardType.slice(1)}
            </Text>
          </View>
          
          <Text className="text-3xl font-bold">{cardNumber}</Text>
          <View className='flex-row'>
            <Text className='font-semibold'>CVV: {cvv}</Text>
            <Text className='pl-28 text-lg'>EXP: {expDate.substring(5, 7)}/{expDate.substring(2,4)}</Text>
          </View>
          <View className="pt-2 flex-row">
            <Text className='text-lg'>{accountHolder.toUpperCase()}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CardCard;
