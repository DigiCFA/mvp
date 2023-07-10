import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Currency from "react-currency-formatter";

const UserScreen = () => {
  const navigation = useNavigation();

  const [paymentAmount, onChangeAmount] = useState("0");
  const [message, onChangeMessage] = useState("");

  const {
    params: { id, name, phoneNumber },
  } = useRoute();

  return (
    <SafeAreaView className="flex-col">
      {/* Upper Portion */}
      <View className="">
        {/* User Info */}
        <View className="flex-row items-center space-x-2 pt-2 mx-4">
          <TouchableOpacity onPress={navigation.goBack} className="flex-1">
            <Ionicons name="arrow-back" size={30} color="grey" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("HomeScreen")}
            className=""
          >
            <Ionicons name="close" size={30} color="grey" />
          </TouchableOpacity>
        </View>

        {/* Payment Amount */}
        <View className="flex-col items-center">
          <Ionicons name="person-circle" size={70} color="#192C88" />
          <Text className="text-xl font-bold pt-2">{name}</Text>
          <View className="flex-row mt-6 space-x-2">
            {/* Need to replace with <Currency /> */}
            <Text className="text-2xl">US$</Text>

            <TextInput
              // inputMode="numeric"
              keyboardType="numeric"
              maxLength={8}
              contextMenuHidden={true}
              onChangeText={(newAmount) => onChangeAmount(newAmount)}
              value={paymentAmount}
              className="text-4xl text-black font-bold"
            />
          </View>
        </View>
      </View>

      {/* Comments + Request + Pay */}
      <View className="">
        {/* Comments associated with the transaction */}
        <TextInput
          placeholder="What's this for?"
          placeholderTextColor='gray'
          keyboardType="default"
          multiline={true}
          onChangeText={(newMessage) => onChangeMessage(newMessage)}
          value={message}
          className="text-base font-medium mx-4 p-3 border border-gray-500 rounded-lg"
        />

        {/* Send / Receive */}
        <View className="m-1 flex-row space-x-2 justify-center">
          <TouchableOpacity className="bg-blue-500 rounded-full py-3 px-8">
            <Text className="text-white text-xl font-extrabold">Request</Text>

            
          </TouchableOpacity>
          <TouchableOpacity className="bg-blue-500 rounded-full py-3 px-14">
            <Text className="text-white text-xl font-extrabold">Pay</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Search */}
      {/* <View className="px-4 py-2 rounded-full border-2 border-blue-600 flex-1">
        <TextInput
          placeholder="Phone number, name"
          keyboardType="default"
          className="text-lg font-medium"
        />
      </View> */}

      {/* <TouchableOpacity
        onPress={navigation.goBack}
        className="absolute top-14 left-5 p-2"
      >
        <Ionicons name='chevron-back' size={24} color='black'/>
      </TouchableOpacity> */}
    </SafeAreaView>
  );
};

export default UserScreen;
