import { View, Text } from "react-native";
import React from "react";
import UserCard from "./UserCard";

const UsersColumn = () => {
  // Fetching the top contacts
  // useEffect(() => {

  // })

  return (
    <View>
      <UserCard id={0} name={"Steve Jobs"} phoneNumber={"408 973 3091"} />
      <UserCard id={0} name={"Elon Musk"} phoneNumber={"800 613 8840"} />
      <UserCard id={0} name={"Edmond Wang"} phoneNumber={"213 214 0824"} />
      <UserCard id={0} name={"Henry Liu"} phoneNumber={"949 307 3594‬"} />
      <UserCard id={0} name={"Daniel Bai"} phoneNumber={"unknown"} />
    </View>
  );
};

export default UsersColumn;
