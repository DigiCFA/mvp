import axios from "axios";
// import {fileFromPath} from "formdata-node/file-from-path";

// import {FormData, Blob} from "formdata-node"

import * as FileSystem from "expo-file-system";

const baseURL = "https://o4gnaf7sce.execute-api.af-south-1.amazonaws.com/prod/api"
export const profilePicBaseURL =
  "https://digicfa-profilepics.s3.af-south-1.amazonaws.com/";

// import RNFetchBlob from "rn-fetch-blob";
// import {fileFromPath} from "formdata-node/file-from-path"

// axios.defaults.baseURL = "http://192.168.3.106:5050/api";

const instance = axios.create({
  baseURL: baseURL,
  withCredentials: true,
  credentials: "include"
})

export const login = (user) => {
  return instance.post("/auth/login", {
      "phoneNumber": user.phoneNumber,
      "password": user.password
  })
}

export const signup = (user) => {
  return instance.post("/auth/signup", {
      "phoneNumber": user.phoneNumber,
      "password": user.password,
      "firstName": user.firstName,
      'lastName': user.lastName
  })
}

export const logout = () => {
  return instance.delete("/auth/logout")
}

export const getSession = () => {
  return instance.get("/auth/obtainSession")
}

export const fetchUser = (userId) => {
  return instance.get("/profile/retrieve_user", {
    params: {
      userId: userId,
    },
  });
};

export const fetchTransactions = (userId) => {
  return instance.get("/profile/retrieve_transactions", {
    params: {
      userId: userId,
    },
  });
};

export const searchUsers = (query) => {
  return instance.get("/profile/search_users", {
    params: {
      query: query
    }
  })
}

// Not necessary to have a stand alone function

// export const fetchProfilePic = (userId) => {
//   return instance.get("/profile/retrieve_user", {
//     params: {
//       userId: userId
//     },
//     // responseType: 'arraybuffer'
//   });
// };

export const createDirectTransaction = async (
  amountTransferred,
  sender,
  receiver,
  paymentMethod,
  isPayment,
  isApproved,
  message
) => {
  try {
    const response = await instance.post(
      "/transaction/create_direct_transaction",
      {
        amountTransferred: amountTransferred,
        sender: sender,
        receiver: receiver,
        paymentMethod: paymentMethod,
        isPayment: isPayment,
        isApproved: isApproved,
        message: message,
      }
    );
    if (response.status == 200) console.log("Successfully created transaction");
    else console.log("Error creating transaction");
  } catch (error) {
    console.error(error.response.data);
  }
};

export const uploadProfilePicture = async (userId, imageURI) => {
  console.log("URI: ", imageURI);
  console.log("UserID: ", userId);

  let uriArray = imageURI.split(".");
  let fileType = "image/" + uriArray[uriArray.length - 1];
  console.log(fileType);

  try {
    const result = await FileSystem.uploadAsync(
      baseURL + "/profile/set_profile_pic",
      imageURI,
      {
        headers: {
          "Content-Type": fileType,
        },
        httpMethod: "PATCH",
        uploadType: FileSystem.FileSystemUploadType.MULTIPART,
        fieldName: "profilePicture",
        parameters: {
          userId: userId,
        },
      }
    );

    // const result = await FileSystem.uploadAsync(
    //   "http://localhost:5050/api/profile/set_profile_pic",
    //   imageURI,
    //   {
    //     headers: {
    //       'Content-Type': 'image/jpg',
    //       // 'Custom-Header': 'DASD',
    //     },
    //     httpMethod: 'POST',
    //     sessionType: FileSystem.FileSystemSessionType.BACKGROUND,
    //     uploadType: FileSystem.FileSystemUploadType.MULTIPART,
    //     fieldName: 'profilePicture',
    //     mimeType: 'image/jpg',
    //     parameters: {
    //       userId: userId
    //     }
    //   },
    // )

    if (result.status === 200)
      console.log("Successfully uploaded profile picture");
    else console.log("Error uploading photo");

    // console.log(result);
  } catch (error) {
    console.error(error);
  }
};