import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { useGetSessionQuery } from "../../redux/api/apiAuthSlice"
import { useFetchUserQuery } from "../../redux/api/apiProfileSlice";

const PhoneNumberScreen = () => {
  const navigation = useNavigation();

  const {data: session} = useGetSessionQuery()
  const {data: user} = useFetchUserQuery(session.userId)
  const phoneNumbers = user.phoneNumbers

  return (
    <View className="h-screen bg-white">
      <View className="bg-default pb-8">
        {/* Top Bar */}
        <View className="flex-row justify-items-start items-center space-x-2 pt-12 mx-4">
          <TouchableOpacity onPress={navigation.goBack} className="flex-1">
            <Ionicons name="arrow-back" size={30} color="#3370E2" />
          </TouchableOpacity>
        </View>

        <View className="mx-10 mt-10 mb-6 flex-col space-y-2">
          <Text className="text-xl font-bold">Phone Numbers</Text>
          <Text className="text-gray-500 font-medium">
            Manage your communication preferences.
          </Text>

          <TouchableOpacity
            onPress={() => navigation.navigate("AddPhoneNumber")}
            className="flex-row pt-10 items-center space-x-2"
          >
            <Ionicons name="add" size={30} color="#3370E2" />
            <Text className="text-base font-semibold text-blueLight">
              Add a phone number
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="bg-white grow p-4">
        {phoneNumbers?.map((phoneNumber, index) => (
          <TouchableOpacity
            key={index}
            onPress={() =>
              navigation.navigate("PhoneNumberDetails", {
                isPrimary: index === 0,
                phoneNumber,
              })
            }
            className="flex-row items-center py-4 border-b border-gray-300"
          >
            <View className="flex-col flex-1 space-y-1">
              <Text className="text-gray-500">
                {index == 0
                  ? "Primary Phone Number"
                  : `Phone Number ${index + 1}`}
              </Text>
              <Text className="text-base font-medium">{phoneNumber}</Text>
            </View>

            <Ionicons name="chevron-forward" size={30} color="black" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default PhoneNumberScreen;
