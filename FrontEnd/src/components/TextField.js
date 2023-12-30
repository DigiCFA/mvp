import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Entypo } from "@expo/vector-icons";

const TextField = ({
  prompt,
  onChangeText,
  isError,
  isSeparatePrompt = false,
  style = "default",
  keyBoardType = "default",
  placeholder,
  ...props
}) => {
  const [isPhoneNumberInputFocused, setIsPhoneNumberInputFocused] =
    useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const borderColor = isError
    ? "border-red-500"
    : isPhoneNumberInputFocused
    ? "border-blue-500"
    : "border-gray-500";
  const borderDisplay = "border-2";
  const keyboardType = style === "password" ? "ascii-capable" : keyboardType;
  const onPressShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const passwordComponent = style === "password" && (
    <TouchableOpacity onPress={onPressShowPassword}>
      <Entypo
        name={showPassword ? "eye" : "eye-with-line"}
        size={20}
        color="black"
        style={{paddingLeft: 8}}
      />
    </TouchableOpacity>
  );

  const phoneComponent = style === "phoneNumber" && (
    <Text className="text-black mr-2" style={{fontSize: 18}}>+241</Text>
  );

  // If there is prompt above the text
  return isSeparatePrompt ? (
    <View className={`p-2 rounded-md ${borderColor} ${borderDisplay} mt-2`}>
      <Text className="text-gray-500 text-base font-semibold">{prompt}</Text>
      <View className="flex-row items-center">
        {phoneComponent}
        <TextInput
          keyboardType={keyBoardType}
          style={{ fontSize: 18 }}
          className="pr-2 w-full"
          onFocus={() => {
            setIsPhoneNumberInputFocused(true);
          }}
          onBlur={() => {
            setIsPhoneNumberInputFocused(false);
          }}
          onChangeText={onChangeText}
          secureTextEntry={style === "password" && !showPassword}
          placeholder={phoneComponent ? "00-00-00-00" : placeholder}
          {...props}
        />
        {passwordComponent}
      </View>
    </View>

  // If not prompt above the text
  ) : (
    <View
      className={`flex-row items-center px-3 py-5 rounded-md ${borderColor} ${borderDisplay} mt-2`}
    >
      {phoneComponent}
      <TextInput
        placeholder={placeholder ? placeholder : phoneComponent ? "00-00-00-00" : ""}
        style={{ fontSize: 18 }}
        className={`flex-1`}
        keyboardType={keyBoardType}
        onFocus={() => {
          setIsPhoneNumberInputFocused(true);
        }}
        onBlur={() => {
          setIsPhoneNumberInputFocused(false);
        }}
        onChangeText={onChangeText}
        secureTextEntry={style === "password" && !showPassword}
        {...props}
      />
      {passwordComponent}
    </View>
  );
};

export default TextField;
