import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ScrollViewComponent,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import UsersColumn from "../../components/UsersColumn";
import { searchUsers } from "../../utils/api";
import ResultsColumn from "../../components/ResultsColumn";

const SearchScreen = () => {
  const navigation = useNavigation();

  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const onChangeQuery = async (newQuery) => {
    setQuery(newQuery);
    // console.log("New query: ", newQuery)
    if (newQuery != "") {
      try {
        let result = await searchUsers(newQuery);
        // console.log("Results: ", result.data)
        setSearchResults(result.data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <SafeAreaView className="bg-white flex-1">
      {/* Top Bar */}
      <View className="flex-row items-center space-x-2 pt-2 pb-6 mx-4">
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          className=""
        >
          <Ionicons name="arrow-back" size={30} color="grey" />
        </TouchableOpacity>

        {/* Search */}
        <View className="px-4 py-2 rounded-full border-2 border-blue-600 flex-1">
          <TextInput
            placeholder="Phone number, name"
            keyboardType="default"
            className="font-medium"
            style={{ fontSize: 18 }}
            value={query}
            onChangeText={(newQuery) => {
              onChangeQuery(newQuery);
            }}
          />
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate("Scan")}
          className=""
        >
          <Ionicons name="qr-code" size={24} color="#192C88" />
        </TouchableOpacity>
      </View>

      {/* <FlatList
        data={searchResults}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
          <View className="flex-col">
            <Text>{item.firstName}</Text>
            <Text>{item.lastName}</Text>
            <Text>{item.phoneNumber}</Text>
          </View>
        )}
        className='grow'
      /> */}

      <ScrollView className="px-4">
        {/* Random Notice */}
        {/* <TouchableOpacity className="py-3 px-4 my-4 bg-white rounded-lg flex-row space-x-4 shadow">
          <Ionicons name="paper-plane" size={40} color="#192C88" />
          <View>
            <Text className="text-lg font-medium mr-10 leading-6">
              Send abroad to banks, cash pick-up locations, and more
            </Text>
          </View>
        </TouchableOpacity> */}

        {query === "" && (
          <View>
            <Text className="text-xl text-gray-800 mb-2">Suggested Contacts</Text>
            <UsersColumn />
          </View>
        )}

        {query !== "" && (
          <View>
            <Text className="text-xl text-gray-800 mb-2">Users on DigiCFA</Text>
            <ResultsColumn users={searchResults}/>
          </View>
        )}


      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchScreen;
