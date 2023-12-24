import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Modal,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Ionicons } from "@expo/vector-icons";
import Spinner from "react-native-loading-spinner-overlay";
import { useNavigation } from "@react-navigation/native";
import { useFetchUserByPhoneNumberQuery } from "../../redux/api/apiProfileSlice";
import HideKeyboardView from "../../components/HideKeyboardView";
import {
  clearAllField,
  selectFieldWithAttr,
  setField,
} from "../../redux/api/signUpSlice";
import { useTranslation } from "react-i18next";
import { validateSingleField, phoneNumberValidation } from "../../utils/userValidation";
import withFieldError from "../../components/withFieldError";
import TextField from "../../components/TextField";

const PhoneWithError = withFieldError(TextField)

const SignupPhoneNumberScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState(false);
  const [skip, setSkip] = useState(true);
  const [phoneNumberIsValid, setPhoneNumberIsValid] = useState(false);
  const [displayError, setDisplayError] = useState(false);

  const phoneNumber = useSelector(selectFieldWithAttr("phoneNumber"));
  const {
    isLoading,
    isSuccess,
    isError,
    data: registeredUser,
    error,
    isFetching,
  } = useFetchUserByPhoneNumberQuery(phoneNumber, {
    skip: skip,
  });


  const onPressNext = () => {
    setDisplayError(true)
    if (phoneNumberIsValid) {
      setSkip(false);
    }
  };

  const onModalClosed = () => {
    setModalVisible(false);
    setSkip(true);
  };

  useEffect(() => {
    if (isSuccess && !isFetching) {
      setModalVisible(true);
    } else if (isError) {
      setSkip(true);
      navigation.navigate("PhoneVerification");
    }
  }, [isSuccess, isError, isFetching]);

  const modalScreen = (user) => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={onModalClosed}
    >
      <View className="flex-1 justify-end">
        <View className="bg-white items-center py-10 px-9 rounded-3xl shadow-xl relative">
          <View className="absolute left-3 top-3">
            <TouchableOpacity onPress={onModalClosed}>
              <Ionicons name="close" size={30} color="gray" />
            </TouchableOpacity>
          </View>

          <Text className="font-bold text-black text-3xl mt-2 mb-1">
            {t("welcomeBack")}
          </Text>
          <Image
            source={{ uri: user.profilePicture }}
            className="rounded-full mt-3 mb-3"
            height={100}
            width={100}
          />

          <View className="mb-5 items-center">
            <Text className="font-bold text-black text-xl">
              {user.firstName} {user.lastName}
            </Text>
            <Text className="font-bold text-black text-xl">
              {user.phoneNumber}
            </Text>
          </View>

          <View className="w-full space-y-5 mb-10">
            <TouchableOpacity
              className="bg-blueDark rounded-full py-3 px-10 items-center"
              onPress={() => {
                dispatch(clearAllField());
                navigation.navigate("Landing");
              }}
            >
              <Text className="font-bold text-white text-lg">
                {t("loginWithNumber")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity className="bg-blueDark rounded-full py-3 px-10 items-center">
              <Text className="font-bold text-white text-lg">
                {t("forgottenPassword")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-white rounded-full py-3 px-10 items-center border-2 border-blue-800"
              onPress={onModalClosed}
            >
              <Text className="font-bold text-blueDark text-lg">
                {t("signupWithAnotherNumber")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <HideKeyboardView>
      <SafeAreaView className="flex-1 bg-white relative">
        <Spinner visible={isLoading || isFetching} />

        {isSuccess ? modalScreen(registeredUser) : null}

        <View className="mx-3 my-4 w-6">
          <TouchableOpacity
            onPress={() => {
              dispatch(clearAllField());
              navigation.goBack();
            }}
          >
            <Ionicons name="arrow-back-outline" size={24} color="gray" />
          </TouchableOpacity>
        </View>

        <View className="px-3">
          <Text className="text-3xl font-semibold">{t("phoneNumber")}</Text>
        </View>

        <View className="mx-3 flex-1">
          <PhoneWithError style="phoneNumber" isSeparatePrompt={true} prompt={t("phoneNumber")}
            onChangeText={(e) => {
              dispatch(setField({ field: "phoneNumber", content: e }));
            }}
            value={phoneNumber} keyBoardType='numeric' onIsErrorChange={(e) => {setPhoneNumberIsValid(!e)}}
            isDisplayError={displayError} validator={validateSingleField([phoneNumberValidation])}
          />

          <Text className="mt-2 text-gray-400">
            {t('phoneNumberAuth')}
          </Text>
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={10}
        >
          <TouchableOpacity
            className={"bg-blueDark rounded-full py-4 mx-3 mb-3"}
            onPress={onPressNext}
          >
            <Text
              className="text-center font-bold text-white"
              style={{ fontSize: 20 }}
            >
              {t('next')}
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>

        {modalVisible && (
          <View className="absolute top-0 left-0 bg-gray-500/40 w-full h-full"></View>
        )}
      </SafeAreaView>
    </HideKeyboardView>
  );
};

export default SignupPhoneNumberScreen;
