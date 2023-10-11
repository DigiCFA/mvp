import { View } from "react-native";
import React, { useEffect } from "react";
import { UserCard } from '../components/cards/UserCard'
import { useSelector } from "react-redux";
import { useFetchContactsByIdQuery, contactSelector } from "../redux/reducers/apiProfileSlice";
import { useGetSessionQuery } from "../redux/reducers/apiAuthSlice";
import ContentLoader from "react-native-easy-content-loader";

const UsersColumn = () => {

  const {data: session, isLoading: sessionIsLoading, isSuccess: sessionIsSuccess,
        isError: sessionIsError, error: sessionError} = useGetSessionQuery();
  const {data: rawContact, isLoading: contactIsLoading, isSuccess: contactIsSuccess,
        isError: contactIsError, error: contactError} = useFetchContactsByIdQuery(session.userId, {
          skip: sessionIsLoading
        })
  const contacts = useSelector(contactSelector(session.userId).selectAll)
  console.log("length", contacts.length)
  return (
    <ContentLoader active pRows={5} title={false} pHeight={48} pWidth={"100%"} loading={sessionIsLoading || contactIsLoading}>
      {contacts?.map((contact) => (
        <UserCard
          key={contact._id}
          id={contact._id}
          name={contact.fullName}
          phoneNumber={contact.phoneNumber}
        />
      ))}
    </ContentLoader>
  );
};

export default UsersColumn;
