import { Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import { useEffect, useState } from "react";

import { Provider, useSelector, useDispatch } from "react-redux";
import { createStoreWithPreloadedState } from "./store";
import {
  fetchUserById,
  fetchTransactionsById,
} from "./redux/reducers/selfSlice";
import { getSession } from "./redux/reducers/sessionSlice";

import AppNavigator from "./navigation/AppNavigator";
import linking from "./config/linking";

const App = () => {
  let userId = useSelector((state) => state.session.userId);
  userId = "64eb0d88eaf1bbe6d5741736";
  let isLoggedIn = Boolean(userId);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSession());
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchUserById(userId));
      dispatch(fetchTransactionsById(userId));
    }
  }, [isLoggedIn]);

  return (
    <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
      <AppNavigator isLoggedIn={isLoggedIn} />
    </NavigationContainer>
  );
};

export default AppWrapper = () => {
  const store = createStoreWithPreloadedState({});
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
