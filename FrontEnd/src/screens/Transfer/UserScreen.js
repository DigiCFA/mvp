import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import Currency from "react-currency-formatter";
import { onChange } from "react-native-reanimated";

const numericRE = new RegExp("^[0-9.]*$");
const startsWithTwoDigits = new RegExp("^[0-9]{2}.");

const countDecimals = (value) => {
  if (Math.floor(value) === value) return 0;
  return value.toString().split(".")[1].length || 0;
};

const amountInvalid = (amount) =>
  !amount.match(numericRE) ||
  amount.match(/^\./) ||
  (amount[0] == "0" && amount.match(startsWithTwoDigits)) ||
  (amount.match(/\./g) || []).length > 1 ||
  countDecimals(Number(amount)) > 2;

const UserScreen = () => {
  const navigation = useNavigation();
  const [amount, onChangeAmount] = useState("0.00");
  const [message, onChangeMessage] = useState("");

  const [amountValid, setAmountValid] = useState(true);
  const [messageValid, setMessageValid] = useState(true);

  const {
    params: { id, name },
  } = useRoute();

  return (
    <SafeAreaView className="flex-col flex-1">
      {/* Upper Portion */}
      <View className="flex-1">
        {/* User Info */}
        <View className="flex-row justify-items-start items-center space-x-2 pt-1 mx-4">
          <TouchableOpacity onPress={navigation.goBack} className="flex-1">
            <Ionicons name="arrow-back" size={30} color="grey" />
          </TouchableOpacity>

          <Text className="text-lg font-semibold">{name}</Text>

          <View className="flex-1"></View>
        </View>

        {/* Payment Amount */}
        <View className="flex-row h-24 mt-6 justify-center">
          <View className="self-start">
            <Text
              className={`text-5xl ${
                amountValid ? "text-black" : "text-red-600"
              }`}
            >
              $
            </Text>
          </View>

          <TextInput
            // inputMode="numeric"
            keyboardType="numeric"
            maxLength={8}
            placeholder="0.00"
            contextMenuHidden={true}
            onChangeText={(newAmount) => {
              if (Number(newAmount) != 0) setAmountValid(true);

              if (!amountInvalid(newAmount)) onChangeAmount(newAmount);
            }}
            onEndEditing={() => {
              onChangeAmount(Number(amount).toFixed(2).toString());
            }}
            value={amount}
            className={`text-7xl font-medium flex-1 ${
              amountValid ? "text-black" : "text-red-600"
            }`}
          />
        </View>

        <View className="h-8">
          {!amountValid && (
            <View className="self-center flex-row space-x-2">
              <FontAwesome5 name="exclamation" size={20} color="red" />
              <Text className="font-medium text-base text-red-600">
                Enter an amount more than $0
              </Text>
            </View>
          )}
        </View>

        <View className="self-center bg-[#e9e7e2] rounded-lg">
          <Text className="text-lg px-1">USD</Text>
        </View>
      </View>

      {/* Comments + Request + Pay */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View className="mt-auto">
          {/* Comments associated with the transaction */}
          <TextInput
            placeholder="What's this for?"
            keyboardType="default"
            placeholderTextColor={messageValid ? "gray" : "#dc2626"}
            multiline={true}
            onChangeText={(newMessage) => {
              if (newMessage.trim() != "") setMessageValid(true);
              onChangeMessage(newMessage);
            }}
            value={message}
            className={`text-base font-medium mx-4 p-3 bg-[#e9e7e2] rounded-xl  ${
              messageValid ? "border border-[#e9e7e2]" : "border border-red-600"
            }`}
          />

          <View className="mt-1 h-8">
            {!messageValid && (
              <View className="self-center flex-row space-x-2">
                <Text className="font-medium text-base text-red-600">
                  Please write a message. Ex: dinner, fruits.
                </Text>
              </View>
            )}
          </View>

          <View className="flex-row mb-4 space-x-4 justify-center">
            {/* Request */}
            <TouchableOpacity
              onPress={() => {
                if (Number(amount) == 0) {
                  setAmountValid(false);
                }
                if (message.trim() == "") {
                  setMessageValid(false);
                }
                if (Number(amount) != 0 && message.trim() != "") {
                  navigation.navigate("RequestReview", {
                    id,
                    name,
                    amount,
                    message,
                  });
                }
              }}
              className="bg-blueDark rounded-full py-3 px-8"
            >
              <Text className="text-white text-xl font-extrabold">Request</Text>
            </TouchableOpacity>

            {/* Pay */}
            <TouchableOpacity
              onPress={() => {
                if (Number(amount) == 0) {
                  setAmountValid(false);
                }
                if (message.trim() == "") {
                  setMessageValid(false);
                }
                if (Number(amount) != 0 && message.trim() != "") {
                  navigation.navigate("PaymentMethods", {
                    receiverId: id,
                    name,
                    amount,
                    message,
                  });
                }
              }}
              className="bg-blue-900 rounded-full py-3 px-14"
            >
              <Text className="text-white text-xl font-extrabold">Pay</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default UserScreen;
