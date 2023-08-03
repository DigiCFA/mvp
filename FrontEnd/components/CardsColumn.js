import { View, Text } from "react-native";
import React, { useState } from "react";
import PaymentMethodCard from "./PaymentMethodCard";

const CardsColumn = () => {

  const [activeIndex, setActiveIndex] = useState(0);



  // Fetching the top cards
  // useEffect(() => {

  // })
  return (
    <View>
      <PaymentMethodCard cardID={0} cardName={"DigiCFA Balance"} cardType={"Balance"} cardNumber={"N/A"} isActive={activeIndex === 0} onPress={() => setActiveIndex(0)}/>
      <PaymentMethodCard
        cardID={0}
        cardName={"Bank of America Customized Cash Rewards VISA"}
        cardType={"Credit"}
        cardNumber={"6642"}
        isActive={activeIndex===1}
        onPress={() => setActiveIndex(1)}
      />
      {/* <UserCard cardID={0} cardName={"Edmond Wang"} phoneNumber={"213 214 0824"} />
      <UserCard cardID={0} cardName={"Henry Liu"} phoneNumber={"949 307 3594‬"} />
      <UserCard cardID={0} cardName={"Daniel Bai"} phoneNumber={"unknown"} /> */}
    </View>
  );
};

export default CardsColumn;
