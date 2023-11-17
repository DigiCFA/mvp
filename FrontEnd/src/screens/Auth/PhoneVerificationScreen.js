import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import VerificationCodeInput from "../../components/VerificationCodeInput";

import HideKeyboardView from "../../components/HideKeyboardView";
import { useSelector } from "react-redux";
import { selectFieldWithAttr } from "../../redux/api/signUpSlice";

const PhoneVerificationScreen = () => {

  const phoneNumber = useSelector(selectFieldWithAttr("phoneNumber"));
  const navigation = useNavigation();
  const [errors, setErrors] = useState({});
  const [phoneNumberIsValid, setPhoneNumberIsValid] = useState(false);
  const onVerificationCodeReady = (verificationCode) => {
    navigation.navigate("Password");
  };
  useEffect(() => { 
    validateForm(); 
  }, [phoneNumber]); 
  const validateForm = () => { 
    let error = {}; 

    // Validate password field 
    if (!phoneNumber) { 
      error.phoneNumber = 'phoneNumber is required.'; 
    } else if (phoneNumber.length < 6) { 
      error.phoneNumber = 'phoneNumber must be at least 6 characters.'; 
    } 

    // Set the errors and update form validity 
    setErrors(error); 
    setIsFormValid(Object.keys(errors).length === 0); 
  }; 
  return (
    <HideKeyboardView>
      <SafeAreaView className="flex-1 bg-white">
        <View className="mx-3 my-4 w-6">
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Ionicons name="arrow-back-outline" size={30} color="gray" />
          </TouchableOpacity>
        </View>

        <View className="mx-3 space-y-1">
          <Text style={{ fontSize: 27 }} className="font-semibold">
            Confirm your phone number
          </Text>
          <Text style={{ fontSize: 16 }} className="font-semibold">
            Code sent to {phoneNumber}
          </Text>
        </View>

        <View className="items-center my-4">
          <VerificationCodeInput
            codeLength={6}
            onVerificationCodeReady={onVerificationCodeReady}
          />
        </View>

        <View className="items-center mt-10">
          <TouchableOpacity>
            <Text className="text-blue-800 font-bold" style={{ fontSize: 15 }}>
              Send a new code
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </HideKeyboardView>
  );
};

export default PhoneVerificationScreen;
