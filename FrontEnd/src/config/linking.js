import * as Linking from "expo-linking";
import {
  selectCurrentUserID,
  useGetSessionQuery,
} from "../redux/api/apiAuthSlice";
import { useSelector } from "react-redux";
import { selectNameFromUser } from "../redux/api/apiProfileSlice";

// I am actually confused right now, what's the point of this? Just for camera scanning of code and it being directed to here? Shouldn't we manually fetch the link and restrict the scanning functionality only to the QR scanning from within the app?

const prefix = Linking.createURL("/");

const config = {
  screens: {
    Transfer: {
      path: "pay",
      // initialRouteName: 'Search',
      screens: {
        User: {
          path: "user/:id/:name",
          parse: {
            name: (name) => {
              let firstName = name.split("_")[0];
              let lastName = name.split("_")[1];
              let fullName =
                firstName.charAt(0).toUpperCase() +
                firstName.slice(1) +
                " " +
                lastName.charAt(0).toUpperCase() +
                lastName.slice(1);

              return fullName;
            },
          },
        },
        // Catch all
        // QRError: "*",
      },
    },
  },
};

const linking = {
  prefixes: [prefix],
  config,
};

export default linking;
