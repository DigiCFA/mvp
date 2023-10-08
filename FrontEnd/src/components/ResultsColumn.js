import { View, Text } from "react-native";
import React from "react";
import UserCard from "./cards/UserCard";
import { useSelector } from "react-redux";
import { selectContacts } from "../redux/reducers/selfSlice";

const ResultsColumn = ({ users }) => {
  // Fetching the top contacts
  // useEffect(() => {

  // })

  console.log("From column: ", users)

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

      {/* Will be an error, if you straight away go for it. Need to load first!! */}
      {users.length === 0 && (
        <View>
          <Text>No User</Text>
        </View>
      )}
    </View>
  );
};

export default ResultsColumn;
