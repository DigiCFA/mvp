import { Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider, useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import { createStoreWithPreloadedState } from "./store";
import {
  fetchUserById,
  fetchTransactionsById,
} from "./redux/reducers/selfSlice";
import { getSession } from "./redux/reducers/sessionSlice";

import AppNavigator from "./navigation/AppNavigator";
import linking from "./config/linking";
import Spinner from "react-native-loading-spinner-overlay";
import { useGetSessionQuery } from "./redux/reducers/apiAuthSlice";
import { useFetchUserQuery } from "./redux/reducers/apiProfileSlice";

const App = () => {
  const {isLoading: sessionIsLoading, data: session} = useGetSessionQuery()
  const isLoggedIn = Boolean(session?.userId);
  const {isLoading: fetchUserIsLoading, data: user, isSuccess} = useFetchUserQuery(session?.userId, {
    skip: !isLoggedIn
  })
  const dispatch = useDispatch();
  
  useEffect(() => {
    if(isLoggedIn){
      dispatch(fetchUserById(session.userId))
      dispatch(fetchTransactionsById(session.userId))
    }
  }, [isLoggedIn]);

  return (
    <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
      <Spinner visible={sessionIsLoading} />
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
