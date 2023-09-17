import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import { Ionicons } from "@expo/vector-icons";

const PhoneNumberScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="bg-gray-200">
      {/* Top Bar */}
      <View className="flex-row justify-items-start items-center space-x-2 pt-1 mx-4">
        <TouchableOpacity onPress={navigation.goBack} className="flex-1">
          <Ionicons name="arrow-back" size={30} color="#3370E2" />
        </TouchableOpacity>
      </View>

      <View className="mx-10 mt-10 mb-6 flex-col space-y-2">
        <Text className="text-xl font-bold">Phone Numbers</Text>
        <Text className="text-gray-500 font-medium">
          Manage your communication preferences.
        </Text>

        <TouchableOpacity className="flex-row pt-10 items-center space-x-2">
          <Ionicons name="add" size={30} color="#3370E2" />
          <Text className="text-base font-semibold text-blueLight">Add a phone number</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PhoneNumberScreen;
