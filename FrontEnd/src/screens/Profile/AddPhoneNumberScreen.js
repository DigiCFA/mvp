import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";

// import { Input } from "react-native-elements";
// import { Input } from "@rneui/themed";

const AddPhoneNumberScreen = () => {
  const navigation = useNavigation();

  const [focus, setFocus] = useState(false);

  return (
    <SafeAreaView className="flex-col flex-1">
      <View className="flex-row justify-items-start items-center space-x-2 pt-1 mx-4">
        <TouchableOpacity onPress={navigation.goBack} className="flex-1">
          <Ionicons name="close" size={30} color="#3370E2" />
        </TouchableOpacity>

        <Text className="text-lg font-semibold">Add a phone number</Text>

        <View className="flex-1"></View>
      </View>

      <View className='h-1/3'></View>

      <View className="flex-1 flex-col mx-4">
        <Text className={`${focus ? "text-blueLight" : "text-black"}`}>
          Phone Number
        </Text>
        <TextInput
          keyboardType="numeric"
          // style={focus ? styles.inputOnFocus : styles.inputOnBlur}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          className={`pt-1 pb-2 text-base font-medium border-b ${
            focus ? "border-blueLight" : "border-black"
          }`}
        />
      </View>

      <View className="w-2/3 self-center items-center">
        <TouchableOpacity
          onPress={()=>navigation.navigate("PhoneNumber")}
          className="bg-blueDark rounded-full py-3 w-full"
        >
          <Text className="text-white text-xl font-extrabold self-center">Done</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// const styles = StyleSheet.create({
//     inputOnBlur: {
//         fontSize: 20,
//         paddingTop: 8,
//         paddingBottom: 8,
//         borderBottomWidth: 1,
//         // borderBottomColor: '#3370E2'
//         // borderBottomWidth:'medium',
//         // borderBottomColor: "#3370E2"
//     },
//     inputOnFocus: {
//         fontSize: 20,
//         paddingTop: 8,
//         paddingBottom: 8,
//         borderBottomWidth: 1,
//         borderBottomColor: '#3370E2'
//     }
// })

export default AddPhoneNumberScreen;
