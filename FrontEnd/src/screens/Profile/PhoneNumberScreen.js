import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import {Ionicons} from "@expo/vector-icons"

const PhoneNumberScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      {/* Top Bar */}
      <View className="flex-row justify-items-start items-center space-x-2 pt-1 mx-4">
        <TouchableOpacity onPress={navigation.goBack} className="flex-1">
          <Ionicons name="arrow-back" size={30} color="grey" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold">Phone Numbers</Text>

        <View className="flex-1"></View>
      </View>

      <Text>PhoneNumberScreen</Text>
    </SafeAreaView>
  );
};

export default PhoneNumberScreen;
