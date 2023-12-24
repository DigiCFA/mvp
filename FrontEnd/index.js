// import 'react-native-reanimated'
//import 'react-native-get-random-values';
import { registerRootComponent } from "expo";
import { AppRegistry } from 'react-native';
import { TextEncoder, TextDecoder } from "text-encoding";
import App from "./src/App";

global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
