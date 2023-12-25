import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import {
  Ionicons,
  FontAwesome5,
  MaterialCommunityIcons,
  Entypo,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Currency from "react-currency-formatter";
import { useTranslation } from "react-i18next";
import { intlFormat } from "../../utils/currencyFormatter";
import { dinero, toSnapshot } from 'dinero.js';
import { USD } from '@dinero.js/currencies';
const PaymentMethodCard = ({
  cardID,
  cardName,
  cardNumber,
  cardType,
  balanceSufficient,
  isActive,
  onPress,
  balance
}) => {

  const { t } = useTranslation();

  return (
    <TouchableOpacity
      onPress={onPress}
      className="py-4 pl-4 rounded-lg flex-row space-x-4 border-b border-gray-200"
    >
      <View className="shadow">
        {cardType === "balance" ? (
          <MaterialCommunityIcons name="gold" size={48} color="#D4AF37" />
        ) : (
          <Ionicons name="card-outline" size={48} color="#0ABAB5" />
        )}
      </View>
      <View className="flex-col flex-1">
        {/* Row of Title + Transaction amount*/}
        <View className="flex-row">
          <View className="flex-1">
            {cardType === "balance" ? (
              <Text className="text-lg font-medium">{t("balance")}</Text>
            ) : (
              <Text className="text-lg font-medium">{cardName}</Text>
            )}
          </View>
        </View>
        {cardType === "balance" ? (
          <Text className={`${balanceSufficient ? 'font-medium text-gray-500' : 'font-semibold text-red-600'}`}>
            {intlFormat(dinero(balance))} CFA
            {/* CFA {balance} */}
          </Text>
        ) : (
          <Text className="font-medium text-gray-500">
            {cardType.charAt(0).toUpperCase() + cardType.slice(1)} (
            {cardNumber.slice(-4)})
          </Text>
        )}
      </View>

      <View className="w-8">
        {isActive && (
          <View>
            <Ionicons name="checkmark-sharp" size={30} color="green" />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default PaymentMethodCard;
