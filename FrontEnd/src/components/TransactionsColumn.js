import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

import React from "react";
import TransactionCard from "./cards/TransactionCard";

const TransactionsColumn = () => {
  // Fetching the transactions from the backend
  // useEffect(() => {

  // })

  return (
    <View>
      <TransactionCard
        id={0}
        isPayment={true}
        title={"Apple Services"}
        date={"2022-06-21T01:09:59.848Z"}
        message={"Automatic Payment"}
        amount={2.99}
      />
      <TransactionCard
        id={1}
        isPayment={true}
        title={"Apple Services"}
        date={"2022-05-21T01:09:59.848Z"}
        message={"Automatic Payment"}
        amount={2.99}
      />
      <TransactionCard
        id={2}
        isPayment={true}
        title={"Apple Services"}
        date={"2022-04-21T01:09:59.848Z"}
        message={"Automatic Payment"}
        amount={2.99}
      />
      <TransactionCard
        id={3}
        isPayment={false}
        title={"cleverbridge Inc."}
        date={"2022-01-12T01:09:59.848Z"}
        message={"Refund"}
        amount={53.28}
      />
    </View>

    //     id, payee,date, title,amount
  );
};

export default TransactionsColumn;
