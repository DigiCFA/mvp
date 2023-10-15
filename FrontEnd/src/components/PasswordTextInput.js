import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import {Entypo} from '@expo/vector-icons'

const PasswordTextInput = ({placeHolder, onChangeText}) => {

    const [showPassword, setShowPassword] = useState(false);
    const [isPasswordInputFocused, setIsPasswordInputFocused] = useState(false);
    const onPress = ()=>{
        setShowPassword(!showPassword)
    }

    return (
        <View className={`flex-row items-center border px-3 py-5 rounded-md ${isPasswordInputFocused ? 'border-blue-500' : 'border-gray-500'} mt-10`}>
            <TextInput placeholder={placeHolder} secureTextEntry={showPassword ? false : true}
                onChangeText={onChangeText} keyboardType='ascii-capable'
                style={{fontSize: 18}} className="flex-1"
                onBlur={() => {setIsPasswordInputFocused(false)}}
                onFocus={() => {setIsPasswordInputFocused(true)}}
                />
            <TouchableOpacity onPress={onPress}>
                <Entypo name={showPassword ? "eye" : "eye-with-line" } size={20} color="black"/>
            </TouchableOpacity>
        </View>
    )
}

export default PasswordTextInput