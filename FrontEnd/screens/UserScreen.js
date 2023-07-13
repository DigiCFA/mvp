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

  const [paymentAmount, onChangeAmount] = useState("0.00");
  const [message, onChangeMessage] = useState("");

  const {
    params: { id, name, phoneNumber },
  } = useRoute();

  return (
    <SafeAreaView className="flex-col">
      {/* Upper Portion */}

      {/* User Info */}
      <View className="border flex-row justify-items-start items-center space-x-2 pt-1 mx-4">
        <TouchableOpacity onPress={navigation.goBack} className="flex-1">
          <Ionicons name="arrow-back" size={30} color="grey" />
        </TouchableOpacity>

        <Text className="text-lg font-semibold">{name}</Text>

        <View className='flex-1'></View>

        {/* <TouchableOpacity
          onPress={() => navigation.navigate("HomeScreen")}
          className=""
        >
          <Ionicons name="close" size={30} color="grey" />
        </TouchableOpacity> */}
      </View>



      {/* Payment Amount */}
      <View className="flex-row h-20 mt-6 justify-center items-end border">

        <View className='self-start'>
          <Text className="text-5xl">$</Text>
        </View>

        {/* <View className='border'>
          <Text className='text-7xl font-medium '>0.00</Text>
        </View> */}

        <View>
          <TextInput
            // inputMode="numeric"
            keyboardType="numeric"
            maxLength={8}
            placeholder="0.00"
            contextMenuHidden={true}
            onChangeText={(newAmount) => onChangeAmount(newAmount)}
            value={paymentAmount}
            className="text-7xl border pt-8"
          />
        </View>

      </View>

      {/* Comments + Request + Pay */}
      <View className="mt-auto border">
        {/* Comments associated with the transaction */}
        <TextInput
          placeholder="What's this for?"
          placeholderTextColor="gray"
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
