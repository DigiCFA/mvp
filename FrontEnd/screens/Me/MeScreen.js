import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectSelf, setSelf } from "../../features/selfSlice";
import { Ionicons } from "@expo/vector-icons";
import SettingsColumn from "../../components/SettingsColumn";

const MeScreen = () => {
  // [loggedIn, setLoggedIn] = useState(false);

  const navigation = useNavigation();
  const self = useSelector(selectSelf);

  // useEffect(() => {

  // //   // const {params: {_id, firstName, lastName, fullName, phoneNumber, password, balance, privacyPreferences, contacts, creationDate, cards, __v}} = getSelf();
  //   dispatch(
  //     setSelf({
  //       firstName: "Ed",
  //       lastName: "Wang",
  //       fullName: "John Smith",
  //       phoneNumber: "+1 123 456 88aaa",
  //       QRCode: null,
  //       balance: 888.88,
  //       cards: [12, 2],
  //       contacts: [],
  //       profilePicture: null,
  //     })
  //   );
  // }, [dispatch]);

  // dispatch()

  return (
    <View className="grow">
      {/* Top Bar */}
      <View className="flex-row self-center items-center space-x-2 pt-12 pb-6 px-4 bg-[#3370E2]">
        {/* <TouchableOpacity onPress={() => navigation.navigate("Home")} className="">
          <Ionicons name="arrow-back" size={30} color="grey" />
        </TouchableOpacity> */}
        <View className="flex-1"></View>
        <Text className="font-extrabold text-lg text-white">Profile</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Scan")}
          className="flex-1 items-end"
        >
          <Ionicons name="notifications" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView>
        {/* Profile Area */}
        <View className="bg-white flex-col items-start space-y-1 pb-4">
          {/* Replace this with the actual profile picture!! */}
          {/* <Ionicons name="person-circle" size={125} color="#192C88" /> */}

          <View className='px-4 pt-4'>
            <Image 
              source={{uri: self.profilePicture}}
              className='h-24 w-24 rounded-full'
              // style={{width: 100, height: 100}}
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
    </View>
  );
};

export default MeScreen;
