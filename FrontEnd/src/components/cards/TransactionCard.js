import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import Currency from "react-currency-formatter";
import { useNavigation } from "@react-navigation/native";
import { intlFormat } from "../../utils/currencyFormatter";
import { dinero, toSnapshot } from 'dinero.js';
import { USD } from '@dinero.js/currencies';

const TransactionCard = ({
  id,
  userPays,
  title,
  date,
  message,
  paymentMethod,
  amount,
}) => {

  const toMonth = (number) => {
    switch(number) {
      case 1: return "Jan";
      case 2: return "Feb";
      case 3: return "Mar";
      case 4: return "Apr";
      case 5: return "May";
      case 6: return "Jun";
      case 7: return "Jul";    
      case 8: return "Aug";
      case 9: return "Sep";
      case 10: return "Oct";
      case 11: return "Nov";
      case 12: return "Dec";
      default:
        return "ERROR";
    }
  }
  const navigation = useNavigation();

  const displayDate = toMonth(Number(date.substring(5, 7))) + ' ' + date.substring(8, 10);
  const fullDate = displayDate + ', ' + date.substring(0, 4);

  return (
    <TouchableOpacity 
    onPress={() => {navigation.navigate("Transaction", { id, userPays, title,  fullDate, message, paymentMethod, amount })}}
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
          <Text className={`text-xl font-medium ${userPays ? 'text-black' : 'text-green-800'}`}>
            {userPays ? "-" : "+"} 
            {intlFormat(dinero(amount))} CFA
            {/* CFA {amount} */}
          </Text>
        </View>
        
        <Text className="font-medium">{displayDate}</Text>
        <Text className="font-medium">{message}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default TransactionCard;
