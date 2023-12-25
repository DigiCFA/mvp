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
import ResultsColumn from "../../components/ResultsColumn";
import Spinner from "react-native-loading-spinner-overlay";
import { useLazyFetchSearchResultsQuery } from "../../redux/api/apiProfileSlice";
import ContentLoader from "react-native-easy-content-loader";
import { useTranslation } from "react-i18next";
import CompatibleSafeAreaView from "../../components/CompatibleSafeAreaView";

const SearchScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [
    fetchSearchResults,
    { data, error, isLoading, isFetching, isSuccess, isError },
  ] = useLazyFetchSearchResultsQuery();

  const onChangeQuery = async (newQuery) => {
    setQuery(newQuery);

    if (newQuery != "") {
      try {
        const response = await fetchSearchResults(newQuery).unwrap();
        setSearchResults(response);
      } catch (error) {
        console.error(error);
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

  if (isLoading || isFetching) {
    // console.log("Fetching");
    content = (
      <ContentLoader active title={false} pHeight={48} pWidth={"100%"} />
    );
  } else if (isSuccess) {
    if (searchResults.length == 0) {
    } else {
      content = <ResultsColumn users={searchResults} />;
    }
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  } else {
    console.log("NOT FETCHING");
  }

  return (
    <CompatibleSafeAreaView componentStyle="bg-white flex-1">
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
            placeholder={t("search")}
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
          <Ionicons name="qr-code" size={33} color="#192C88" />
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
        {/* {error && (
          <View>
            <Text>ERROR: {error}</Text>
          </View>
        )} */}

        {query === "" ? (
          <View>
            <Text className="text-xl text-gray-800 mb-2">
              {t("suggestedContacts")}
            </Text>
            <UsersColumn />
          </View>
        ) : (
          <View>
            <Text className="text-xl text-gray-800 mb-2">{t('searchResults')}</Text>
            {content}
          </View>
        )}
      </ScrollView>
    </CompatibleSafeAreaView>
  );
};

export default SearchScreen;
