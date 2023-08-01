import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const SendConfirmationScreen = () => {
  const {
    params: { name, amount, message },
  } = useRoute();
  const navigation = useNavigation();

  let firstName = name.substring(0, name.indexOf(" "));

  return (
    <SafeAreaView className="grow">

      <View className="flex-row mb-4">

        <TouchableOpacity
          onPress={() => navigation.popToTop()}
          className="flex-1 items-end p-4"
        >
          <Ionicons name="close" size={40} color="grey" />
        </TouchableOpacity>
      </View>

      <View className="flex-1 flex-col items-center py-20">
        <Text className="text-2xl font-medium">${amount} sent!</Text>
        <Text className="text-lg font-medium">"{message}"</Text>
        <Text className="text-lg font-medium">We'll let {firstName} know.</Text>
      </View>
    </SafeAreaView>
  );
};

export default SendConfirmationScreen;
