export default {
    expo: {
      name: "DigiCFA",
      slug: "mvp",
      version: "1.0.0",
      scheme: "digicfa",
      orientation: "portrait",
      icon: "./assets/3white.png",
      userInterfaceStyle: "light",
      jsEngine: "hermes",
      splash: {
        image: "./assets/3clear.png",
        resizeMode: "contain",
        backgroundColor: "#ffffff"
      },
      assetBundlePatterns: [
        "**/*"
      ],
      ios: {
        bundleIdentifier: "com.digicfa.app",
        googleServicesFile: process.env.GOOGLE_SERVICE_INFO_PLIST,
        supportsTablet: true,
        infoPlist: {
          NSCameraUsageDescription: "DigiCFA needs access to your Camera.",
          UIBackgroundModes: [
            "fetch",
            "remote-notification"
          ],
          NSMicrophoneUsageDescription: "Allow $(PRODUCT_NAME) to access your microphone"
        },
        // jsEngine: "jsc"
        // Hermes is default, and debugging with ChromeDevTools is only supported with Hermes
      },
      android: {
        package: "com.digicfa.app",
        googleServicesFile: process.env.GOOGLE_SERVICES_JSON,
        adaptiveIcon: {
          foregroundImage: "./assets/adaptive-icon.png",
          backgroundColor: "#ffffff"
        },
        permissions: [
          "android.permission.RECORD_AUDIO",
          "android.permission.CAMERA"
        ],
        jsEngine: "jsc"
      },
      web: {
        favicon: "./assets/favicon.png"
      },
      plugins: [
        [
          "expo-image-picker",
          {
            photoPermission: "This app accesses your photos to upload them as your profile picture.",
            cameraPermission: "This app accesses the camera to scan QR codes to receive and send payments."
          }
        ],
        [
          "expo-barcode-scanner",
          {
            camerPermission: "Allow DigiCFA to access camera for QR code scanning."
          }
        ],
        [
          "expo-build-properties",
          {
            ios: {
              useFrameworks: "static"
            }
          }
        ],
        "@react-native-firebase/app"
      ],
      extra: {
        eas: {
          projectId: "63ee103b-7540-4d82-94e2-6716ec1df088"
        }
      },
      owner: "digicfa"
    }
  }
  