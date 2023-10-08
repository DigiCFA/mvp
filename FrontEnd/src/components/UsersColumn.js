import { View } from "react-native";
import React, { useEffect } from "react";
import { UserCard } from '../components/cards/UserCard'
import { useSelector } from "react-redux";
import { useFetchContactsByIdQuery, contactSelector } from "../redux/reducers/apiProfileSlice";
import { useGetSessionQuery } from "../redux/reducers/apiAuthSlice";

const UsersColumn = () => {

  const {data: session, isLoading: sessionIsLoading, isSuccess: sessionIsSuccess,
        isError: sessionIsError, error: sessionError} = useGetSessionQuery();
  const {data: rawContact, isLoading: contactIsLoading, isSuccess: contactIsSuccess,
        isError: contactIsError, error: contactError} = useFetchContactsByIdQuery(session.userId, {
          skip: sessionIsLoading
        })
  const contacts = useSelector(contactSelector(session.userId).selectAll)
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
