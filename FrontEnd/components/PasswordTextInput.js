import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import {Entypo} from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'

const PasswordTextInput = ({onChangeText}) => {

    [showPassword, setShowPassword] = useState(false);
    const [isPasswordInputFocused, setIsPasswordInputFocused] = useState(false);

    return (
        <View className={`flex-row items-center border px-3 py-4 rounded-md ${isPasswordInputFocused ? 'border-blue-500' : 'border-gray-500'} mt-10`}>
            <TextInput placeholder='Password' secureTextEntry={showPassword ? false : true}
                onChangeText={onChangeText} keyboardType='ascii-capable'
                style={{fontSize: 18}} className="flex-1"
                onBlur={() => {setIsPasswordInputFocused(false)}}
                onFocus={() => {setIsPasswordInputFocused(true)}}
                />
            <TouchableOpacity onPress={()=>{setShowPassword(!showPassword)}}>
                <Entypo name={showPassword ? "eye" : "eye-with-line" } size={20} color="black"/>
            </TouchableOpacity>
        </View>
    )
}

export default PasswordTextInput