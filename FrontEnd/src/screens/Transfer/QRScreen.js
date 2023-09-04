import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Camera, useCameraDevices } from "react-native-vision-camera";
import LoadingView from "../../components/LoadingView";
import { useScanBarcodes } from "vision-camera-code-scanner";

import { BarCodeScanner } from "expo-barcode-scanner";
import { useSelector } from "react-redux";
import { selectSelf } from "../../redux/reducers/selfSlice";

// const checkCameraPermission = async () => {
//   let status = await Camera.getCameraPermissionStatus();
//   if (status !== "authorized") {
//     await Camera.requestCameraPermission();
//     status = await Camera.getCameraPermissionStatus();
//     console.log("Camera Authorised");
//     setHasPermission(status === "authorized");
//     if (status === "denied") {
//       Alert.alert(
//         "No Camera Access",
//         "You need to give permission to use the QR Code scanner",
//         [
//           {
//             text: "Cancel",
//             style: "cancel",
//           },
//           {
//             text: "OK",
//           },
//         ]
//       );
//     }
//   }
// };

const ScanScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const self = useSelector(selectSelf);

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const [mode, setMode] = useState(0);

  const getBarCodeScannerPermissions = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === "granted");
  };

  const handleBarCodeScanned = ({ type, data }) => {

    let usefulData = data.split("/user/")[1].split('/');
    let id = usefulData[0];

    let firstName = usefulData[1].split("_")[0];
    let lastName = usefulData[1].split("_")[1];
    let fullName =
      firstName.charAt(0).toUpperCase() +
      firstName.slice(1) +
      " " +
      lastName.charAt(0).toUpperCase() +
      lastName.slice(1);
    // alert(`ID: ${id}, name: ${fullName}`);

    setScanned(true);
    navigation.navigate("User", {id, name: fullName})
  };

  useEffect(() => {
    getBarCodeScannerPermissions();
  }, []);

  return (
    <SafeAreaView>
      {/* Return Arrow*/}
      <View className="mt-2 mx-6 flex-row">
        <TouchableOpacity
          onPress={navigation.goBack}
          className="bg-black rounded-full"
        >
          <Ionicons name="chevron-back" size={30} color="white" />
        </TouchableOpacity>
      </View>

      {/* Buttons in a row */}
      <View className="flex-row justify-center my-4">
        <View className="border flex-row my-4 py-1 rounded-full bg-gray-100">
          <TouchableOpacity
            onPress={() => setMode(0)}
            className={`rounded-full py-2 px-6 ${mode === 0 ? "bg-white" : ""}`}
          >
            <Text
              className={`font-extrabold text-lg ${
                mode === 0 ? "text-black" : "text-gray-500"
              }`}
            >
              Scan code
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setMode(1)}
            className={`rounded-full py-2 px-8 ${mode === 1 ? "bg-white" : ""}`}
          >
            <Text
              className={`font-extrabold text-lg ${
                mode === 1 ? "text-black" : "text-gray-500"
              }`}
            >
              Get paid
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Scan Code */}
      {mode === 0 && (
        <View>
          {hasPermission === null && <LoadingView />}

          {hasPermission === false && <Text>No access to camera.</Text>}

          {hasPermission && (
            <View className="w-4/5 aspect-square mx-10 rounded-xl border-4 border-black overflow-hidden">
              <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                // style={StyleSheet.absoluteFillObject}
                className="flex-1"
              />
            </View>
          )}
        </View>
      )}

      {/* Pay Me */}
      {mode === 1 && (
        <View className="flex-col items-center">
          <Text className="text-2xl font-semibold mt-12">{self.fullName}</Text>

          <Text className="text-lg font-semibold">{self.phoneNumber}</Text>

          <View className="p-6">
            {/* Should be the QR code */}
            <Image
              source={{ uri: self.profilePicture }}
              style={{ width: 240, height: 240 }}
            />
          </View>

          <View className="flex-row mx-20">
            <TouchableOpacity className="border p-3 rounded-full">
              <Ionicons name="print" size={24} color="black" />
            </TouchableOpacity>
            <View className="flex-1"></View>
            <TouchableOpacity className="border p-3 rounded-full">
              <Ionicons name="mail" size={24} color="black" />
            </TouchableOpacity>
            <View className="flex-1"></View>
            <TouchableOpacity className="border p-3 rounded-full">
              <Ionicons name="cloud-upload" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* {device != null && hasPermission && (
      <>
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={isFocused}
          frameProcessor={frameProcessor}
          frameProcessorFps={5}
        />
        {barcodes.map((barcode, idx) => {
          <Text key={idx} className="text-lg text-white font-bold">
            {barcode.displayValue}
          </Text>;
        })}
      </>
    )} */}
    </SafeAreaView>
  );
};

export default ScanScreen;
