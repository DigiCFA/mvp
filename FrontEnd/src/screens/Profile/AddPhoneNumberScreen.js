import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import HideKeyboardView from "../../components/HideKeyboardView";
import CompatibleSafeAreaView from "../../components/CompatibleSafeAreaView";
import withFieldError from "../../components/withFieldError";
import TextField from "../../components/TextField";
import { useTranslation } from "react-i18next";
import { phoneNumberValidation, validateSingleField } from "../../utils/userValidation";

// import { Input } from "react-native-elements";
// import { Input } from "@rneui/themed";

const PhoneWithError = withFieldError(TextField);

const AddPhoneNumberScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const [focus, setFocus] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const [phoneNumberIsValid, setPhoneNumberIsValid] = useState(false);
  const [displayError, setDisplayError] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState();

  return (
    <HideKeyboardView>
      <CompatibleSafeAreaView componentStyle="flex-col flex-1">
        <View className="flex-row justify-items-start items-center space-x-2 pt-1 mx-4">
          <TouchableOpacity onPress={navigation.goBack} className="flex-1">
            <Ionicons name="close" size={30} color="grey" />
          </TouchableOpacity>

          <Text className="text-lg font-semibold">{t("addPhoneNumber")}</Text>

          <View className="flex-1"></View>
        </View>

        <View className="h-1/3"></View>

        <View className="flex-1 flex-col mx-4">
          {/* <Text
          className={`text-base font-semibold ${
            focus ? "text-blueLight" : "text-black"
          }`}
        >
          Phone Number
        </Text>
        <TextInput
          keyboardType="numeric"
          style={{ fontSize: 20 }}
          autoFocus={true}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          className={`pt-1 pb-2 font-medium border-b ${
            focus ? "border-blueLight" : "border-black"
          }`}
        /> */}

          <View
            className={`border-2 p-2 rounded-md ${
              isInputFocused ? "border-blue-500" : "border-gray-500"
            }`}
          >
            <Text className="text-base font-semibold text-gray-500">
              Mobile number
            </Text>
            <View className="flex-row items-center space-x-0.5">
              <Text style={{ fontSize: 20 }}>+1</Text>
              <TextInput
                style={{ fontSize: 20 }}
                placeholder="000-000-0000"
                value={phoneNumber}
                autoFocus={true}
                keyboardType="numeric"
                className="pr-2 w-full"
                onFocus={() => {
                  setIsInputFocused(true);
                }}
                onBlur={() => {
                  setIsInputFocused(false);
                }}
                onChangeText={(e) => {
                  setPhoneNumber(e);
                }}
              />
            </View>
          </View>

          <View>
            <PhoneWithError
              style="phoneNumber"
              isSeparatePrompt={true}
              prompt={t("phoneNumber")}
              onChangeText={(e) => {
                setPhoneNumber(e)
              }}
              value={phoneNumber}
              keyboardType="numeric"
              onIsErrorChange={(e) => {
                setPhoneNumberIsValid(!e);
              }}
              isDisplayError={displayError}
              validator={validateSingleField([phoneNumberValidation])}
            />
          </View>
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={10}
        >
          <View className="w-2/3 self-center items-center">
            <TouchableOpacity
              onPress={() => navigation.navigate("PhoneVerification")}
              className="bg-blueDark rounded-full py-3 w-full"
            >
              <Text className="text-white text-xl font-extrabold self-center">
                Done
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </CompatibleSafeAreaView>
    </HideKeyboardView>
  );
};

// const styles = StyleSheet.create({
//     inputOnBlur: {
//         fontSize: 20,
//         paddingTop: 8,
//         paddingBottom: 8,
//         borderBottomWidth: 1,
//         // borderBottomColor: '#3370E2'
//         // borderBottomWidth:'medium',
//         // borderBottomColor: "#3370E2"
//     },
//     inputOnFocus: {
//         fontSize: 20,
//         paddingTop: 8,
//         paddingBottom: 8,
//         borderBottomWidth: 1,
//         borderBottomColor: '#3370E2'
//     }
// })

export default AddPhoneNumberScreen;
