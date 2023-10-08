import { View, Text } from "react-native";
import React from "react";
import UserCard from "./cards/UserCard";
import { useSelector } from "react-redux";
import { selectContacts } from "../redux/reducers/selfSlice";

const ResultsColumn = ({users}) => {
  // Fetching the top contacts
  // useEffect(() => {

  // })

  return (
    <View>
      {users?.map((user) => (
        <UserCard
          key={user._id}
          id={user._id}
          name={user.fullName}
          phoneNumber={user.phoneNumber}
        />
      ))}
    </View>
  );
};

export default ResultsColumn;
