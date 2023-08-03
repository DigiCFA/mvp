import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import PaymentMethodCard from "./PaymentMethodCard";
import { selectBalance, selectCards } from "../features/selfSlice";
import { useSelector } from "react-redux";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import Currency from "react-currency-formatter";

const CardsColumn = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const cards = useSelector(selectCards);
  const balance = useSelector(selectBalance);

  // Fetching the top cards
  // useEffect(() => {

  // })
  return (
    <View>
      <TouchableOpacity
        onPress={() => setActiveIndex(0)}
        className="py-4 pl-4 rounded-lg flex-row space-x-4 border-b border-gray-200 shadow-xl"
      >
        <View className="shadow">
          <MaterialCommunityIcons name="gold" size={48} color="#D4AF37" />
        </View>
        <View className="flex-col space-y-2 flex-1">
          {/* Row of Title + Transaction amount*/}
          <View className="flex-row">
            <View className="flex-1">
              <Text className="text-lg font-medium">DigiCFA Balance</Text>
            </View>
          </View>

          <Text className="font-medium text-gray-500">
            Balance: <Currency quantity={Number(balance)} currency="USD" />
          </Text>
        </View>

        <View className="w-8">
          {activeIndex === 0 && (
            <View>
              <Ionicons name="checkmark-sharp" size={30} color="green" />
            </View>
          )}
        </View>
      </TouchableOpacity>

      {cards?.map((card, index) => (
        <PaymentMethodCard
          cardID={card._id}
          cardName={card.name}
          cardNumber={card.cardNumber}
          cardType={card.cardType}
          isActive={activeIndex === (index+1)}
          onPress={() => setActiveIndex(index+1)}
        />
      ))}

      {/* <UserCard cardID={0} cardName={"Edmond Wang"} phoneNumber={"213 214 0824"} />
      <UserCard cardID={0} cardName={"Henry Liu"} phoneNumber={"949 307 3594‬"} />
      <UserCard cardID={0} cardName={"Daniel Bai"} phoneNumber={"unknown"} /> */}
    </View>
  );
};

export default CardsColumn;
