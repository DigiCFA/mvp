import { View, Text, SafeAreaView, TouchableOpacity, Keyboard } from 'react-native'
import React, {useEffect} from 'react'
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';

import VerificationCodeInput from '../../components/VerificationCodeInput';

import HideKeyboardView from '../../components/HideKeyboardView'

const PhoneVerificationScreen = () => {

    const phoneNumber = "+1 123 123 1234"
    
    const navigation = useNavigation()

    const onVerificationCodeReady = (verificationCode) => {
        navigation.navigate("Password")
    }

    return (
        <HideKeyboardView>
            <SafeAreaView className="flex-1 "> 
                <View className="mx-3 my-4 w-6">
                    <TouchableOpacity onPress={()=>{navigation.goBack()}}>
                        <Ionicons name="arrow-back-outline" size={24} color="gray" />
                    </TouchableOpacity>
                </View>

                <View className="mx-3 space-y-1">
                    <Text style={{fontSize: 27}} className="font-semibold">Confirm your phone number</Text>
                    <Text style={{fontSize: 16}} className="font-semibold">Code sent to {phoneNumber}</Text>
                </View>

                <View className="items-center my-4">
                    <VerificationCodeInput codeLength={6} onVerificationCodeReady={onVerificationCodeReady} />
                </View>

                <View className="items-center mt-10">
                    <TouchableOpacity>
                        <Text className="text-blue-800 font-bold" style={{fontSize: 15}}>Send a new code</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </HideKeyboardView>
    )
}

export default PhoneVerificationScreen