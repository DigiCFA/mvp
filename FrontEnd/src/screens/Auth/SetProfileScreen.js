import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import HideKeyboardView from "../../components/HideKeyboardView";

const SetProfileScreen = () => {
  const navigation = useNavigation();

  const [firstNameInputFocused, setFirstNameInputFocused] = useState(false);
  const [lastNameInputFocused, setLastNameInputFocused] = useState(false);

  return (
    <SafeAreaView className="bg-white flex-1">
      <HideKeyboardView>
        <View className="mx-3 my-4 w-6">
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Ionicons name="arrow-back-outline" size={24} color="gray" />
          </TouchableOpacity>
        </View>
      </HideKeyboardView>

      <HideKeyboardView>
        <View className="mx-3">
          <Text className="font-semibold" style={{ fontSize: 30 }}>
            Set up your profile
          </Text>
          <Text className="font-medium" style={{ fontSize: 18 }}>
            This information needs to be accurate
          </Text>
        </View>
      </HideKeyboardView>

      <View className="mx-3 mt-10 space-y-6">
        <TextInput
          placeholder="First name"
          style={{ fontSize: 18 }}
          className={`border px-3 py-5 rounded-md ${
            firstNameInputFocused ? "border-blue-500" : "border-gray-500"
          }`}
          onBlur={() => {
            setFirstNameInputFocused(false);
          }}
          onFocus={() => {
            setFirstNameInputFocused(true);
          }}
        />

        <TextInput
          placeholder="Last name"
          style={{ fontSize: 18 }}
          className={`border px-3 py-5 rounded-md ${
            lastNameInputFocused ? "border-blue-500" : "border-gray-500"
          }`}
          onBlur={() => {
            setLastNameInputFocused(false);
          }}
          onFocus={() => {
            setLastNameInputFocused(true);
          }}
        />
      </View>

      <HideKeyboardView>
        <View className="flex-1"></View>
      </HideKeyboardView>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={10}
      >
        <TouchableOpacity className="bg-blue-800 rounded-full py-4 mx-3">
          <Text
            className="text-center font-bold text-white"
            style={{ fontSize: 20 }}
          >
            Next
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SetProfileScreen;
