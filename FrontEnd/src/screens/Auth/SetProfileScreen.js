import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

import HideKeyboardView from "../../components/HideKeyboardView";
import {
  selectFieldWithAttr,
  setField,
  clearAllField,
} from "../../redux/client/signUpSlice";
import { useSignupMutation } from "../../redux/api/apiAuthSlice"
import Spinner from "react-native-loading-spinner-overlay";
import { useTranslation } from "react-i18next";
import withFieldError from "../../components/withFieldError";
import TextField from "../../components/TextField";
import { validateSingleField, firstName as firstNameValidation, lastName as lastNameValidation} from "../../utils/userValidation";
import CompatibleSafeAreaView from "../../components/CompatibleSafeAreaView";

const FirstNameWithError = withFieldError(TextField)
const SecondNameWithError = withFieldError(TextField)

const SetProfileScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const firstName = useSelector(selectFieldWithAttr("firstName"))
  const lastName = useSelector(selectFieldWithAttr("lastName"))
  const user = useSelector(state => state.signUp)
  const [signup,{data, isLoading, isSuccess, isError, error}] = useSignupMutation()

  const [fNameIsError, setfNameIsError] = useState(true)
  const [sNameIsError, setsNameIsError] = useState(true)
  const [displayError, setDisplayError] = useState(false)

  const onPressButton = async () => {
    setDisplayError(true)
    try {
      if(!fNameIsError && !sNameIsError){
        await signup(user).unwrap()
        dispatch(clearAllField())
      }
    } catch (error) {
      console.error("error", error);
    }
  }
  
  return (
    <CompatibleSafeAreaView componentStyle="bg-white flex-1">
      <Spinner visible={isLoading} />
      <HideKeyboardView>
        <View className="mx-3 my-4 w-6">
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Ionicons name="arrow-back" size={30} color="gray" />
          </TouchableOpacity>
        </View>
      </HideKeyboardView>

      <HideKeyboardView>
        <View className="mx-3">
          <Text className="font-semibold" style={{ fontSize: 30 }}>
            {t("setUpProfile")}
          </Text>
          <Text className="font-medium" style={{ fontSize: 18 }}>
            {t("infoAccurate")}
          </Text>
        </View>
      </HideKeyboardView>

      <View className="mx-3 space-y-6">
        <FirstNameWithError onChangeText={(e) => dispatch(setField({field: "firstName", content: e}))} 
          onIsErrorChange={setfNameIsError} isDisplayError={displayError} validator={validateSingleField([firstNameValidation])}
          placeholder='First name' value={firstName}
        />
        <SecondNameWithError onChangeText={(e) => {dispatch(setField({field: "lastName", content: e}))}}
          onIsErrorChange={setsNameIsError} isDisplayError={displayError} validator={validateSingleField([lastNameValidation])}
          placeholder='Last name' value={lastName}
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
          onPress={onPressButton}
        >
          <Text
            className="text-center font-bold text-white"
            style={{ fontSize: 20 }}
          >
            Next
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </CompatibleSafeAreaView>
  );
};

export default SetProfileScreen;
