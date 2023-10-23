import { View } from "react-native";
import React, { useState } from "react";
import PaymentMethodCard from "./cards/PaymentMethodCard";
import { useGetSessionQuery } from "../redux/api/apiAuthSlice";
import { selectCardsFromUser, selectBalanceFromUser} from "../redux/api/apiProfileSlice";
import { useSelector } from "react-redux";

const CardsColumn = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const {data: session, isLoading} = useGetSessionQuery()
  const cards = useSelector(selectCardsFromUser(session.userId))

  const defaultBalance = useSelector(selectBalanceFromUser(session.userId))
  const defaultPayment = {
    cardName: "DigiCFA Balance",
    cardType: "balance",
    cardNumber: "N/A",
    balance: defaultBalance,
  }


  return (
    <View>
      {[defaultPayment, ...cards]?.map((card, index) => (
        <PaymentMethodCard
          key={card._id}
          cardID={card._id}
          cardName={card.name}
          cardNumber={card.cardNumber}
          cardType={card.cardType}
          balance={card.balance} // only for DigiCFA balance
          balanceSufficient={props.balanceSufficient}
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
