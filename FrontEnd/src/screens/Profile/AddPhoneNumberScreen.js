import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

// import { Input } from "react-native-elements";
// import { Input } from "@rneui/themed";

const AddPhoneNumberScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-col flex-1">
      <View className="flex-row justify-items-start items-center space-x-2 pt-1 mx-4">
        <TouchableOpacity onPress={navigation.goBack} className="flex-1">
          <Ionicons name="close" size={30} color="#3370E2" />
        </TouchableOpacity>

        <Text className="text-lg font-semibold">Add a phone number</Text>

        <View className="flex-1"></View>
      </View>

      <View className="flex-col mx-4">
        {/* <Input
          placeholder="Please enter your phone number"
          label="Phone Number"
          labelStyle={{}}
          keyboardType="numeric"
        />

        <Input
          placeholder="Please enter your phone number"
          label="Phone Number"
          labelStyle={{}}
        /> */}
      </View>
    </SafeAreaView>
  );
};

export default AddPhoneNumberScreen;
