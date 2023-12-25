import { SafeAreaView, Platform, StatusBar } from 'react-native'
import React from 'react'

const CompatibleSafeAreaView = (props) => {
  return (
    <SafeAreaView style={{paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : "0"}}>
        {props.children}
    </SafeAreaView>
  )
}

export default CompatibleSafeAreaView