import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import {Entypo} from '@expo/vector-icons'

const TextField = ({prompt, onChangeText, isError,
    isSeparatePrompt=false, style="default", keyBoardType='default', placeholder, ...props}) => {

    const [isPhoneNumberInputFocused, setIsPhoneNumberInputFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false)

    const borderColor = isError ? 'border-red-500' : (
        isPhoneNumberInputFocused ? 'border-blue-500' : 'border-gray-500'
    )
    const borderDisplay = 'border-2'
    const keyboardType = (style==="password") ? 'ascii-capable' : keyboardType
    const onPressShowPassword = () => {
        setShowPassword((prev) => !prev)
    }

    const passwordComponent = (style === "password" && 
        <TouchableOpacity onPress={onPressShowPassword}>
            <Entypo name={showPassword ? "eye" : "eye-with-line" } size={18} color="black"/>
        </TouchableOpacity>)

    const phoneComponent = (style === "phoneNumber" && 
        <TextInput editable={false} style={{fontSize: 18}} className="text-black mr-1 h-full">+1</TextInput>)    

    return isSeparatePrompt ? (
        <View className={`p-2 rounded-md ${borderColor} ${borderDisplay} mt-5`}>
            <Text className="text-gray-400 my-1">{prompt}</Text>
            <View className="flex-row items-center">
                {phoneComponent}
                <TextInput keyboardType={keyBoardType} className="pr-2 flex-1" 
                    onFocus={() => {
                        setIsPhoneNumberInputFocused(true);
                    }}
                    onBlur={() => {
                        setIsPhoneNumberInputFocused(false);
                    }}
                    style={{fontSize: 18}}
                    onChangeText={onChangeText}
                    secureTextEntry={(style==="password") && !showPassword}
                    placeholder={phoneComponent ? '000-000-0000' : placeholder}
                    {...props}
                />
                {passwordComponent}     
            </View>
        </View>
    ):(
        <View className={`flex-row items-center px-3 py-5 rounded-md ${borderColor} ${borderDisplay} mt-5`}>
            {phoneComponent}
            <TextInput
                placeholder={phoneComponent ? '000-000-0000' : placeholder}
                style={{ fontSize: 18}}
                className={`flex-1`}
                keyboardType={keyBoardType}
                onFocus={() => {
                setIsPhoneNumberInputFocused(true);
                }}
                onBlur={() => {
                setIsPhoneNumberInputFocused(false);
                }}
                onChangeText={onChangeText}
                secureTextEntry={(style==="password") && !showPassword}
                {...props}
            />
            {passwordComponent}
        </View>
    )
}

export default TextField