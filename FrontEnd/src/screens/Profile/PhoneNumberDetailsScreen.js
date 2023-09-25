import { View, Text, SafeAreaView, TouchableOpacity, Switch } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Ionicons, FontAwesome5 } from "@expo/vector-icons"
import Currency from 'react-currency-formatter'
import { ScrollView } from 'react-native-gesture-handler'

const PhoneNumberDetailsScreen = () => {

  const { params: {isPrimary, phoneNumber}} = useRoute();
  const navigation = useNavigation();

  const [phoneEnabled, setPhoneEnabled] = useState(true);
  const [textEnabled, setTextEnabled] = useState(true);

  return (
    <View className='h-screen bg-white'>
      <View className='bg-default pb-8'>
        {/* Top Bar */}
        <View className="flex-row justify-items-start items-center space-x-2 pt-1 mx-4 pt-12">
          <TouchableOpacity onPress={navigation.goBack} className="flex-1">
            <Ionicons name="arrow-back" size={30} color="#3370E2" />
          </TouchableOpacity>
          <Text className="text-lg font-semibold">Phone number</Text>

          <View className="flex-1"></View>
        </View>

        
        <View className="mx-10 mt-10 mb-6 flex-col">
          <Text className="text-base font-medium text-gray-600">{isPrimary === true ? "Primary" : "Secondary"}</Text>
          <Text className="text-xl font-bold">{phoneNumber}</Text>
          <Text className="text-sm font-medium  text-gray-600 pt-4">
            {isPrimary === true ? "This number is your primary method of login. To change it, please select another phone number as your primary phone number." : "This number can be used to receive notifications."}
          </Text>
        </View>
      </View>

      <View className='bg-white grow px-4'>
        {isPrimary !== true && (
          <TouchableOpacity className='flex-row py-8 px-4 items-center space-x-8 border-b border-gray-300'>
            <FontAwesome5 name="pen" size={24} color="#3370E2"/>
            <Text className="text-base font-semibold text-gray-600">Change to primary phone number</Text>
          </TouchableOpacity>
        )}

        <Text className="text-xs font-medium  text-gray-600 py-8">
          If this is your mobile number, you give us permission to contact you about your DigiCFA branded accounts using automated calls or texts to service your accounts, investigate fraud, or collect a debt, but not for telemarketing. Let us know if you want us to do the following:
        </Text>

        <View className='flex-row px-4 py-4 border-b border-gray-300'>
          <View className='flex-col flex-1'>
            <Text>Contact you using automated calls</Text>
          </View>
          <Switch 
            onValueChange={()=>setPhoneEnabled(prevState => !prevState)}
            value={phoneEnabled}
          />
        </View>

        <View className='flex-row px-4 pt-8 pb-4 border-b border-gray-300'>
          <View className='flex-col flex-1'>
            <Text>Send you text messages</Text>
          </View>
          <Switch 
            onValueChange={()=>setTextEnabled(prevState => !prevState)}
            value={textEnabled}
          />
        </View>

        
      </View>

    </View>
  )
}

export default PhoneNumberDetailsScreen