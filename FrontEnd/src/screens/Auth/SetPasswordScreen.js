import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {useDispatch} from 'react-redux'

import PasswordTextInput from "../../components/PasswordTextInput";
import HideKeyboardView from "../../components/HideKeyboardView";
import { setField } from "../../redux/api/signUpSlice";

const SetPasswordScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [errorState, setErrorState] = useState({});
  const [errorM, setErrorM] = useState({});

  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [password, setPassword] = useState("");
  const [retypedPassword, setRetypedPassword] = useState("");
  useEffect(() => { 
    validateForm(); 
  }, [password,retypedPassword]); 
  const validateForm = () => { 
    let errors = {}; 

    

    // Validate password field 
    if (!password) { 
        errors.password = 'Password is required.'; 
    } else if (password.length < 6) { 
        errors.password = 'Password must be at least 6 characters.'; 
    }
    else if (password !== retypedPassword) { 
      errors.retypedPassword = 'Passwords must match.';
    }

    // Set the errors and update form validity 
    setErrorState(errors); 
    setPasswordIsValid(Object.keys(errors).length === 0); 
  }; 

  return (
    <SafeAreaView className="flex-1 bg-white">
      <HideKeyboardView>
        <View className="mx-3 my-4 w-6">
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Ionicons name="arrow-back-outline" size={24} color="gray" />
          </TouchableOpacity>
        </View>
      </HideKeyboardView>

      <HideKeyboardView>
        <View className="mx-3">
          <Text className="font-semibold" style={{ fontSize: 30 }}>
            How you'll log in
          </Text>
          <Text className="font-medium" style={{ fontSize: 18 }}>
            Make sure you keep it secure.
          </Text>
        </View>
      </HideKeyboardView>

      <View className="mx-3">
        <PasswordTextInput
          placeHolder={"Password"}
          onChangeText={setPassword}
        />
        <Text className="text-red-700" style={{ fontSize: 10 }}>
          {errorM.password}
          </Text>
        <PasswordTextInput
          placeHolder={"Retype Password"}
          onChangeText={setRetypedPassword}
        />
        <Text className="text-red-700" style={{ fontSize: 10 }}>
            {errorM.retypedPassword}
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
          onPress={() => {
            if(passwordIsValid){
              dispatch(setField({field: "password", content: password}))
              navigation.navigate("Profile");
            }
            else{
              setErrorM(errorState)

            }
          }}
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

export default SetPasswordScreen;
