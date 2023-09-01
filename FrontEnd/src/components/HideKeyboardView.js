import { View, Text, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React from 'react'

const HideKeyboardView = ({children}) => {
  return (
    <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
        {children}
    </TouchableWithoutFeedback>
  )
}

export default HideKeyboardView