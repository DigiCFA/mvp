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
import { useDispatch, useSelector } from 'react-redux'

import HideKeyboardView from "../../components/HideKeyboardView";
import { selectFieldWithAttr, setField, clearAllField } from "../../redux/reducers/signUpSlice";
import { useSignupMutation } from "../../redux/reducers/apiAuthSlice";
import Spinner from "react-native-loading-spinner-overlay";

const SetProfileScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [firstNameInputFocused, setFirstNameInputFocused] = useState(false);
  const [lastNameInputFocused, setLastNameInputFocused] = useState(false);

  const firstName = useSelector(selectFieldWithAttr("firstName"))
  const lastName = useSelector(selectFieldWithAttr("lastName"))
  const user = useSelector(state => state.signUp)
  const [signup,{data, isLoading, isSuccess, isError, error}] = useSignupMutation()

  const onPressButton = async () => {
    try {
      console.log(user)
      await signup(user).unwrap()
      dispatch(clearAllField())
    } catch (error) {
      console.error("error",error)
    }
  }

  return (
    <SafeAreaView className="bg-white flex-1">
      <Spinner visible={isLoading} />
      <HideKeyboardView>
        <View className="mx-3 my-4 w-6">
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Ionicons name="arrow-back-outline" size={30} color="gray" />
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
          value={firstName}
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
          onChangeText={(e) => {dispatch(setField({field: "firstName", content: e}))}}
        />

        <TextInput
          placeholder="Last name"
          value={lastName}
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
          onChangeText={(e) => {dispatch(setField({field: "lastName", content: e}))}}
        />
      </View>

      <HideKeyboardView>
        <View className="flex-1"></View>
      </HideKeyboardView>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={10}
      >
        <TouchableOpacity className="bg-blue-800 rounded-full py-4 mx-3"
          onPress={onPressButton}>
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
