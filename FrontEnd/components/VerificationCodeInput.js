import { View, Text, TextInput, Pressable, Keyboard} from 'react-native'
import React,{useRef, useState, useEffect, useLayoutEffect} from 'react'

const VerificationCodeInput = ({codeLength, onVerificationCodeReady}) => {

    const [verificationCode, setVerificationCode] = useState("")
    const [isCodeReady, setIsCodeReady] = useState(false)
    const [isInputBoxFocused, setIsInputBoxFocused] = useState(false)
    const maximumCodeLength = codeLength

    const inputRef = useRef(null)

    const handleOnBlur = () => {
        setIsInputBoxFocused(false)
    }
    
    const handleOnPress = () => {
        setIsInputBoxFocused(true)
        inputRef.current.focus()
    }

    useEffect(() => {
        setIsCodeReady(verificationCode.length === maximumCodeLength)

        return () => {
            setIsCodeReady(false)
        }
    }, [verificationCode])

    useEffect(() => {
        if(isCodeReady){
            onVerificationCodeReady(verificationCode)
        }
    }, [isCodeReady])

    useLayoutEffect(() => {
        inputRef.current.focus()
        handleOnPress()
    }, [])

    const boxArray = new Array(maximumCodeLength).fill(0)
    const boxDigit = (_, index) => {
        const digit = verificationCode[index] || ""

        const isCurrentValue = (index === verificationCode.length)
        const isLastValue = (index === maximumCodeLength - 1)
        const isCodeComplete = (verificationCode.length === maximumCodeLength)

        const isValueFocused = isCurrentValue || (isLastValue && isCodeComplete)

        return (
            <View className={`border-b-2 ${(isInputBoxFocused && isValueFocused) ? 'border-blue-500' : 'border-gray-500' } 
                w-12 h-12 align-bottom`} key={index}>
                <Text className="text-center text-black" style={{fontSize: 40}} >{digit}</Text>
            </View>
        )
    }

    return (
        <View className="justify-center items-center relative">
            <Pressable className=" flex-row justify-evenly space-x-3">
                {boxArray.map(boxDigit)}
            </Pressable>

            <TextInput className="absolute opacity-0 top-0 bottom-0 left-0 right-0"
                value={verificationCode} onChangeText={setVerificationCode}
                maxLength={maximumCodeLength} ref={inputRef} onBlur={handleOnBlur} 
                keyboardType='numeric' onPressIn={handleOnPress} />
        </View>
    )
} 

export default VerificationCodeInput