// import 'react-native-reanimated'
import 'react-native-get-random-values';
import { registerRootComponent } from "expo";
import { AppRegistry } from 'react-native';
import FCM from '@react-native-firebase/messaging';

import App from "./src/App";



FCM().setBackgroundMessageHandler(async (sentData)=>{
    console.log(sentData);
})
// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
