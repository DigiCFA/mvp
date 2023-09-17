import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Touchable,
  ScrollView,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import SearchScreen from "../Transfer/SearchScreen";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import TransactionsColumn from "../../components/TransactionsColumn";
import TransactionCard from "../../components/cards/TransactionCard";
import { useSelector } from "react-redux";
import { selectId, selectTransactions } from "../../redux/reducers/selfSlice";

import Spinner from 'react-native-loading-spinner-overlay';

const HomeScreen = () => {
  const navigation = useNavigation();
  const axios = require("axios");

  const [transactionHistory, setTransactionHistory] = useState([]);

  const transactions = useSelector(selectTransactions);
  const id = useSelector(selectId);

  const [spinner, setSpinner] = useState(false);


  // useEffect runs after the render
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setSpinner((prevSpinner) => !prevSpinner);
  //   }, 5000);

  //   return () => {
  //     clearInterval(interval);
  //   }
  // }, [])


  return (
    <SafeAreaView className="bg-beige flex-1">
{/* 
      <Spinner 
        visible={spinner}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      /> */}

      <ScrollView>
        {/* Header */}
        <View className="flex-row px-4 pb-6 space-x-3 self-end">
          <TouchableOpacity
            onPress={() => navigation.navigate("Scan")}
            className="p-1.5 rounded-full bg-white"
          >
            <Ionicons name="qr-code" size={40} color="#192C88" />
          </TouchableOpacity>
        </View>

        {/* Some Notices */}
        <View className="px-4 pb-4 space-y-3">
          {/* Getting rid of this button soon */}
          <TouchableOpacity
            onPress={() => navigation.navigate("Search")}
            className="p-4 bg-white rounded-lg items-center shadow"
          >
            <Text className="text-xl font-bold">TransferScreen (Modal)</Text>
          </TouchableOpacity>

          <TouchableOpacity className="py-3 px-4 bg-white rounded-lg flex-row space-x-4 shadow">
            <Ionicons name="flash" size={40} color="#7152C7" />
            <View>
              <Text className="text-gray-500">
                Pay in 4 prequalified ammount
              </Text>
              <Text className="text-2xl font-semibold">$200</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity className="mr-7 py-3 pl-4 pr-8 bg-white rounded-lg flex-row space-x-4 shadow">
            <FontAwesome name="cc-paypal" size={40} color="#192C88" />
            <View>
              <Text className="text-xl font-semibold">
                Apply for the PayPal Cashback Mastercard
              </Text>
              <Text className="">Terms apply.</Text>
            </View>
            <TouchableOpacity>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>

        {/* Transactions */}
        <View className="bg-white mt-2 py-6 px-4 flex-1">
          <Text className="text-xl text-gray-800">Recent activity</Text>

          {transactions?.map((transaction) => (
            <TransactionCard
              key={transaction._id}
              id={transaction._id}
              userPays={transaction.sender._id === id}
              title={
                transaction.sender._id === id
                  ? transaction.receiver.fullName
                  : transaction.sender.fullName
              }
              date={transaction.transactionDate}
              message={transaction.message}
              paymentMethod={transaction.paymentMethod}
              amount={transaction.amountTransferred}
            />
          ))}

          {/* <TransactionsColumn /> */}

          <TouchableOpacity className="pt-4">
            <Text className="text-center text-lg font-bold text-blue-600">
              Show all
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: 'blue',
    fontSize: 20
  }
})



export default HomeScreen;
