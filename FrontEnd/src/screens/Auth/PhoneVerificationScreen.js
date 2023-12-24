import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import VerificationCodeInput from "../../components/VerificationCodeInput";

import HideKeyboardView from "../../components/HideKeyboardView";
import { useSelector } from "react-redux";
import { selectFieldWithAttr } from "../../redux/client/signUpSlice";
import { useTranslation } from "react-i18next";

const PhoneVerificationScreen = () => {

  const { t } = useTranslation();

  const phoneNumber = useSelector(selectFieldWithAttr("phoneNumber"));
  const navigation = useNavigation();
  
  const onVerificationCodeReady = (verificationCode) => {
    navigation.navigate("Password");
  };
  
  return (
    <HideKeyboardView>
      <SafeAreaView className="flex-1 bg-white">
        <View className="mx-3 my-4 w-6">
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Ionicons name="arrow-back-outline" size={30} color="gray" />
          </TouchableOpacity>
        </View>

        <View className="mx-3 space-y-1">
          <Text style={{ fontSize: 27 }} className="font-semibold">
            {t("confirmNumber")}
          </Text>
          <Text style={{ fontSize: 16 }} className="font-semibold">
            {t("codeSent", {number: phoneNumber})}
          </Text>
        </View>

        <View className="items-center my-4">
          <VerificationCodeInput
            codeLength={6}
            onVerificationCodeReady={onVerificationCodeReady}
          />
        </View>

        <View className="items-center mt-10">
          <TouchableOpacity>
            <Text className="text-blue-800 font-bold" style={{ fontSize: 15 }}>
              {t("newCode")}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </HideKeyboardView>
  );
};

export default PhoneVerificationScreen;
