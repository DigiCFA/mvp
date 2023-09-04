
import * as Linking from "expo-linking";

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
        QRError: "*",
      },
    },
  },
};

 const linking = {
  prefixes: [prefix],
  config,
};

export default linking;