import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'

const QRErrorScreen = () => {
  return (
    <SafeAreaView className='flex-grow'>
      <View className='flex-1 justify-center items-center'>
        <Text>QR Code Error</Text>
      </View>
    </SafeAreaView>
  )
}

export default QRErrorScreen