import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Ionicons, FontAwesome5, MaterialCommunityIcons,Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Currency from 'react-currency-formatter'
import { useSelector } from "react-redux";
import { selectSelf } from "../features/selfSlice";

const PaymentMethodCard = ({cardID, cardName, cardType, cardNumber}) => {

    // More efficient way of only selecting the balance?
    const self = useSelector(selectSelf)

    const [isPressed, setIsPressed] = useState(() => {
        if (cardType==='Balance') return true;
        return false;
    });

    return (
      <TouchableOpacity 
      onPress={() => setIsPressed(!isPressed)}
      className="py-4 pl-4 rounded-lg flex-row space-x-4 border-b border-gray-200 shadow-xl">
        <View className='shadow'>
            {cardType==='Balance' ? <MaterialCommunityIcons name="gold" size={48} color="#D4AF37"/> : <Ionicons name="card-outline" size={48} color="#0ABAB5" />}
        </View>
        <View className="flex-col space-y-2 flex-1">
          {/* Row of Title + Transaction amount*/}
          <View className="flex-row">
            <View className="flex-1">
              <Text className="text-lg font-medium">{cardName}</Text>
            </View>
          </View>

          {cardType==='Balance' && <Text className='font-medium text-gray-500'>Balance: <Currency quantity={Number(self.balance)} currency="USD"/></Text>}
          
          {cardType!='Balance' && <Text className="font-medium text-gray-500">{cardType} ••••{cardNumber}</Text>}
        </View>

        <View className='w-8'>
            {isPressed && (
                <View>
                    <Ionicons name='checkmark-sharp' size={30} color='green'/>
                </View>
            )}
        </View>
      </TouchableOpacity>
    );
  };

export default PaymentMethodCard;
