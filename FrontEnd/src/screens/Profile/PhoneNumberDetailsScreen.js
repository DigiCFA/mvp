import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Switch,
} from "react-native";
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import Currency from "react-currency-formatter";
import { useTranslation } from "react-i18next";

const PhoneNumberDetailsScreen = () => {
  const { t } = useTranslation();

  const {
    params: { isPrimary, phoneNumber },
  } = useRoute();
  const navigation = useNavigation();

  const [phoneEnabled, setPhoneEnabled] = useState(true);
  const [textEnabled, setTextEnabled] = useState(true);

  return (
    <View className="h-screen bg-white">
      <View className="bg-default pb-8">
        {/* Top Bar */}
        <View className="flex-row justify-items-start items-center space-x-2 pt-1 mx-4 pt-12">
          <TouchableOpacity onPress={navigation.goBack} className="flex-1">
            <Ionicons name="arrow-back" size={30} color="#3370E2" />
          </TouchableOpacity>
          <Text className="text-lg font-semibold">{t("phoneNumber")}</Text>

          <View className="flex-1"></View>
        </View>

        <View className="mx-10 mt-10 mb-6 flex-col">
          <Text className="text-base font-medium text-gray-600">
            {isPrimary === true ? t("primary") : t("secondary")}
          </Text>
          <Text className="text-xl font-bold">{phoneNumber}</Text>
          <Text className="text-sm font-medium  text-gray-600 pt-4">
            {isPrimary === true ? t("primaryText") : t("secondaryText")}
          </Text>
        </View>
      </View>

      <View className="bg-white grow px-4">
        {isPrimary !== true && (
          <TouchableOpacity className="flex-row py-8 px-4 items-center space-x-8 border-b border-gray-300">
            <FontAwesome5 name="pen" size={24} color="#3370E2" />
            <Text className="text-base font-semibold text-gray-600">
              {t("changeToPrimary")}
            </Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity className="flex-row py-8 px-4 items-center space-x-8 border-b border-gray-300">
          <Ionicons name="trash" size={24} color="#3370E2" />
          <Text className="text-base font-semibold text-gray-600">
            {t("delete")}
          </Text>
        </TouchableOpacity>

        <Text className="text-xs font-medium  text-gray-600 py-8">
          {t("permission")}
        </Text>

        <View className="flex-row px-4 py-4 border-b border-gray-300">
          <View className="flex-col flex-1">
            <Text>{t("automatedCalls")}</Text>
          </View>
          <Switch
            onValueChange={() => setPhoneEnabled((prevState) => !prevState)}
            value={phoneEnabled}
          />
        </View>

        <View className="flex-row px-4 pt-8 pb-4 border-b border-gray-300">
          <View className="flex-col flex-1">
            <Text>{t("sendTextMessages")}</Text>
          </View>
          <Switch
            onValueChange={() => setTextEnabled((prevState) => !prevState)}
            value={textEnabled}
          />
        </View>
      </View>
    </View>
  );
};

export default PhoneNumberDetailsScreen;
