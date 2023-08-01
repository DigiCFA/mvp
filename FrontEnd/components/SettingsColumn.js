import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const SettingsColumn = () => {
  const navigation = useNavigation();

  return (
    <View className="mt-10">
      <TouchableOpacity
        onPress={() => navigation.navigate("AccountInfo")}
        className="py-5 px-4 bg-white rounded-lg items-start flex-row space-x-4"
      >
        <Ionicons name="person" size={24} color="#192C88" />
        <Text className="text-xl font-medium">Account info</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("MessageCenter")}
        className="py-5 px-4 bg-white rounded-lg items-start flex-row space-x-4"
      >
        <Ionicons name="mail-unread" size={24} color="#192C88" />
        <Text className="text-xl font-medium">Message center</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Security")}
        className="py-5 px-4 bg-white rounded-lg items-start flex-row space-x-4"
      >
        <Ionicons name="shield" size={24} color="#192C88" />
        <Text className="text-xl font-medium">Security</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SettingsColumn;
