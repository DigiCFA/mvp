import { View, Text, SafeAreaView, TextInput, KeyboardAvoidingView, Platform} from 'react-native'
import React, {useState} from 'react'

import { Ionicons } from '@expo/vector-icons'; 
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import HideKeyboardView from '../../components/HideKeyboardView';

const SignupPhoneNumberScreen = () => {

    const navigation = useNavigation()

    const [isInputFocused, setIsInputFocused] = useState(true)

    return (
        <HideKeyboardView>
            <SafeAreaView className="flex-1">
                
                <View className="mx-3 my-4 w-6">
                    <TouchableOpacity onPress={()=>{navigation.goBack()}}>
                        <Ionicons name="arrow-back-outline" size={24} color="gray" />
                    </TouchableOpacity>
                </View>

                <View className="px-3">
                    <Text className="text-3xl font-semibold">Phone number</Text>
                </View>

                <View className="mx-3 mt-6 flex-1">

                    <View className={`border-2 p-2 rounded-md ${isInputFocused ? 'border-blue-500' : 'border-gray-500'}`}>
                        <Text className="text-gray-400">Mobile number</Text>
                        <View className="flex-row items-center space-x-0.5">
                            <Text style={{fontSize: 20}}>+1</Text>
                            <TextInput style={{fontSize: 20}} placeholder='000-000-0000' 
                                autoFocus={true} keyboardType='numeric' className="pr-2 w-full"
                                onFocus={() => {setIsInputFocused(true)}} 
                                onBlur={() => {setIsInputFocused(false)}}
                            />
                        </View>
                    </View>

                    <Text className="mt-2 text-gray-400">
                        By continuing, you confirm that you are authorized to use this phone number and agree to receive text messages. Carrier fees may apply
                    </Text>

                </View>

                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={10}>
                    <TouchableOpacity className="bg-blue-800 rounded-full py-4 mx-3" 
                        onPress={()=>{navigation.navigate("PhoneVerification")}}>
                        <Text className="text-center font-bold text-white" style={{fontSize: 20}}>Next</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>

            </SafeAreaView>
        </HideKeyboardView>                
    )
}

export default SignupPhoneNumberScreen