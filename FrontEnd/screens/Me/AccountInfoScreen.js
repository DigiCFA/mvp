import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Touchable,
} from "react-native";
import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchProfilePicById,
  fetchTransactionsById,
  fetchUserById,
  selectProfilePic,
  selectSelf,
} from "../../features/selfSlice";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { launchImageLibrary } from "react-native-image-picker";
import { handleUploadPhoto } from "../../api/api.js";

import * as ImagePicker from "expo-image-picker";

const ID = "64c673c724782ec4c7fb2d8f";

// const createFormData = (photo, body = {}) => {
//   const data = new FormData();

//   data.append("profilePicture", {
//     name: photo.fileName,
//     type: photo.type,
//     uri: Platform.OS === "ios" ? photo.uri.replace("file://", "") : photo.uri,
//   });

//   Object.keys(body).forEach((key) => {
//     data.append(key, body[key]);
//   });

//   return data;
// };

const AccountInfoScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserById(ID));
    dispatch(fetchTransactionsById(ID));
  }, []);

  const self = useSelector(selectSelf);

  const [photo, setPhoto] = useState(null);

  const pickPhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log("PHOTO PICKED: ", result);

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
      await handleUploadPhoto(userId=self._id, profilePicture=photo);
    }
  };

  return (
    <SafeAreaView className="flex-col">
      {/* Top Bar */}
      <View className="flex-row justify-items-start items-center space-x-2 pt-1 mx-4">
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
            source={{ uri: self.profilePicture }}
            className="h-24 w-24 rounded-full"
            // style={{width: 100, height: 100}}
          />
        </View>

        <TouchableOpacity onPress={pickPhoto}>
          <Text className=" text-gray-600 font-medium">Change Photo</Text>
        </TouchableOpacity>
      </View>

      {photo && (
        <View>
          <Image source={{ uri: photo }} className="h-24 w-24 rounded-full" />
        </View>
      )}

      <View className="bg-white p-4 mt-8">
        <View className="flex-row items-center pb-4 border-b border-gray-300">
          <View className="flex-col flex-1 space-y-1">
            <Text className="text-gray-500">User ID</Text>
            <Text className="text-base font-medium">{self._id}</Text>
          </View>
        </View>

        <TouchableOpacity className="flex-row items-center py-4 border-b border-gray-300">
          <View className="flex-col flex-1 space-y-1">
            <Text className="text-gray-500">Phone Numbers</Text>
            <Text className="text-base font-medium">{self.phoneNumber}</Text>
          </View>

          <Ionicons name="chevron-forward" size={30} color="black" />
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center py-4 border-b border-gray-300">
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

        <Text className="p-10">
          Upon entering this screen, Redux calls the fetchUserById thunk and
          modifies the global store by fetching the user information from
          MongoDB. The user information across the app is updated. This should
          happen at the login screen but for convenience's sake is implemented
          here.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default AccountInfoScreen;
