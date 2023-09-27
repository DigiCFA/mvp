import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Image } from "expo-image"
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectSelf, setSelf, whetherUserLoaded } from "../../redux/reducers/selfSlice";
import { Ionicons } from "@expo/vector-icons";
import SettingsColumn from "../../components/SettingsColumn";

import ContentLoader from "react-native-easy-content-loader";
import { InstagramLoader } from "react-native-easy-content-loader";
import { whetherDuringLogout } from "../../redux/reducers/sessionSlice";
import Spinner from "react-native-loading-spinner-overlay";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const self = useSelector(selectSelf);
  const loaded = useSelector(whetherUserLoaded);

  const duringLogout = useSelector(whetherDuringLogout);

  // const [loading, setLoading] = useState(true);

  // useEffect(() => {

  //   // Sets loading to false after 1 second. Then we cancel the timer. 
  //   timer = setTimeout(() => {
  //     setLoading(false);
  //   }, 1000);
  //   return () => clearTimeout(timer);
  // }, [])

  return (
    <View className="grow">

      <Spinner visible={duringLogout} />

      {/* Top Bar */}
      <View className="flex-row self-center items-center space-x-2 pt-12 pb-6 px-4 bg-blueLight">
        <View className="flex-1"></View>
        <Text className="font-extrabold text-lg text-white">Profile</Text>
        <TouchableOpacity
          className="flex-1 items-end"
        >
          <Ionicons name="notifications" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <InstagramLoader active loading={!loaded}>
        <ScrollView>
          {/* Profile Area */}
          <View className="bg-white flex-col items-start space-y-1 pb-4">
            <View className="px-4 pt-4">
              <Image
                source={{ uri: self.profilePicture }}
                className="h-24 w-24 rounded-full"
                // onLoadStart={()=>console.log("Started to load image")}
                // onProgress={()=>console.log("LOADING...")}
                // onLoadEnd={()=>console.log("Finished loading")}
                // onLoad={()=>setLoading(false)}
              />
            </View>

            <Text className="px-4 font-medium text-3xl">{self.fullName}</Text>
            {/* <Text className="px-4 font-medium">{self._id}</Text>
            <Text className="px-4 font-medium">{self.phoneNumber}</Text>

            <Text className="px-4 font-medium">QRCode: {self.QRCode}</Text> */}
            <Text className="px-4 font-medium">Balance: {self.balance}</Text>

            {/* Just for checks */}
            {/* {self.cards?.map((card) => (
              <View key={card._id}>
                <Text>Card: </Text>
                <Text>accountHolder: {card.accountHolder}</Text>
                <Text>cardNumber: {card.cardNumber}</Text>
                <Text>expDate: {card.expDate}</Text>
                <Text>cvv: {card.cvv}</Text>
              </View>
            ))}

            {self.contacts?.map((contact) => (
              <View key={contact._id}>
                <Text>Contact: </Text>
                <Text>fullName: {contact.fullName}</Text>
                <Text>phoneNumber: {contact.phoneNumber}</Text>
              </View>
            ))} */}
            {/* 
            {self.contacts?.map((contact) => (
              <View key={contact._id}>
                <Text>Contact: </Text>
                <Text>fullName: {contact.fullName}</Text>
                <Text>phoneNumber: {contact.phoneNumber}</Text>
              </View>
            ))} 

            {self.transactions?.map((transaction) => (
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
          </View>

          <SettingsColumn />
        </ScrollView>
      </InstagramLoader>
    </View>
  );
};

export default ProfileScreen;
