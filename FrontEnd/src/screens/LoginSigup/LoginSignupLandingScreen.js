import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  Touchable,
} from "react-native";
import React, { useState } from "react";

import { FontAwesome } from "@expo/vector-icons";
import PasswordTextInput from "../../components/PasswordTextInput";
import HideKeyboardView from "../../components/HideKeyboardView";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { login } from "../../redux/reducers/sessionSlice";

const LoginSignupLandingScreen = () => {
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isPhoneNumberInputFocused, setIsPhoneNumberInputFocused] =
    useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const onPressLogin = () => {
    const user = {
      phoneNumber: phoneNumber,
      password: password,
    };
    dispatch(login(user));
  };

  return (
    <SafeAreaView className="items-center bg-white flex-1">
      <HideKeyboardView>
        <View className="mt-5 w-full items-center">
          <FontAwesome name="paypal" size={50} color="blue" />
        </View>
      </HideKeyboardView>

      <View className="w-full px-10">
        <TextInput
          placeholder="Phone number"
          style={{ fontSize: 18 }}
          className={`border px-3 py-5 rounded-md ${
            isPhoneNumberInputFocused ? "border-blue-500" : "border-gray-500"
          } mt-10`}
          keyboardType="numeric"
          onFocus={() => {
            setIsPhoneNumberInputFocused(true);
          }}
          onBlur={() => {
            setIsPhoneNumberInputFocused(false);
          }}
          onChangeText={setPhoneNumber}
        />

        <PasswordTextInput
          placeHolder={"Password"}
          onChangeText={setPassword}
        />

        <TouchableOpacity className="mt-1.5">
          <Text className=" text-blue-800 font-bold">
            Forgotten your password?
          </Text>
        </TouchableOpacity>
      </View>

      <HideKeyboardView>
        <View className="w-full space-y-3 mt-10 px-10 flex-1">
          <TouchableOpacity
            className="rounded-full bg-blue-800 py-3"
            onPress={onPressLogin}
          >
            <Text
              style={{ fontSize: 18 }}
              className="text-center text-white font-bold"
            >
              Log In
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="rounded-full border-blue-800 border-2 py-3"
            onPress={() => {
              navigation.navigate("PhoneNumber");
            }}
          >
            <Text
              style={{ fontSize: 18 }}
              className="text-center font-bold text-blue-800"
            >
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </HideKeyboardView>
    </SafeAreaView>
  );
};

export default LoginSignupLandingScreen;
