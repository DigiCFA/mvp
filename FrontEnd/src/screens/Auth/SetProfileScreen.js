import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
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
  useSignupMutation,
} from "../../redux/client/signUpSlice";
import Spinner from "react-native-loading-spinner-overlay";
import { useTranslation } from "react-i18next";

const SetProfileScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [firstNameInputFocused, setFirstNameInputFocused] = useState(false);
  const [lastNameInputFocused, setLastNameInputFocused] = useState(false);
  const [errorState, setErrorState] = useState({});
  const [errorM, setErrorM] = useState({});

  const [nameIsValid, setNameIsValid] = useState(false);
  const firstName = useSelector(selectFieldWithAttr("firstName"));
  const lastName = useSelector(selectFieldWithAttr("lastName"));
  const user = useSelector((state) => state.signUp);
  const [signup, { data, isLoading, isSuccess, isError, error }] =
    useSignupMutation();

  const onPressButton = async () => {
    try {
      if (nameIsValid) {
        console.log(user);
        await signup(user).unwrap();
        dispatch(clearAllField());
      } else {
        setErrorM(errorState);
      }
    } catch (error) {
      console.error("error", error);
    }
  };
  useEffect(() => {
    validateForm();
  }, [firstName, lastName]);
  const validateForm = () => {
    let errors = {};

    // Validate name field
    if (!firstName) {
      errors.firstName = t("nameError1");
    } else if (!lastName) {
      errors.lastName = t("nameError2");
    }

    // Set the errors and update form validity
    setErrorState(errors);
    setNameIsValid(Object.keys(errors).length === 0);
  };
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
            {t("setUpProfile")}
          </Text>
          <Text className="font-medium" style={{ fontSize: 18 }}>
            {t("infoAccurate")}
          </Text>
        </View>
      </HideKeyboardView>

      <View className="mx-3 mt-10 space-y-6">
        <TextInput
          placeholder={t("firstName")}
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
          onChangeText={(e) => {
            dispatch(setField({ field: "firstName", content: e }));
          }}
        />
        <Text className="text-red-700" style={{ fontSize: 10 }}>
          {errorM.firstName}
        </Text>
        <TextInput
          placeholder={t("lastName")}
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
          onChangeText={(e) => {
            dispatch(setField({ field: "lastName", content: e }));
          }}
        />
        <Text className="text-red-700" style={{ fontSize: 10 }}>
          {errorM.lastName}
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
    </SafeAreaView>
  );
};

export default SetProfileScreen;
