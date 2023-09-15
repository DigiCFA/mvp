import { View, Text } from "react-native";
import React from "react";

const NumbersColumn = () => {

  return (
    <View>
      <Text>NumbersColumn</Text>

      <TouchableOpacity
        onPress={() => navigation.navigate("PhoneNumber")}
        className="flex-row items-center py-4 border-b border-gray-300"
      >
        <View className="flex-col flex-1 space-y-1">
          <Text className="text-gray-500">Phone Numbers</Text>
          <Text className="text-base font-medium">{self.phoneNumber}</Text>
        </View>

        <Ionicons name="chevron-forward" size={30} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default NumbersColumn;
