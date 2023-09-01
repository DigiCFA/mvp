import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Camera, useCameraDevices } from "react-native-vision-camera";
import LoadingView from "../../components/LoadingView";
import { useScanBarcodes } from "vision-camera-code-scanner";

const checkCameraPermission = async () => {
  let status = await Camera.getCameraPermissionStatus();
  if (status !== "authorized") {
    await Camera.requestCameraPermission();
    status = await Camera.getCameraPermissionStatus();
    console.log("Camera Authorised");
    setHasPermission(status === "authorized");
    if (status === "denied") {
      Alert.alert(
        "No Camera Access",
        "You need to give permission to use the QR Code scanner",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "OK",
          },
        ]
      );
    }
  }
};

const ScanScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [hasPermission, setHasPermission] = useState(false);
  const devices = useCameraDevices();
  const device = devices.back;

  const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE], {
    checkInverted: true,
  });

  // useEffect(() => {
  //   (async () => {
  //     const status = await Camera.requestCameraPermission();
  //     console.log("Camera Authorised")
  //     setHasPermission(status === 'authorized');
  //   })();
  // }, []);

  useEffect(() => {
    checkCameraPermission();
  }, []);

  return (
    <SafeAreaView>
      {/* Top Bar */}
      <View className="flex-row justify-items-start items-center space-x-2 pt-1 mx-4">
        <TouchableOpacity onPress={navigation.goBack} className="flex-1">
          <Ionicons name="arrow-back" size={30} color="grey" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold">Scan Screen</Text>

        {device != null && hasPermission && (
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
        )}

        <View className="flex-1"></View>
      </View>
    </SafeAreaView>
  );
};

export default ScanScreen;
