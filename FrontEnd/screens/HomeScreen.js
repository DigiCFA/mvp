import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Touchable,
  ScrollView,
} from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import SearchScreen from "./SearchScreen";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import TransactionsColumn from "../components/TransactionsColumn";

const HomeScreen = () => {
  const navigation = useNavigation();

  // Fetching Past Transactions

  // useEffect(() => {

  // }, [])

  return (
    <SafeAreaView className="bg-[#e9e7e2]">
      <ScrollView>
        {/* Header */}
        <View className="flex-row px-4 pb-6 space-x-3">
          <View className="flex-1">
            {/* <TouchableOpacity className="p-1 rounded-full bg-white w-8">
              <Ionicons name="menu" size={24} color="#192C88" />
            </TouchableOpacity> */}
          </View>

          {/* <TouchableOpacity className="p-1.5 rounded-full bg-white">
            <Ionicons name="trophy" size={20} color="#192C88" />
          </TouchableOpacity> */}

          <TouchableOpacity 
          onPress={() => navigation.navigate("Scan")}
          className="p-1.5 rounded-full bg-white">
            <Ionicons name="qr-code" size={40} color="#192C88" />
          </TouchableOpacity>

          {/* <TouchableOpacity className="p-1.5 rounded-full bg-white">
            <Ionicons name="person" size={20} color="#192C88" />
          </TouchableOpacity> */}
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
        <View className="bg-white mt-2 py-6 px-4">
          <Text className="text-xl text-gray-800">Recent activity</Text>

          <TransactionsColumn />

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

export default HomeScreen;
