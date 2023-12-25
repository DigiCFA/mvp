import { SafeAreaView, Platform, StatusBar } from 'react-native'
import React from 'react'

const CompatibleSafeAreaView = ({children, componentStyle}) => {
  console.log(componentStyle)
  return (
    <SafeAreaView style={{paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : "0"}}
      className={componentStyle}>
        {children}
    </SafeAreaView>
  )
}

export default CompatibleSafeAreaView