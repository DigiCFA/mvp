import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React from "react";
import { Image } from "expo-image";
import { useSelector } from "react-redux";
import {
  selectProfilePic,
  selectSelf,
  whetherUserLoaded,
} from "../../redux/api/selfSlice";
import { Ionicons } from "@expo/vector-icons";
import SettingsColumn from "../../components/SettingsColumn";
import { InstagramLoader } from "react-native-easy-content-loader";
import { useFetchUserQuery } from "../../redux/api/apiProfileSlice";
import { useGetSessionQuery } from "../../redux/api/apiAuthSlice";
import { intlFormat } from "../../utils/currencyFormatter";
import { dinero, toSnapshot } from 'dinero.js';
import { USD } from '@dinero.js/currencies';
const ProfileScreen = () => {
  const { data: session, isLoading: getSessionIsLoading } =
    useGetSessionQuery();
  const {
    data: user,
    isLoading: fetchUserIsLoading,
    isSuccess: fetchUserIsSuccess,
    isError: fetchUserIsError,
  } = useFetchUserQuery(session.userId, { skip: getSessionIsLoading });

  let content = <InstagramLoader active />;

  // if (getSessionIsLoading || fetchUserIsLoading) {
  //   content = <InstagramLoader active loading={true} />;
  // } else
  if (fetchUserIsSuccess) {
    content = (
      <View className="bg-white flex-col items-start space-y-1 pb-4">
        <View className="px-4 pt-4">
          <Image
            source={{ uri: user.profilePicture }}
            className="h-24 w-24 rounded-full"
            // onLoadStart={()=>console.log("Started to load image")}
            // onProgress={()=>console.log("LOADING...")}
            // onLoadEnd={()=>console.log("Finished loading")}
            // onLoad={()=>setLoading(false)}
          />
        </View>

        <Text className="px-4 font-medium text-3xl">{user.fullName}</Text>
        <Text className="px-4 font-medium">Balance: {intlFormat(dinero(user.balance))}</Text>
      </View>
    );
  }

  return (
    <View className="grow">
      {/* Top Bar */}
      <View className="flex-row self-center items-center space-x-2 pt-12 pb-6 px-4 bg-blueLight">
        <View className="flex-1"></View>
        <Text className="font-extrabold text-lg text-white">Profile</Text>
        <TouchableOpacity className="flex-1 items-end">
          <Ionicons name="notifications" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <ScrollView>
        {/* Profile Area */}

        {content}

        {/* Just for checks */}
        {/* {user.cards?.map((card) => (
              <View key={card._id}>
                <Text>Card: </Text>
                <Text>accountHolder: {card.accountHolder}</Text>
                <Text>cardNumber: {card.cardNumber}</Text>
                <Text>expDate: {card.expDate}</Text>
                <Text>cvv: {card.cvv}</Text>
              </View>
            ))}

            {user.contacts?.map((contact) => (
              <View key={contact._id}>
                <Text>Contact: </Text>
                <Text>fullName: {contact.fullName}</Text>
                <Text>phoneNumber: {contact.phoneNumber}</Text>
              </View>
            ))} */}
        {/* 
            {user.contacts?.map((contact) => (
              <View key={contact._id}>
                <Text>Contact: </Text>
                <Text>fullName: {contact.fullName}</Text>
                <Text>phoneNumber: {contact.phoneNumber}</Text>
              </View>
            ))} 

            {user.transactions?.map((transaction) => (
              <View key={transaction._id}>
                <Text className='font-bold'>Transaction: </Text>
                <Text>Sender: {transaction.sender.fullName}</Text>
                <Text>Receiver: {transaction.receiver.fullName}</Text>
                <Text>amountTransferred: {transaction.amountTransferred}</Text>
              </View>
            ))} */}
        {/* 
            <TouchableOpacity onPress={() => setLoggedIn(!loggedIn)}>
              <Text>Press to Log In</Text>
            </TouchableOpacity> */}

        <SettingsColumn />
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
