import { useLoginMutation, useGetSessionQuery } from "../../redux/api/apiAuthSlice";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";

import PasswordTextInput from "../../components/PasswordTextInput";
import HideKeyboardView from "../../components/HideKeyboardView";
import Spinner from "react-native-loading-spinner-overlay";
import {View, Text, SafeAreaView, Image, TextInput, TouchableOpacity } from "react-native";

const LoginSignupLandingScreen = () => {
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isPhoneNumberInputFocused, setIsPhoneNumberInputFocused] = useState(false);
  const [errorState, setErrorState] = useState({});
  const [errorM, setErrorM] = useState({});

  const [isValid, setIsValid] = useState(false);
  const [login, {error: loginError, isFetching: loginIsLoading, isLoading: loginIsFetching, 
    isSuccess: loginIsSuccess, isError: loginIsError}] = useLoginMutation();
  
  const {data: session, isFetching: sessionIsFetching, isLoading: sessionIsLoading, 
    isSuccess: sessionIsSuccess, isError: sessionIsError} = useGetSessionQuery()

  const navigation = useNavigation();

  const onPressLogin = async () => {
    const user = {
      phoneNumber: phoneNumber,
      password: password,
    };
    try {
      if(isValid){
        await login(user).unwrap()
      }
      else{
        setErrorM(errorState)
      }
    } catch (err) {
      console.error("error", err)
    }
  };
  useEffect(() => { 
    validateForm(); 
  }, [phoneNumber,password]); 
  const validateForm = () => { 
    let errors = {}; 

    // Validate phoneNumber field 
    if (!phoneNumber) { 
      errors.phoneNumber = 'phoneNumber is required.'; 
    } else if (phoneNumber.length !== 10) { 
      errors.phoneNumber = 'phoneNumber must be at least 6 characters.'; 
    } 
    // Validate password field 
    if (!password) { 
      errors.password = 'Password is required.'; 
    }

    // Set the errors and update form validity 
    setErrorState(errors); 
    setIsValid(Object.keys(errors).length === 0); 
  }; 
  return (
    <SafeAreaView className="items-center bg-white flex-1">

      <Spinner visible={loginIsFetching || loginIsSuccess ||sessionIsFetching}/>

      <HideKeyboardView>
        <View className="mt-5 w-full items-center">
          <Image 
          source={require('../../../assets/DigiCFA.png')}
          className='h-24 w-20 ml-4' />
          {/* <FontAwesome name="paypal" size={50} color="blue" /> */}
        </View>
      </HideKeyboardView>

      <View className="w-full px-10">
        <TextInput
          placeholder="Phone number"
          style={{ fontSize: 18 }}
          className={`border px-3 py-5 rounded-md ${
            isPhoneNumberInputFocused ? "border-blue-500" : "border-gray-500"
          } mt-10`}
          keyboardType="numeric"
          onFocus={() => {
            setIsPhoneNumberInputFocused(true);
          }}
          onBlur={() => {
            setIsPhoneNumberInputFocused(false);
          }}
          onChangeText={setPhoneNumber}
        />
        <Text className="text-red-700" style={{ fontSize: 10 }}>
          {errorM.phoneNumber}
        </Text>
        <PasswordTextInput
          placeHolder={"Password"}
          onChangeText={setPassword}
        />
        <Text className="text-red-700" style={{ fontSize: 10 }}>
          {errorM.password}
        </Text>
        <TouchableOpacity className="mt-1.5">
          <Text className=" text-blue-800 font-bold">
            Forgotten your password?
          </Text>
        </TouchableOpacity>
      </View>

      <HideKeyboardView>
        <View className="w-full space-y-3 mt-10 px-10 flex-1">
          <TouchableOpacity
            className="rounded-full bg-blue-800 py-3"
            onPress={onPressLogin}
          >
            <Text
              style={{ fontSize: 18 }}
              className="text-center text-white font-bold"
            >
              Log In
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="rounded-full border-blue-800 border-2 py-3"
            onPress={() => {
              navigation.navigate("PhoneNumber");
            }}
          >
            <Text
              style={{ fontSize: 18 }}
              className="text-center font-bold text-blue-800"
            >
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </HideKeyboardView>
    </SafeAreaView>
  );
};


export default LoginSignupLandingScreen;
