import { View } from "react-native";
import React, { useEffect } from "react";
import { UserCard } from "./cards/UserCard";
import { useSelector } from "react-redux";
import {
  useFetchContactsByIdQuery,
  contactSelector,
} from "../redux/api/apiProfileSlice";
import { useGetSessionQuery } from "../redux/api/apiAuthSlice";

const ResultsColumn = ({ users }) => {
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
