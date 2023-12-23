import { Text, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider, useDispatch } from "react-redux";
import { createStoreWithPreloadedState } from "./store";
import AppNavigator from "./navigation/AppNavigator";
import linking from "./config/linking";
import { useGetSessionQuery } from "./redux/api/apiAuthSlice";
import {
  useFetchUserQuery,
  useFetchTransactionsQuery,
} from "./redux/api/apiProfileSlice";
import { useUploadFcmTokenMutation } from "./redux/api/apiProfileSlice";
import { useEffect, useState } from "react";
import messaging from "@react-native-firebase/messaging";
// import "./localization/i18nConfig"

import "expo-dev-client";

const App = () => {
  const {
    isLoading: sessionIsLoading,
    data: session,
    isFetching: sessionIsFetching,
    isError: sessionIsError,
  } = useGetSessionQuery();
  const isLoggedIn = Boolean(session?.userId);
  const {
    isLoading: fetchUserIsLoading,
    data: user,
    isSuccess: fetchUserIsSuccess,
    isError: fetchUserIsError,
    error: fetchUserError,
  } = useFetchUserQuery(session?.userId, { skip: !isLoggedIn });
  const {
    isLoading: fetchTransactionsIsLoading,
    data: transactions,
    isSuccess: fetchTransactionsIsSuccess,
    isError: fetchTransactionsIsError,
    error: fetchTransactionsError,
  } = useFetchTransactionsQuery(session?.userId, { skip: !isLoggedIn });

  const [
    uploadFcmToken,
    {
      error: fcmError,
      isFetching: fcmIsFetching,
      isLoading: fcmIsLoading,
      isSuccess: fcmIsSuccess,
      isError: fcmIsError,
    },
  ] = useUploadFcmTokenMutation();

  const [fcmToken, setFcmToken] = useState("");

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log("Authorization status:", authStatus);
    }
  }

  useEffect(() => {
    if (requestUserPermission()) {
      messaging()
        .getToken()
        .then((token) => {
          setFcmToken(token);
        });
    }
    messaging()
      .getInitialNotification()
      .then(async (remoteMessage) => {
        if (remoteMessage) {
          console.log(
            "Notification caused app to open from quit state:",
            remoteMessage.notification
          );
        }
      });
    messaging().onNotificationOpenedApp(async (remoteMessage) => {
      console.log(
        "Notification caused app to open from background state:",
        remoteMessage.notification
      );
    });

    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log("Message handled in the background!", remoteMessage);
    });
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      Alert.alert("A new FCM message arrived!", JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const uploadToken = async (userId, fcmToken) => {
      try {
        await uploadFcmToken({
          userId: userId,
          fcmToken: fcmToken,
          timestamp: Date.now().toString(),
        }).unwrap();
      } catch (error) {
        console.error(error);
      }
    };

    if (isLoggedIn) {
      uploadToken(session.userId, fcmToken);
    }
  }, [isLoggedIn]);

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
