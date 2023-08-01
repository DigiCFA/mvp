import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectSelf, setSelf } from "../../features/selfSlice";
import { Ionicons } from "@expo/vector-icons"


const MeScreen = () => {
  const navigation = useNavigation();
  const self = useSelector(selectSelf);
  const dispatch = useDispatch();

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
    <View>
      <View className='mt-10'>
        <Text>First Name: {self.firstName}</Text>
        <Text>Last Name: {self.lastName}</Text>
        <Text>Full Name: {self.fullName}</Text>
        <Text>Phone Number: {self.phoneNumber}</Text>
        <Text>Password: {self.password}</Text>
        <Text>QRCode: {self.QRCode}</Text>
        <Text>Balance: {self.balance}</Text>
        {/* <Text>Cards: {self.cards}</Text> */}
        {/* <Text>Contacts: {self.contacts}</Text> */}
        <Text>Profile Picture: {self.profilePicture}</Text>
      </View>




      <TouchableOpacity
            onPress={() => navigation.navigate("AccountInfo")}
            className="mt-10 p-4 bg-white rounded-lg items-center shadow"
          >
        <Text className="text-xl font-bold">Account info</Text>
      </TouchableOpacity>
    </View>

    
  );
};

export default MeScreen;
