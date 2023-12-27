import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import Currency from "react-currency-formatter";
import { onChange } from "react-native-reanimated";
import { intlFormat, converter } from "../../utils/currencyFormatter";
import { dinero, toSnapshot } from "dinero.js";
import { USD, XAF } from "@dinero.js/currencies";
import { useTranslation } from "react-i18next";
import CompatibleSafeAreaView from "../../components/CompatibleSafeAreaView";

const numericRE = new RegExp("^[0-9]*$");
const startsWithTwoDigits = new RegExp("^[0-9]{2}");

const countFractional = (value) => {
  if (Math.floor(value) === value) return 0;
  return value.toString().split(".")[1].length || 0;
};

const countWhole = (value) => {
  return value.toString().split(".")[0].length || 0;
};

const amountInvalid = (amount) =>
  countWhole(Number(amount)) > 6 ||
  !amount.match(numericRE) ||
  amount.match(/^\./) ||
  (amount[0] == "0" && amount.match(startsWithTwoDigits)) ||
  (amount.match(/\./g) || []).length > 1 ||
  countFractional(Number(amount)) > 2;

const UserScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const [amountInputWidth, setAmountInputWidth] = useState(0)

  const [amount, setAmount] = useState("0");
  const [zeroPrefix, setZeroPrefix] = useState(1);
  const [message, onChangeMessage] = useState("");

  const [amountValid, setAmountValid] = useState(false);
  const [messageValid, setMessageValid] = useState(false);

  const [displayError, setDisplayError] = useState(false);

  const {
    params: { id, name },
  } = useRoute();

  const onChangeAmount = (e) => {
    const key = e.nativeEvent.key 
    let actualAmount = amount.slice(zeroPrefix)  
    if(key >= '0' && key <= '9' && amount.length < 6){
      actualAmount += key
      setAmount("0".slice(Math.min(actualAmount.length, 1)) + actualAmount)
      setZeroPrefix(Math.max(1 - actualAmount.length, 0))
    }
    else if (key === 'Backspace'){
      const afterDelLength = Math.max(0, actualAmount.length - 1)
      const afterDelAmount = actualAmount.slice(0, actualAmount.length-1)
      setAmount("0".slice(Math.min(afterDelLength, 1)) + afterDelAmount)
      setZeroPrefix(Math.max(1 - afterDelLength, 0))
    }
  }

  useEffect(() => {
    setAmountValid(Number(amount) != 0)
  }, [amount])

  const handleAmountDisplayLayout = (e) => {
    const width = e.nativeEvent.layout.width
    setAmountInputWidth(width)
  }

  return (
    <CompatibleSafeAreaView componentStyle="flex-col flex-1">
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
          <Text
            className={`text-5xl ${
              (!amountValid && displayError) ? "text-red-600" : "text-black"
            }`}>
              CFA
          </Text>

          <View className="flex-row">
            <View style={{width: amountInputWidth}} className="z-10">
              <TextInput
                keyboardType="numeric"
                maxLength={6}
                contextMenuHidden={true}
                className={`font-medium opacity-0 z-10 w-full`}
                style={{fontSize: 60}}
                selection={{start: amount.length, end: amount.length}}
                onKeyPress={onChangeAmount}
              />
            </View>
            <Text style={{fontSize: 60}} onLayout={handleAmountDisplayLayout}
              className={`font-medium text-black absolute h-full z-0  ${
              (!amountValid && displayError) ? "text-red-600" : "text-black"}`}>
              {amount}
            </Text>
          </View>
        </View>

        <View className="h-8">
          {(!amountValid && displayError) && (
            <View className="self-center flex-row space-x-2">
              <FontAwesome5 name="exclamation" size={20} color="red" />
              <Text className="font-medium text-base text-red-600">
                {t("amountError")}
              </Text>
            </View>
          )}
        </View>

        <View className="self-center bg-[#e9e7e2] rounded-lg">
          <Text className="text-lg px-1">XAF</Text>
        </View>
      </View>

      {/* Comments + Request + Pay */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View className="mt-auto">
          {/* Comments associated with the transaction */}
          <TextInput
            placeholder={t("message")}
            keyboardType="default"
            placeholderTextColor={(!messageValid && displayError) ? "#dc2626" : "gray"}
            multiline={true}
            onChangeText={(newMessage) => {
              setMessageValid(newMessage.trim() != "")
              onChangeMessage(newMessage);
            }}
            value={message}
            className={`text-base font-medium mx-4 p-3 bg-[#e9e7e2] rounded-xl  ${
              (!messageValid && displayError) ? "border border-red-600" : "border border-[#e9e7e2]" 
            }`}
          />

          <View className="mt-1 h-8">
            {(!messageValid && displayError) && (
              <View className="self-center flex-row space-x-2">
                <Text className="font-medium text-base text-red-600">
                  {t("messageError")}
                </Text>
              </View>
            )}
          </View>

          <View className="flex-row mb-4 space-x-4 justify-center">
            {/* Request */}
            {/* <TouchableOpacity
              onPress={() => {
                setDisplayError(true);
                if (Number(amount) != 0 && message.trim() != "") {
                  navigation.navigate("RequestReview", {
                    id,
                    name,
                    amount: toSnapshot(
                      dinero({ amount: Number(amount), currency: XAF })
                    ),
                    message,
                  });
                }
              }}
              className="bg-blueDark rounded-full py-3 px-8"
            > */}
            <TouchableOpacity className="bg-blueDark rounded-full py-3 px-8">
              <Text className="text-white text-xl font-extrabold">
                {t("request")}
              </Text>
            </TouchableOpacity>

            {/* Pay */}
            <TouchableOpacity
              onPress={() => {
                setDisplayError(true)
                if (Number(amount) != 0 && message.trim() != "") {
                  navigation.navigate("PaymentMethods", {
                    receiverId: id,
                    name,
                    amount: toSnapshot(
                      dinero({ amount: Number(amount), currency: XAF })
                    ),
                    message,
                  });
                }
              }}
              className="bg-blue-900 rounded-full py-3 px-14"
            >
              <Text className="text-white text-xl font-extrabold">
                {t("pay")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </CompatibleSafeAreaView>
  );
};

export default UserScreen;
