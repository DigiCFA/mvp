import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import Currency from "react-currency-formatter";
import { useNavigation } from "@react-navigation/native";

const TransactionCard = ({
  id,
  isPaying,
  title,
  date,
  description,
  amount,
}) => {

  const navigation = useNavigation();

  return (
    <TouchableOpacity 
    onPress={() => {navigation.navigate("Transaction", { isPaying, title,  date, description, amount })}}
    className="my-2 p-4 bg-white rounded-lg flex-row space-x-4 shadow">
      <View className='h-12 p-2 bg-[#192C88] border rounded-full'>
        <FontAwesome5 name="store-alt" size={24} color="white" />
      </View>
      <View className="flex-col space-y-2 flex-1">
        {/* Row of Title + Transaction amount*/}
        <View className="flex-row">
          <View className="flex-1">
            <Text className="text-xl font-medium">{title}</Text>
          </View>
          <Text className={`text-xl font-medium ${isPaying ? 'text-black' : 'text-green-800'}`}>
            {isPaying ? "-" : "+"}
            <Currency quantity={Number(amount)} currency="USD" />
          </Text>
        </View>
        
        <Text className="font-medium">{date}</Text>
        <Text className="font-medium">{description}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default TransactionCard;
