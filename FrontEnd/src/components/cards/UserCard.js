import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export const UserCard = ({ id, name, phoneNumber }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("User", {
          id,
          name,
        });
      }}
      className="py-0.5 bg-white rounded-lg flex-row space-x-2"
    >
      {/* <View className="h-12 w-12 p-2 bg-[#192C88] border rounded-full">
        <Ionicons name="person-circle" size={30} color="white" />
      </View> */}
      <Ionicons name="person-circle" size={55} color="#192C88" />
      <View className="flex-col flex-1">
        {/* Row of Title + Transaction amount*/}
        <View className="flex-row">
          <View className="flex-1">
            <Text className="text-xl font-medium">{name}</Text>
          </View>
          <Ionicons name="ellipsis-vertical" size={24} color="gray" />
        </View>

        <Text className="font-medium text-gray-500">{phoneNumber}</Text>
      </View>
    </TouchableOpacity>
  );
};