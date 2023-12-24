import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { selectProfilePicFromUser } from "../../redux/api/apiProfileSlice";
import { useGetSessionQuery } from "../../redux/api/apiAuthSlice";
import {
  useFetchUserQuery,
  useUploadProfilePictureMutation,
} from "../../redux/api/apiProfileSlice";
import * as ImagePicker from "expo-image-picker";
import Spinner from "react-native-loading-spinner-overlay";
import { useTranslation } from "react-i18next";

const AccountInfoScreen = () => {
  const navigation = useNavigation();
  const { t, i18n } = useTranslation();

  const { data: session } = useGetSessionQuery();
  const { data: user, isLoading: fetchUserIsLoading } = useFetchUserQuery(
    session.userId
  );
  const [
    uploadProfilePic,
    {
      isLoading: profileUploadIsLoading,
      isError: profileUploadIsError,
      isFetching: profileUploadIsFetching,
      isSuccess: profileUploadIsSuccess,
    },
  ] = useUploadProfilePictureMutation();
  const profilePic = useSelector(selectProfilePicFromUser(session.userId));

  const pickPhoto = async () => {
    await ImagePicker.requestCameraPermissionsAsync();

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      try {
        const imageURI = result.assets[0].uri;
        await uploadProfilePic({
          userId: session.userId,
          imageURI: imageURI,
        }).unwrap();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const addressSection = () => {
    if (
      Object.values(user?.addresses[0])
        .slice(0, -1)
        .every((value) => value === "Not set")
    ) {
      return <Text className="text-base font-medium">Not Set</Text>;
    }
    return (
      <>
        <Text className="text-base font-medium">
          {user?.addresses[0].lineOne}
        </Text>
        <View>
          {user?.addresses[0].lineTwo != "Not Set" && (
            <Text className="text-base font-medium">
              {user?.addresses[0].lineTwo}
            </Text>
          )}
          <Text className="text-base font-medium">
            {user?.addresses[0].city}, {user?.addresses[0].zipCode}
          </Text>
        </View>
      </>
    );
  };

  return (
    <View className="h-screen bg-white">

      <Spinner visible={profileUploadIsLoading | fetchUserIsLoading}/>

      <View className="bg-beige pb-8">
        {/* Top Bar */}
        <View className="flex-row justify-items-start items-center space-x-2 pt-12 px-4">
          <TouchableOpacity onPress={navigation.goBack} className="flex-1">
            <Ionicons name="arrow-back" size={30} color="grey" />
          </TouchableOpacity>
          <Text className="text-lg font-semibold">{t('accountInfo')}</Text>

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
            <Text className=" text-gray-600 font-medium">{t('changePhoto')}</Text>
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
            <Text className="text-gray-500">{t('userId')}</Text>
            <Text className="text-base font-medium">{user?._id}</Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate("PhoneNumber")}
          className="flex-row items-center py-4 border-b border-gray-300"
        >
          <View className="flex-col flex-1 space-y-1">
            <Text className="text-gray-500">{t('phoneNumbers')}</Text>
            <Text className="text-base font-medium">{user?.phoneNumber}</Text>
          </View>

          <Ionicons name="chevron-forward" size={30} color="black" />
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-row items-center py-4 border-b border-gray-300"
        >
          <View className="flex-col flex-1 space-y-1">
            <Text className="text-gray-500">{t('addresses')}</Text>
            {/* {addressSection()} */}
          </View>

          <Ionicons name="chevron-forward" size={30} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AccountInfoScreen;
