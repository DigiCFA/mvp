import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { useLogoutMutation } from "../redux/reducers/apiAuthSlice";
import Spinner from "react-native-loading-spinner-overlay";

const SettingsColumn = () => {
  const navigation = useNavigation()
  const [logout, {data, isSuccess, isError, isLoading}] = useLogoutMutation()
  const onPressLogout = async () => {
    try{
      console.log("invoking logout")
      await logout().unwrap()
    } catch(error){
      console.log(error)
    }
  }

  const preferenceRow = (iconName, iconSize, iconColor, preferenceName, onPress) => {
    return (
      <TouchableOpacity className="py-5 px-4 bg-white items-start flex-row space-x-4"
        onPress={onPress}
        key={preferenceName}>
        <Ionicons name={iconName} size={iconSize} color={iconColor} />
        <Text className="text-xl font-medium">{preferenceName}</Text>
      </TouchableOpacity>
    )
  }

  return (
    <View className="mt-2">
      <Spinner visible={isLoading} />
      {preferenceRow("person", 24, "#192C88", "Account Info", ()=>{navigation.navigate("AccountInfo")})}
      {preferenceRow("mail-unread", 24, "#192C88", "Message Center", ()=>{navigation.navigate("MessageCenter")})}
      {preferenceRow("shield", 24, "#192C88", "Security", ()=>{navigation.navigate("Security")})}
      {preferenceRow("log-out", 24, "#192C88", "Log Out", onPressLogout)}
    </View>
  );
};

export default SettingsColumn;
