import { View, Text } from "react-native";
import React, { useEffect } from "react";

import axios from "axios";
import { useDispatch } from "react-redux";
import { setSelf, fetchUserById } from "../../features/selfSlice";

const ID = "64c673c724782ec4c7fb2d8f";


const AccountInfoScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserById(ID))

  }, []);

  return (
    <View>
      <Text>AccountInfoScreen</Text>
    </View>
  );
};

export default AccountInfoScreen;
