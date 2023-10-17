import { View, Text, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Ionicons, FontAwesome5 } from "@expo/vector-icons"
import Currency from 'react-currency-formatter'

const TransactionScreen = () => {

  const { params: {id, userPays, title,  fullDate, message, paymentMethod, amount}} = useRoute();
  const navigation = useNavigation();

  return (
    <SafeAreaView className='grow'>

      {/* Top Bar */}
      <View className="flex-row justify-items-start items-center space-x-2 pt-1 mx-4">
        <TouchableOpacity onPress={navigation.goBack} className="flex-1">
          <Ionicons name="arrow-back" size={30} color="grey" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold">Money {userPays ? "sent" : "received"}</Text>

        <View className="flex-1"></View>
      </View>


      <ScrollView>
        <View className="my-2 p-4 bg-white flex-row space-x-4">
          <View className='h-12 p-2 bg-[#192C88] border rounded-full'>
            <FontAwesome5 name="store-alt" size={24} color="white" />
          </View>
          <View className="flex-col space-y-2 flex-1">

            {/* Row of Title + Transaction amount*/}
            <View className="flex-row">
              <View className="flex-1">
                <Text className="text-xl font-bold">{title}</Text>
              </View>
              <Text className={`text-xl font-medium ${userPays ? 'text-black' : 'text-green-800'}`}>
                {userPays ? "-" : "+"}
                <Currency quantity={Number(amount)} currency="USD" />
              </Text>
            </View>
            <Text className="font-medium">{fullDate}</Text>
            <TouchableOpacity>
              <Text className='font-bold text-blue-600'>Show history</Text>
            </TouchableOpacity>

          </View>
        </View>

        <View className='p-4 bg-white space-y-2'>
          <Text className='text-base font-medium'>{message}</Text>
          <TouchableOpacity>
            <Text className='font-bold text-blue-600'>Show story</Text>
          </TouchableOpacity>
        </View>


        <View className='mt-2 p-4 bg-white space-y-2'>
          <Text className='text-base font-bold'>{userPays ? "From" : "To"}</Text>
          <Text className='text-base font-medium'>{paymentMethod.charAt(0).toUpperCase() + paymentMethod.slice(1)}</Text>
        </View>
        

        <View className='mt-2 p-4 bg-white space-y-2'>
          <Text className='text-base font-bold'>Transaction ID</Text>
          <Text className='text-base font-medium'>{id}</Text>
        </View>

        <View className='mt-2 p-4 bg-white space-y-2'>
          <Text className='text-base font-bold'>Need help?</Text>
          <TouchableOpacity className='flex-row space-x-2'>
            <Ionicons name="warning" size={24} color="#192C88"/>
            <Text className='text-base font-medium'>Report a Problem</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

    </SafeAreaView>
  )
}

export default TransactionScreen