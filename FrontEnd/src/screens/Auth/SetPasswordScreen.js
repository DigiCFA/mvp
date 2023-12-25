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
import withFieldError from "../../components/withFieldError";
import { validateSingleField, signupPassword, validateRetypePassword } from "../../utils/userValidation";
import TextField from "../../components/TextField";
import CompatibleSafeAreaView from "../../components/CompatibleSafeAreaView";

const PasswordWithError = withFieldError(TextField)
const RetypeWithError = withFieldError(TextField)

const SetPasswordScreen = () => {

  const { t } = useTranslation();

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [displayError, setDisplayError] = useState(false)
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [retypeIsValid, setRetypeIsValid] = useState(false)
  const [password, setPassword] = useState("");
  const [retypedPassword, setRetypedPassword] = useState("");

  const onPressNext = () => {
    setDisplayError(true)
    if (retypeIsValid && passwordIsValid) {
      dispatch(setField({ field: "password", content: password }));
      navigation.navigate("Profile");
    }
  }

  return (
    <CompatibleSafeAreaView componentStyle="flex-1 bg-white">
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
        <PasswordWithError onChangeText={setPassword} placeholder={t('password')} 
          onIsErrorChange={(e) => {setPasswordIsValid(!e)}} style="password"
          isDisplayChecklist={true} isDisplayError={displayError} validator={validateSingleField(signupPassword)}
          value={password}
        />
        <RetypeWithError onChangeText={setRetypedPassword} placeholder={t('passwordRetype')}
          onIsErrorChange={(e) => {setRetypeIsValid(!e)}} style="password"
          isDisplayError={displayError} validator={validateRetypePassword(password)}
          value={retypedPassword}
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
          className="bg-blue-800 rounded-full py-4 mx-3 mb-3"
          onPress={onPressNext}
        >
          <Text
            className="text-center font-bold text-white"
            style={{ fontSize: 20 }}
          >
            {t("next")}
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </CompatibleSafeAreaView>
  );
};

export default SetPasswordScreen;
