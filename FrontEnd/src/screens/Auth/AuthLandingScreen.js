import {
  useLoginMutation,
  useGetSessionQuery,
} from "../../redux/api/apiAuthSlice";
import { useNavigation } from "@react-navigation/native";
import React, {useEffect, useState } from "react";

import HideKeyboardView from "../../components/HideKeyboardView";
import Spinner from "react-native-loading-spinner-overlay";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar
} from "react-native";
import { useTranslation } from "react-i18next";
import { loginPassword, phoneNumberValidation, validateSingleField } from "../../utils/userValidation";
import withFieldError from "../../components/withFieldError";
import TextField from "../../components/TextField";
import CompatibleSafeAreaView from "../../components/CompatibleSafeAreaView";

const languages = {
  en: { nativeName: "English" },
  fr: { nativeName: "Français" },
};

const PhoneWithError = withFieldError(TextField)
const PasswordWithError = withFieldError(TextField)

const LoginSignupLandingScreen = () => {
  const { t, i18n } = useTranslation();

  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [displayError, setDisplayError] = useState(false);
  const [isPhoneError, setIsPhoneError] = useState(true);
  const [isPasswordError, setIsPasswordError] = useState(true);

  const [
    login,
    {
      error: loginError,
      isFetching: loginIsLoading,
      isLoading: loginIsFetching,
      isSuccess: loginIsSuccess,
      isError: loginIsError,
    },
  ] = useLoginMutation();

  const {
    data: session,
    isFetching: sessionIsFetching,
    isLoading: sessionIsLoading,
    isSuccess: sessionIsSuccess,
    isError: sessionIsError,
  } = useGetSessionQuery();

  /*
  Important Differentiations:
  isLoading: loading for the first time, no existing data
  isFetching: fetching, might have previous data
  */

  const navigation = useNavigation();

  const onPressLogin = async () => {
    const user = {
      phoneNumber: phoneNumber,
      password: password,
    };
    const valid = !isPasswordError && !isPhoneError
    setDisplayError(!valid)
    try {
      if (valid) {
        await login(user).unwrap();
      }
    } catch (err) {
      console.error("error", err);
    }
  };

  return (
    <CompatibleSafeAreaView componentStyle="items-center bg-white flex-1">
      <Spinner visible={loginIsFetching || sessionIsFetching} />

      {/* Logo at the top */}
      <HideKeyboardView>
        <View className="mt-5 w-full items-center">
          <Image
            source={require("../../../assets/logo/3clear_bigger.png")}
            className="h-24 w-20 ml-4"
          />
        </View>
      </HideKeyboardView>

      {/* Phone Number + Password */}
      <View className="w-full px-10">
        <PhoneWithError onChangeText={setPhoneNumber} onIsErrorChange={setIsPhoneError} placeholder={t('phoneNumber')} 
          isDisplayError={displayError} validator={validateSingleField([phoneNumberValidation])}
        />
        <PasswordWithError onChangeText={setPassword} onIsErrorChange={setIsPasswordError} placeholder={t('password')} 
          isDisplayError={displayError} style={"password"} validator={validateSingleField([loginPassword])}
        />

        {/* Forgotten your password button */}
        {/* <TouchableOpacity className="mt-1.5">
          <Text className=" text-blue-800 font-bold">
            {t("forgottenPassword")}
          </Text>
        </TouchableOpacity> */}
      </View>

      <HideKeyboardView>

        <View className="w-full space-y-3 mt-10 px-10 flex-1">

          {/* LOG IN */}
          <TouchableOpacity
            className="rounded-full bg-blueDark py-3"
            onPress={onPressLogin}
          >
            <Text
              style={{ fontSize: 18 }}
              className="text-center text-white font-bold"
            >
              {t("login")}
            </Text>
          </TouchableOpacity>

          {/* SIGN UP */}
          <TouchableOpacity
            className="rounded-full border-blueDark border-2 py-3"
            onPress={() => {
              navigation.navigate("PhoneNumber");
            }}
          >
            <Text
              style={{ fontSize: 18 }}
              className="text-center font-bold text-blue-800"
            >
              {t("signup")}
            </Text>
          </TouchableOpacity>

          {/* Language Switching Buttons */}
          <View className="flex-1"></View>
          <View className="flex-col items-end mb-10">
            {Object.keys(languages).map((lng) => (
              <TouchableOpacity
                key={lng}
                className="w-24 rounded-lg p-2 bg-blueDark mt-2"
                onPress={() => i18n.changeLanguage(lng)}
              >
                <Text
                  className={`text-white text-lg text-center ${
                    i18n.resolvedLanguage === lng ? "font-bold" : ""
                  }`}
                >
                  {languages[lng].nativeName}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </HideKeyboardView>
    </CompatibleSafeAreaView>
  );
};

export default LoginSignupLandingScreen;
