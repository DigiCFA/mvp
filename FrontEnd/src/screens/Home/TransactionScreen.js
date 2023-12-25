import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import Currency from "react-currency-formatter";
import { intlFormat } from "../../utils/currencyFormatter";
import { dinero, toSnapshot } from 'dinero.js';
import { USD } from '@dinero.js/currencies';
import { useTranslation } from "react-i18next";
import CompatibleSafeAreaView from "../../components/CompatibleSafeAreaView";

const TransactionScreen = () => {
  const { t } = useTranslation();
  const {
    params: { id, userPays, title, fullDate, message, paymentMethod, amount },
  } = useRoute();
  const navigation = useNavigation();

  return (
    <CompatibleSafeAreaView componentStyle="grow">
      {/* Top Bar */}
      <View className="flex-row justify-items-start items-center space-x-2 pt-1 mx-4">
        <TouchableOpacity onPress={navigation.goBack} className="flex-1">
          <Ionicons name="arrow-back" size={30} color="grey" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold">
          {t("money", { action: userPays ? t("sent") : t("received") })}
        </Text>

        <View className="flex-1"></View>
      </View>

      <ScrollView>
        <View className="my-2 p-4 bg-white flex-row space-x-4">
          <View className="h-12 p-2 bg-[#192C88] border rounded-full">
            <FontAwesome5 name="store-alt" size={24} color="white" />
          </View>
          <View className="flex-col space-y-2 flex-1">
            {/* Row of Title + Transaction amount*/}
            <View className="flex-row">
              <View className="flex-1">
                <Text className="text-xl font-bold">{title}</Text>
              </View>
              <Text
                className={`text-xl font-medium ${
                  userPays ? "text-black" : "text-green-800"
                }`}
              >
                {userPays ? "-" : "+"}
                {intlFormat(dinero(amount))}
              </Text>
            </View>
            <Text className="font-medium">{fullDate}</Text>
            <TouchableOpacity>
              <Text className="font-bold text-blue-600">
                {t("showHistory")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="p-4 bg-white space-y-2">
          <Text className="text-base font-medium">{message}</Text>
          <TouchableOpacity>
            <Text className="font-bold text-blue-600">{t("showStory")}</Text>
          </TouchableOpacity>
        </View>

        <View className="mt-2 p-4 bg-white space-y-2">
          <Text className="text-base font-bold">
            {userPays ? t("from") : t("to")}
          </Text>
          <Text className="text-base font-medium">
            {paymentMethod.charAt(0).toUpperCase() + paymentMethod.slice(1)}
          </Text>
        </View>

        <View className="mt-2 p-4 bg-white space-y-2">
          <Text className="text-base font-bold">{t("transactionID")}</Text>
          <Text className="text-base font-medium">{id}</Text>
        </View>

        <View className="mt-2 p-4 bg-white space-y-2">
          <Text className="text-base font-bold">{t("needHelp")}</Text>
          <TouchableOpacity className="flex-row space-x-2">
            <Ionicons name="warning" size={24} color="#192C88" />
            <Text className="text-base font-medium">{t("report")}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </CompatibleSafeAreaView>
  );
};

export default TransactionScreen;
