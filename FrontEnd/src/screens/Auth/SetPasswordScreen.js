import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {useDispatch} from 'react-redux'

import PasswordTextInput from "../../components/PasswordTextInput";
import HideKeyboardView from "../../components/HideKeyboardView";
import { setField } from "../../redux/api/signUpSlice";

const SetPasswordScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [password, setPassword] = useState("");
  const [retypedPassword, setRetypedPassword] = useState("");

  return (
    <SafeAreaView className="flex-1 bg-white">
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
            How you'll log in
          </Text>
          <Text className="font-medium" style={{ fontSize: 18 }}>
            Make sure you keep it secure.
          </Text>
        </View>
      </HideKeyboardView>

      <View className="mx-3">
        <PasswordTextInput
          placeHolder={"Password"}
          onChangeText={setPassword}
        />
        <PasswordTextInput
          placeHolder={"Retype Password"}
          onChangeText={setRetypedPassword}
        />
      </View>

      <HideKeyboardView>
        <View className="flex-1"></View>
      </HideKeyboardView>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={10}
      >
        <TouchableOpacity
          className="bg-blue-800 rounded-full py-4 mx-3"
          onPress={() => {
            dispatch(setField({field: "password", content: password}))
            navigation.navigate("Profile");
          }}
        >
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

export default SetPasswordScreen;
