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
      <View className="flex-1 flex-col items-center py-60 space-y-4">
        <Text className="text-3xl font-medium text-center px-20">
          You requested ${amount} from {name}
        </Text>
        <Text className="text-md font-medium px-10">"{message}"</Text>
        <Text className="text-md font-medium px-10">
          We'll let {firstName} know right away that you requested money. You
          can see the details in your Home page in case you need them later.
        </Text>
      </View>

      <View className="px-24">
        <TouchableOpacity
          onPress={() => navigation.popToTop()}
          className="bg-blue-900 rounded-full py-3 items-center"
        >
          <Text className="text-white text-xl font-extrabold">Done</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SendConfirmationScreen;
