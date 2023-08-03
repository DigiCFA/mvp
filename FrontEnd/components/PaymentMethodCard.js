import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Ionicons, FontAwesome5, MaterialCommunityIcons,Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Currency from 'react-currency-formatter'


const PaymentMethodCard = ({cardID, cardName, cardNumber, cardType, isActive, onPress}) => {

    return (
      <TouchableOpacity 
      onPress={onPress}
      className="py-4 pl-4 rounded-lg flex-row space-x-4 border-b border-gray-200 shadow-xl">
        <View className='shadow'>
            <Ionicons name="card-outline" size={48} color="#0ABAB5" />
        </View>
        <View className="flex-col space-y-2 flex-1">
          {/* Row of Title + Transaction amount*/}
          <View className="flex-row">
            <View className="flex-1">
              <Text className="text-lg font-medium">{cardName}</Text>
            </View>
          </View>          
          <Text className="font-medium text-gray-500">{cardType} ••••{cardNumber}</Text>
        </View>

        <View className='w-8'>
            {isActive && (
                <View>
                    <Ionicons name='checkmark-sharp' size={30} color='green'/>
                </View>
            )}
        </View>
      </TouchableOpacity>
    );
  };

export default PaymentMethodCard;
