import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";

import PasswordTextInput from "../../components/PasswordTextInput";
import HideKeyboardView from "../../components/HideKeyboardView";
import { setField } from "../../redux/client/signUpSlice";
import { useTranslation } from "react-i18next";

const SetPasswordScreen = () => {

  const { t } = useTranslation();

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [errorState, setErrorState] = useState({});
  const [errorM, setErrorM] = useState({});

  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [password, setPassword] = useState("");
  const [retypedPassword, setRetypedPassword] = useState("");
  useEffect(() => {
    validateForm();
  }, [password, retypedPassword]);
  const validateForm = () => {
    let errors = {};

    // Validate password field
    if (!password) {
      errors.password = t("passwordError1");
    } else if (password.length < 6) {
      errors.password = t("passwordError2");
    } else if (password !== retypedPassword) {
      errors.retypedPassword = t("passwordError3");
    }

    // Set the errors and update form validity
    setErrorState(errors);
    setPasswordIsValid(Object.keys(errors).length === 0);
  };

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
            {t("howYouLogIn")}
          </Text>
          <Text className="font-medium" style={{ fontSize: 18 }}>
            {t("keepItSafe")}
          </Text>
        </View>
      </HideKeyboardView>

      <View className="mx-3">
        <PasswordTextInput
          placeHolder={t("password")}
          onChangeText={setPassword}
        />
        <Text className="text-red-700" style={{ fontSize: 10 }}>
          {errorM.password}
        </Text>
        <PasswordTextInput
          placeHolder={t("passwordRetype")}
          onChangeText={setRetypedPassword}
        />
        <Text className="text-red-700" style={{ fontSize: 10 }}>
          {errorM.retypedPassword}
        </Text>
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
            if (passwordIsValid) {
              dispatch(setField({ field: "password", content: password }));
              navigation.navigate("Profile");
            } else {
              setErrorM(errorState);
            }
          }}
        >
          <Text
            className="text-center font-bold text-white"
            style={{ fontSize: 20 }}
          >
            {t("next")}
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SetPasswordScreen;
