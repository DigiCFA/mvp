import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import {Ionicons} from "@expo/vector-icons"
import React from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Camera, useCameraDevices } from "react-native-vision-camera";
import LoadingView from "../../components/LoadingView";

const ScanScreen = () => {

  const navigation = useNavigation();

  const isFocused = useIsFocused();

  // const cameraPermission = await Camera.getCameraPermissionStatus();

  const devices = useCameraDevices();
  const device = devices.back;

  if (device == null) return <LoadingView />

  return (
    <SafeAreaView>
      {/* Top Bar */}
      <View className="flex-row justify-items-start items-center space-x-2 pt-1 mx-4">
        <TouchableOpacity onPress={navigation.goBack} className="flex-1">
          <Ionicons name="arrow-back" size={30} color="grey" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold">
          Scan Screen
        </Text>

        <Camera 
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={isFocused}
        />

        <View className="flex-1"></View>
      </View>
    </SafeAreaView>
  );
};

export default ScanScreen;
