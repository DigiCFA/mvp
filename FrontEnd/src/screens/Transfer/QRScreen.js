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
import LoadingView from "../../components/LoadingView";

import { BarCodeScanner } from "expo-barcode-scanner";
import { useSelector } from "react-redux";
import {
  selectNameFromUser,
  useFetchUserQuery,
  useGenerateQRCodeLinkQuery,
} from "../../redux/api/apiProfileSlice";
import {
  selectCurrentUserID,
  useGetSessionQuery,
} from "../../redux/api/apiAuthSlice";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import QRCode from "react-native-qrcode-svg";
import * as Linking from "expo-linking";

import logo_D from "../../../assets/logo/Dclear.png";
import Spinner from "react-native-loading-spinner-overlay";
import { selectQRCodeLink } from "../../redux/client/qrCodeSlice";
import CompatibleSafeAreaView from "../../components/CompatibleSafeAreaView";
import ErrorPopup from "../../components/ErrorPopup";

const ScanScreen = () => {
  const { t } = useTranslation();

  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const { data: session } = useGetSessionQuery();
  const { data: user, isLoading: fetchUserIsLoading } = useFetchUserQuery(
    session.userId
  );

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [QRError, setQRError] = useState(false);

  const [mode, setMode] = useState(0);

  const getBarCodeScannerPermissions = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === "granted");
  };

  const generateQRCodeLink = (user) => {
    const userId = user._id;
    const first = user.firstName;
    const last = user.lastName;

    const link = Linking.createURL("/pay/user/", {
      queryParams: {
        user: userId,
        name: first + "_" + last,
      },
    });
    console.log(link);
    return link;
  };

  const qrCodeLink = generateQRCodeLink(user);

  const handleBarCodeScanned = async ({ type, data }) => {
    try {
      let usefulData = data.split("/user/")[1].split("/");
      let id = usefulData[0];

      const {
        data: scanUser,
        isLoading: fetchScanUserIsLoading,
        isError: fetchScanUserIsError,
      } = useFetchUserQuery(id);

      if (fetchScanUserIsError) {
        setQRError(true);
      } else {
        // let firstName = usefulData[1].split("_")[0];
        // let lastName = usefulData[1].split("_")[1];
        // let fullName =
        //   firstName.charAt(0).toUpperCase() +
        //   firstName.slice(1) +
        //   " " +
        //   lastName.charAt(0).toUpperCase() +
        //   lastName.slice(1);
        alert(`ID: ${id}, name: ${scanUser.fullName}`);

        setScanned(true);
        navigation.navigate("User", { id, name: scanUser.fullName });
      }
    } catch (error) {
      setQRError(true);
    }
  };

  useEffect(() => {
    getBarCodeScannerPermissions();
  }, []);

  const scanCode = (
    <View className="grow">
      {hasPermission === null && <LoadingView />}

      {hasPermission === false && <Text>{t("noCameraAccess")}</Text>}

      {hasPermission && (
        <View className="w-4/5 aspect-square mx-10 rounded-xl border-4 border-black overflow-hidden">
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            // style={StyleSheet.absoluteFillObject}
            className="flex-1"
          />
        </View>
      )}

      <View className="flex-1"></View>
      {QRError && <ErrorPopup text="QRError" color="blueDark" />}
    </View>
  );

  const getPaid = (
    <View className="flex-col items-center">
      <Spinner visible={fetchUserIsLoading} />

      <Text className="text-2xl font-semibold mt-12">{user?.fullName}</Text>

      <Text className="text-lg font-semibold">{user?.phoneNumber}</Text>

      <View className="p-6">
        {/* Placeholder if QR Doesn't work */}
        {/* <Image
          source={{ uri: user?.profilePicture }}
          style={{ width: 240, height: 240 }}
        /> */}

        <QRCode
          value={qrCodeLink}
          size={200}
          logo={logo_D}
          logoSize={80}
          logoBackgroundColor="white"
          logoMargin={-4}
          ecl="M"
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
  );

  return (
    <CompatibleSafeAreaView componentStyle={"grow"}>
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
              {t("scanCode")}
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
              {t("getPaid")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {mode === 0 && scanCode}
      {mode === 1 && getPaid}

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
    </CompatibleSafeAreaView>
  );
};

export default ScanScreen;
