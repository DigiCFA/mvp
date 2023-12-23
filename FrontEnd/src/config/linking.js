import * as Linking from "expo-linking";
import { selectCurrentUserID, useGetSessionQuery } from "../redux/api/apiAuthSlice";
import { useSelector } from "react-redux";
import { selectNameFromUser } from "../redux/api/apiProfileSlice";


// const id = useSelector(selectCurrentUserID);
// const name = useSelector(selectNameFromUser(id));


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


export const QRCodeURL = Linking.createURL('pay/user/app', {
  queryParams: {hello: 'world'},
})

export default linking;
