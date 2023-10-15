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
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import UsersColumn from "../../components/UsersColumn";
import { searchUsers } from "../../utils/api";
import ResultsColumn from "../../components/ResultsColumn";
import Spinner from "react-native-loading-spinner-overlay";
import {
  useFetchSearchResultsQuery,
  useLazyFetchSearchResultsQuery,
} from "../../redux/api/apiProfileSlice";

const SearchScreen = () => {
  const navigation = useNavigation();

  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // const {
  //   data = [],
  //   error,
  //   isError,
  //   isSuccess,
  //   isLoading,
  //   isFetching,
  // } = useFetchSearchResultsQuery(query, {
  //   skip: query == "",
  // });

  const [fetchSearchResults, {data, error, isLoading, isFetching, isSuccess, isError}] = useLazyFetchSearchResultsQuery();

  const onChangeQuery = async (newQuery) => {
    setQuery(newQuery);

    if (newQuery != "") {
      try {
        const response = await fetchSearchResults(newQuery).unwrap()
        setSearchResults(response)
      } catch (error) {
        console.error(error)
      }
    }

    // if (newQuery === "") {
    // } else {

    //   // await fetchSearchResults().unwrap();
    //   // console.log(data);
    //   setSearchResults(data);
    //   //   console.log("Is successful? ", isSuccess);
    //   //   if (isSuccess) {
    //   //     setSearchResults(data);
    //   //   }
    //   //   if (isError) {
    //   //     console.error(error);
    //   //   }
    // }
  };

  let content = <ResultsColumn users={searchResults} />;

  if (isLoading) {
    // content = <Spinner text="First time..." />;
    content = <Text>Is Loading</Text>;
  } else if (isFetching) {
    console.log("Fetching");
    // content = <Spinner text="Fetching..." />;
    content = <Text>Is Fetching</Text>;
  } else if (isSuccess) {
    // console.log("Finished fetching");
    // console.log(searchResults);
    content = <ResultsColumn users={searchResults} />;
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  } else {
    console.log("NOT FETCHING");
  }

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
            autoCorrect={false}
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

        {/* <Spinner visible={isLoading} /> */}

        {/* {error && (
          <View>
            <Text>ERROR: {error}</Text>
          </View>
        )} */}

        {query==="" ? (
          <View>
            <Text className="text-xl text-gray-800 mb-2">
              Suggested Contacts
            </Text>
            <UsersColumn />
          </View>
        ) : (
          <View>
            <Text className="text-xl text-gray-800 mb-2">Users on DigiCFA</Text>
            {content}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchScreen;
