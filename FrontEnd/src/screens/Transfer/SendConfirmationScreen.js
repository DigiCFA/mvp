import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { intlFormat } from "../../utils/currencyFormatter";
import { dinero, toSnapshot } from 'dinero.js';
import { USD } from '@dinero.js/currencies';
import CompatibleSafeAreaView from "../../components/CompatibleSafeAreaView";
const SendConfirmationScreen = () => {
  const { t } = useTranslation();
  const {
    params: { name, amount, message },
  } = useRoute();

  // useEffect(() => {
  //   fetchTransactionsById(id);
  // }, []);

  // useEffect(() => {
  //   axios
  //     .get("localhost:5050/routes/transaction/transaction_data", {
  //       params: {
  //         ID: "64b851f72736819c427e0708",
  //       },
  //     })
  //     .then((data) => {
  //       setTransactionHistory(data);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }, []);

  const navigation = useNavigation();

  let firstName = name.substring(0, name.indexOf(" "));

  return (
    <CompatibleSafeAreaView componentStyle="grow">
      <View className="flex-row mb-4">
        <TouchableOpacity
          onPress={() => navigation.popToTop()}
          className="flex-1 items-end p-4"
        >
          <Ionicons name="close" size={40} color="grey" />
        </TouchableOpacity>
      </View>

      <View className="flex-1 flex-col items-center py-20">
        <Text className="text-2xl font-medium">{intlFormat(dinero(amount))}</Text>
        <Text className="text-lg font-medium">"{message}"</Text>
        <Text className="text-lg font-medium">{t('confirmationMessage', { name: firstName })}</Text>
      </View>
    </CompatibleSafeAreaView>
  );
};

export default SendConfirmationScreen;
