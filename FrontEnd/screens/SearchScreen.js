import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ScrollViewComponent,
  ScrollView,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import UsersColumn from "../components/UsersColumn";

const SearchScreen = () => {
  const navigation = useNavigation();

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     tabBarVisible: false,
  //   })
  // }, []);

  return (
    <SafeAreaView className="bg-white flex-1">
      {/* Top Bar */}
      <View className="flex-row items-center space-x-2 pt-2 pb-6 mx-4">
        <TouchableOpacity onPress={navigation.goBack} className="">
          <Ionicons name="arrow-back" size={30} color="grey" />
        </TouchableOpacity>

        {/* Search */}
        <View className="px-4 py-2 rounded-full border-2 border-blue-600 flex-1">
          <TextInput
            placeholder="Phone number, name"
            keyboardType="default"
            className="text-lg font-medium"
          />
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate("Scan")}
          className=""
        >
          <Ionicons name="qr-code" size={24} color="#192C88" />
        </TouchableOpacity>
      </View>

      <ScrollView className="px-4">
        {/* Random Notice */}
        <TouchableOpacity className="py-3 px-4 my-4 bg-white rounded-lg flex-row space-x-4 shadow">
          <Ionicons name="paper-plane" size={40} color="#192C88" />
          <View>
            <Text className="text-lg font-medium mr-10 leading-6">
              Send abroad to banks, cash pick-up locations, and more
            </Text>
          </View>
        </TouchableOpacity>

        <Text className="text-xl text-gray-800 mb-2">Suggested</Text>

        {/* List of top Users */}
        <UsersColumn />

      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchScreen;
