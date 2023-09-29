import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Modal,
  Image
} from "react-native";
import React, { useState } from "react";
import {useDispatch, useSelector} from 'react-redux'

import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import HideKeyboardView from "../../components/HideKeyboardView";
import { clearAllField, selectFieldWithAttr, setField } from "../../redux/reducers/signUpSlice";
import * as apiUtil from "../../utils/api";

const SignupPhoneNumberScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch()

  const [isInputFocused, setIsInputFocused] = useState(true);
  const [modalVisible, setModalVisible] = useState(false)
  const [registeredUser, setRegisteredUser] = useState("")
  const phoneNumber = useSelector(selectFieldWithAttr("phoneNumber"))

  const onPressNext = async function(){
    try {
      let response = await apiUtil.fetchUserByPhoneNumber(phoneNumber)
      let data = response.data

      navigation.navigate("PhoneVerification")

      
      // UNCOMMENT THIS AFTER BACKEND CHANGE HAS BEEN MADE
      // if(!data){
      //   navigation.navigate("PhoneVerification")
      // } else {
      //   setRegisteredUser(data)
      //   setModalVisible(true)
      // }

    } catch(error) {
      console.error(error)
    }
  }

  const modalScreen = (
    registeredUser ? (
      <Modal animationType="slide" transparent={true} visible={modalVisible}
        onRequestClose={() =>{setModalVisible(false)}}>
          <View className="flex-1 justify-end">
            <View className="bg-white items-center py-10 px-9 rounded-3xl shadow-xl relative">

              <View className="absolute left-3 top-3">
                <TouchableOpacity onPress={() => {setModalVisible(false)}}>
                  <Ionicons name="close" size={30} color="gray" />
                </TouchableOpacity>
              </View>

              <Text className="font-bold text-black text-3xl mt-2 mb-1">Welcom Back!</Text>
              <Image source={{uri: registeredUser.profilePicture}} className="rounded-full mt-3 mb-3" height={100} width={100} />
              
              <View className="mb-5 items-center">
                <Text className="font-bold text-black text-xl">{registeredUser.firstName} {registeredUser.lastName}</Text>
                <Text className="font-bold text-black text-xl">{registeredUser.phoneNumber}</Text>
              </View>
              
              <View className="w-full space-y-5 mb-10">
                <TouchableOpacity className="bg-blueDark rounded-full py-3 px-10 items-center"
                  onPress={() => {
                    dispatch(clearAllField())
                    navigation.navigate("Landing")
                    }}>
                  <Text className="font-bold text-white text-lg">Login with this number</Text>
                </TouchableOpacity>

                <TouchableOpacity className="bg-blueDark rounded-full py-3 px-10 items-center">
                  <Text className="font-bold text-white text-lg">Forgot password?</Text>
                </TouchableOpacity>

                <TouchableOpacity className="bg-white rounded-full py-3 px-10 items-center border-2 border-blue-800"
                  onPress={() => {setModalVisible(false)}}>
                  <Text className="font-bold text-blueDark text-lg">Signup with another number</Text>
                </TouchableOpacity>
              </View>

            </View>
          </View>
      </Modal>
    ) : null
  )

  return (
    <HideKeyboardView>
      <SafeAreaView className="flex-1 bg-white relative">

        {modalScreen}

        <View className="mx-3 my-4 w-6">
          <TouchableOpacity
            onPress={() => {
              dispatch(clearAllField())
              navigation.goBack();
            }}
          >
            <Ionicons name="arrow-back-outline" size={24} color="gray" />
          </TouchableOpacity>
        </View>

        <View className="px-3">
          <Text className="text-3xl font-semibold">Phone number</Text>
        </View>

        <View className="mx-3 mt-6 flex-1">
          <View
            className={`border-2 p-2 rounded-md ${
              isInputFocused ? "border-blue-500" : "border-gray-500"
            }`}
          >
            <Text className="text-gray-400">Mobile number</Text>
            <View className="flex-row items-center space-x-0.5">
              <Text style={{ fontSize: 20 }}>+1</Text>
              <TextInput
                style={{ fontSize: 20 }}
                placeholder="000-000-0000"
                value={phoneNumber}
                autoFocus={true}
                keyboardType="numeric"
                className="pr-2 w-full"
                onFocus={() => {
                  setIsInputFocused(true);
                }}
                onBlur={() => {
                  setIsInputFocused(false);
                }}
                onChangeText={(e) => {
                  dispatch(setField({field: "phoneNumber", content: e}))
                }}
              />
            </View>
          </View>

          <Text className="mt-2 text-gray-400">
            By continuing, you confirm that you are authorized to use this phone
            number and agree to receive text messages. Carrier fees may apply
          </Text>
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={10}
        >
          <TouchableOpacity
            className="bg-blueDark rounded-full py-4 mx-3"
            onPress={onPressNext}
          >
            <Text
              className="text-center font-bold text-white"
              style={{ fontSize: 20 }}
            >
              Next
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      
        {modalVisible && (<View className="absolute top-0 left-0 bg-gray-500/40 w-full h-full"></View>)}

      </SafeAreaView>
    </HideKeyboardView>
  );
};

export default SignupPhoneNumberScreen;
