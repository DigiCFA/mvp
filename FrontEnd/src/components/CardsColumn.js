import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import PaymentMethodCard from "./cards/PaymentMethodCard";
import { selectBalance, selectCards } from "../features/selfSlice";
import { useSelector } from "react-redux";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import Currency from "react-currency-formatter";

const CardsColumn = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  let cards = useSelector(selectCards);

  return (
    <View>
      {cards?.map((card, index) => (
        <PaymentMethodCard
          key={card._id}
          cardID={card._id}
          cardName={card.name}
          cardNumber={card.cardNumber}
          cardType={card.cardType}
          balance={card.balance} // only for DigiCFA balance
          isActive={activeIndex === index}
          onPress={() => {
            setActiveIndex(index);
            props.sendSelectedCard({
              cardID: card._id,
              cardName: card.name,
              cardType: card.cardType,
              cardNumber: card.cardNumber,
              balance: card.balance,
            });
          }}
        />
      ))}
    </View>
  );
};

export default CardsColumn;
