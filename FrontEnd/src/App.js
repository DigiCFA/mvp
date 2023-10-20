import { Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider, useDispatch } from "react-redux";

import { createStoreWithPreloadedState } from "./store";

import AppNavigator from "./navigation/AppNavigator";
import linking from "./config/linking";
import Spinner from "react-native-loading-spinner-overlay";
import { useGetSessionQuery } from "./redux/api/apiAuthSlice";
import { useFetchUserQuery, useFetchTransactionsQuery } from "./redux/api/apiProfileSlice";
import { useEffect } from "react";
//import messaging from '@react-native-firebase/messaging';
import FCM from '@react-native-firebase/messaging';
const App = () => {
  const {isLoading: sessionIsLoading, data: session, isFetching: sessionisFetching} = useGetSessionQuery()
  const isLoggedIn = Boolean(session?.userId);
  const {isLoading: fetchUserIsLoading, data: user, 
    isSuccess: fetchUserIsSuccess, isError: fetchUserIsError,
    error: fetchUserError} = useFetchUserQuery(session?.userId, { skip: !isLoggedIn})
  const {isLoading: fetchTransactionsIsLoading, data: transactions,
    isSuccess: fetchTransactionsIsSuccess, isError: fetchTransactionsIsError,
    error: fetchTransactionsError} = useFetchTransactionsQuery(session?.userId, {skip: !isLoggedIn})
    async function requestUserPermissions(){
      const authRequest = FCM().requestUserPermissions()
      const FCMEnabled = FCM.AuthorizationStatus.AUTHORIZED || FCM.AuthorizationStatus.PROVISIONAL;
      if(FCMEnabled){
        //works
      }
    }
    useEffect(()=>{
      const received = FCM().onMessage(
        async (receivedData)=>{


        console.log(receivedData);

    })
  },[])
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