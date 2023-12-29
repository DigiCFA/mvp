import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import {
  useLogoutMutation,
  useGetSessionQuery,
} from "../redux/api/apiAuthSlice";
import Spinner from "react-native-loading-spinner-overlay";
import { useTranslation } from "react-i18next";

const SettingsColumn = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [
    logout,
    {
      isSuccess: logoutIsSuccess,
      isError: logoutIsError,
      isLoading: logoutIsLoading,
      isFetching: logoutIsFetching,
    },
  ] = useLogoutMutation();
  const {
    isSuccess: sessionIsSuccess,
    isError: sessionIsError,
    isLoading: sessionIsLoading,
    isFetching: sessionIsFetching,
  } = useGetSessionQuery(undefined, {
    skip: !logoutIsSuccess,
  });

  const onPressLogout = async () => {
    try {
      await logout().unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  const preferenceRow = (
    iconName,
    iconSize,
    iconColor,
    preferenceName,
    onPress
  ) => {
    return (
      <TouchableOpacity
        className="py-5 px-4 bg-white items-start flex-row space-x-4"
        onPress={onPress}
        key={preferenceName}
      >
        <Ionicons name={iconName} size={iconSize} color={iconColor} />
        <Text className="text-xl font-medium">{preferenceName}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View className="mt-4">
      <Spinner
        visible={
          logoutIsLoading ||
          logoutIsFetching ||
          logoutIsSuccess ||
          sessionIsFetching
        }
      />
      {preferenceRow("person", 24, "#192C88", t("accountInfo"), () => {
        navigation.navigate("AccountInfo");
      })}
      {preferenceRow("call", 24, "#192C88", t("support"), () => {
        navigation.navigate("Support");
      })}
      {/* {preferenceRow("mail-unread", 24, "#192C88", "Message Center", ()=>{navigation.navigate("MessageCenter")})} */}
      {/* {preferenceRow("shield", 24, "#192C88", "Security", ()=>{navigation.navigate("Security")})} */}
      {preferenceRow("log-out", 24, "#192C88", t("logout"), onPressLogout)}
    </View>
  );
};

export default SettingsColumn;
