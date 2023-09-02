import { View, Text } from "react-native";
import React from "react";
import UserCard from "./cards/UserCard";
import { useSelector } from "react-redux";
import { selectContacts } from "../redux/reducers/selfSlice";

const UsersColumn = () => {
  const contacts = useSelector(selectContacts);

  // Fetching the top contacts
  // useEffect(() => {

  // })

  return (
    <View>
      {contacts?.map((contact) => (
        <UserCard
          key={contact._id}
          id={contact._id}
          name={contact.fullName}
          phoneNumber={contact.phoneNumber}
        />
      ))}
    </View>
  );
};

export default UsersColumn;
