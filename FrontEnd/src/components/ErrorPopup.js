import { View, Text } from "react-native";
import React from "react";
import { useTranslation } from "react-i18next";

const ErrorPopup = ({ text, color }) => {
  const { t } = useTranslation();

  const toBGColor = (color) => {
    switch (color) {
      case "red":
        return "bg-red";
      case "blueDark":
        return "bg-blueDark";
    }
  };

  return (
    <View className={`rounded-xl border ${toBGColor(color)} p-2 m-4`}>
      <Text className="text-lg font-semibold text-white">{t(text)}</Text>
    </View>
  );
};

export default ErrorPopup;
