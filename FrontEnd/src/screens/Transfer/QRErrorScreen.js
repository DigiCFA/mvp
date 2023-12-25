import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React from "react";

import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import CompatibleSafeAreaView from "../../components/CompatibleSafeAreaView";

const QRErrorScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  return (
    <CompatibleSafeAreaView componentStyle="flex-grow items-center">
      <View className="flex-1 justify-center items-center p-4">
        <Ionicons name="warning" size={96} color="red" />
        <Text className="text-3xl font-semibold text-center px-8 py-4">
          {t('QRError')}
        </Text>
        <Text className="text-base text-center">
          {t('seller')}
        </Text>
      </View>

      <View className="">
        <TouchableOpacity
          onPress={navigation.goBack}
          className="bg-[#4664B2] rounded-full py-3 px-8"
        >
          <Text className="text-white text-xl font-extrabold">OK</Text>
        </TouchableOpacity>
      </View>
    </CompatibleSafeAreaView>
  );
};

export default QRErrorScreen;
