import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons"

import mastercard from "../assets/mastercard.png";

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
        <View className="flex-col flex-1 px-4 pt-6 pb-2">

          {/* Top Portion */}
          <View className="flex-row space-x-4 flex-1">
            <FontAwesome name="paypal" size={30} color="#192C88" />
            <Text className="pt-2 flex-1 font-semibold">{name}</Text>
            <Text className="pt-2 font-semibold">
              {cardType.charAt(0).toUpperCase() + cardType.slice(1)}
            </Text>
          </View>
          
          <Text className="text-3xl font-bold pl-4 ">{cardNumber}</Text>
          <View className='flex-row pt-2 pl-4'>
            <Text className='font-semibold self-end flex-1'>CVV: {cvv}</Text>
            <Text className='text-[10px] self-end'>VALID{'\n'}THRU </Text>
            <Text className='text-xl self-end'>{expDate.substring(5, 7)}/{expDate.substring(2,4)}</Text>
            <View className='flex-1'></View>
          </View>
          <View className="pt-2 flex-row ">
            <Text className='text-xl flex-1 self-end'>{accountHolder.toUpperCase()}</Text>
            <Image source={mastercard} className='w-[80] h-[50]'/>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CardCard;
