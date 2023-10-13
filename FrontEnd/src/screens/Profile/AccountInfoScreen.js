import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Touchable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Image } from "expo-image";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchProfilePicById,
  fetchTransactionsById,
  fetchUserById,
  selectProfilePic,
  selectSelf,
  setProfilePic,
} from "../../redux/api/selfSlice";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { launchImageLibrary } from "react-native-image-picker";
import { uploadProfilePicture } from "../../utils/api.js";

import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";

const ID = "64eb0d88eaf1bbe6d5741736";

const AccountInfoScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const self = useSelector(selectSelf);
  const profilePic = useSelector(selectProfilePic);

  const pickPhoto = async () => {
    await ImagePicker.requestCameraPermissionsAsync();

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log("Selected Photo: ", result);

    if (!result.canceled) {
      await uploadProfilePicture(self._id, result.assets[0].uri);

      // Not sure if these are redundant? -> if too slow, can do a setPhoto immediately
      dispatch(fetchProfilePicById(ID));
      profilePic = useSelector(selectProfilePic);
    }
  };

  return (
    <View className="h-screen bg-white">
      <View className="bg-beige pb-8">
        {/* Top Bar */}
        <View className="flex-row justify-items-start items-center space-x-2 pt-12 px-4">
          <TouchableOpacity onPress={navigation.goBack} className="flex-1">
            <Ionicons name="arrow-back" size={30} color="grey" />
          </TouchableOpacity>
          <Text className="text-lg font-semibold">Account info</Text>

          <View className="flex-1"></View>
        </View>

        {/* Profile Pic */}
        <View className="flex-col items-center">
          <View className="p-6">
            <Image
              source={{ uri: profilePic }}
              className="h-24 w-24 rounded-full"
              // style={{width: 100, height: 100}}
            />
          </View>

          <TouchableOpacity onPress={pickPhoto}>
            <Text className=" text-gray-600 font-medium">Change Photo</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* {photo && (
        <View>
          <Image source={{ uri: photo }} className="h-24 w-24 rounded-full" />
        </View>
      )} */}

      <View className="bg-white grow p-4">
        <View className="flex-row items-center pb-4 border-b border-gray-300">
          <View className="flex-col flex-1 space-y-1">
            <Text className="text-gray-500">User ID</Text>
            <Text className="text-base font-medium">{self._id}</Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate("PhoneNumber")}
          className="flex-row items-center py-4 border-b border-gray-300"
        >
          <View className="flex-col flex-1 space-y-1">
            <Text className="text-gray-500">Phone Numbers</Text>
            <Text className="text-base font-medium">{self.phoneNumber}</Text>
          </View>

          <Ionicons name="chevron-forward" size={30} color="black" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Address")}
          className="flex-row items-center py-4 border-b border-gray-300"
        >
          <View className="flex-col flex-1 space-y-1">
            <Text className="text-gray-500">Addresses</Text>
            <Text className="text-base font-medium">
              {self.currentAddress.lineOne}
            </Text>

            {self.currentAddress.lineTwo != "" && (
              <View>
                <Text className="text-base font-medium">
                  {self.currentAddress.lineTwo}
                </Text>
                <Text className="text-base font-medium">
                  {self.currentAddress.city}, {self.currentAddress.zipCode}
                </Text>
              </View>
            )}
          </View>

          <Ionicons name="chevron-forward" size={30} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AccountInfoScreen;
