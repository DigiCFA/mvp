import { View, Text, SafeAreaView, Image, TextInput, Touchable} from 'react-native'
import React, {useState} from 'react'

import {FontAwesome} from '@expo/vector-icons'
import PasswordTextInput from '../../components/PasswordTextInput'
import HideKeyboardView from '../../components/HideKeyboardView'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

const LoginSignupLandingScreen = () => {

    const [password, setPassword] = useState('')
    const [isPhoneNumberInputFocused, setIsPhoneNumberInputFocused] = useState(false)

    const navigation = useNavigation()

    return (
        <SafeAreaView className="items-center bg-white flex-1" >

            <HideKeyboardView>
                <View className="mt-5 w-full items-center">
                    <FontAwesome name="paypal" size={50} color="blue" />
                </View>
            </HideKeyboardView>

            <View className="w-full px-10">
                <TextInput placeholder='Phone number' 
                    style={{fontSize: 18}} 
                    className={`border px-3 py-4 rounded-md ${isPhoneNumberInputFocused ? 'border-blue-500' : 'border-gray-500'} mt-10`} 
                    keyboardType='numeric' onFocus={() => {setIsPhoneNumberInputFocused(true)}} 
                    onBlur={() => {setIsPhoneNumberInputFocused(false)}} />
                
                <PasswordTextInput onChangeText={(text) => {setPassword(text)}} />
                
                <TouchableOpacity className="mt-1.5">
                    <Text className=" text-blue-800 font-bold">Forgotten your password?</Text>
                </TouchableOpacity>
            </View>

            <HideKeyboardView>
                <View className="w-full space-y-3 mt-10 px-10 flex-1">
                    <TouchableOpacity className="rounded-full bg-blue-800 py-3">
                        <Text style={{fontSize: 18}} className="text-center text-white font-bold">Log In</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity className="rounded-full border-blue-800 border-2 py-3" onPress={() => {navigation.navigate("PhoneNumber")}}>
                        <Text style={{fontSize: 18}} className="text-center font-bold text-blue-800">Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </HideKeyboardView>

        </SafeAreaView>
    )
}

export default LoginSignupLandingScreen