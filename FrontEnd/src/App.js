import { Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider, useDispatch } from "react-redux";

import { createStoreWithPreloadedState } from "./store";

import AppNavigator from "./navigation/AppNavigator";
import linking from "./config/linking";
import { useGetSessionQuery } from "./redux/api/apiAuthSlice";
import { useFetchUserQuery, useFetchTransactionsQuery } from "./redux/api/apiProfileSlice";

const App = () => {
  const {isLoading: sessionIsLoading, data: session, isFetching: sessionisFetching} = useGetSessionQuery()
  const isLoggedIn = Boolean(session?.userId);
  const {isLoading: fetchUserIsLoading, data: user, 
    isSuccess: fetchUserIsSuccess, isError: fetchUserIsError,
    error: fetchUserError} = useFetchUserQuery(session?.userId, { skip: !isLoggedIn})
  const {isLoading: fetchTransactionsIsLoading, data: transactions,
    isSuccess: fetchTransactionsIsSuccess, isError: fetchTransactionsIsError,
    error: fetchTransactionsError} = useFetchTransactionsQuery(session?.userId, {skip: !isLoggedIn})

  return (
    <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
      <AppNavigator isLoggedIn={isLoggedIn} />
    </NavigationContainer>
  );
};

const AppWrapper = () => {
  const store = createStoreWithPreloadedState({});
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default AppWrapper;