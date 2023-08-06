import { View, Text } from "react-native";
import React, { useEffect } from "react";

import { useDispatch } from "react-redux";
import { fetchTransactionsById, fetchUserById } from "../../features/selfSlice";

const ID = "64c673c724782ec4c7fb2d8f";


const AccountInfoScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserById(ID))
    dispatch(fetchTransactionsById(ID))

  }, []);

  return (
    <View>
      <Text>Upon entering this screen, Redux calls the fetchUserById thunk and modifies the global store by fetching the user information from MongoDB. The user information across the app is updated. This should happen at the login screen but for convenience's sake is implemented here.</Text>
    </View>
  );
};

export default AccountInfoScreen;
