import axios from "axios";
// import {fileFromPath} from "formdata-node/file-from-path";

// import {FormData, Blob} from "formdata-node"

import * as FileSystem from 'expo-file-system';

// import RNFetchBlob from "rn-fetch-blob";
// import {fileFromPath} from "formdata-node/file-from-path"


// axios.defaults.baseURL = "http://192.168.3.106:5050/api";
axios.defaults.baseURL = "http://localhost:5050/api";


export const fetchUser = (userId) => {
  return axios.get("/profile/retrieve_user", {
    params: {
      userId: userId,
    },
  });
};

export const fetchTransactions = (userId) => {
  return axios.get("/profile/retrieve_transactions", {
    params: {
      userId: userId,
    },
  });
};

// Not necessary to have a stand alone function

// export const fetchProfilePic = (userId) => {
//   return axios.get("/profile/retrieve_profile_pic", {
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
    const response = await axios.post(
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


export const handleUploadProfilePicture = async (userId, imageURI) => {

  console.log("userID: ", userId);
  console.log("URI: ", imageURI);

  const formData = new FormData();

  formData.append('userId', userId);
  formData.append('profilePicture', {
    name: "profile.jpg",
    type: 'jpg',
    uri: Platform.OS === "ios" ? imageURI.replace("file://", "") : imageURI,
})

  console.log(formData);

  // // Creating a blob instance
  // const formData = new RNFetchBlob.polyfill.Blob();

  // const imageBlob = await RNFetchBlob.fs.readFile(image.uri, 'base64');

  // formData.append('userId', userId);
  // formData.append('profilePicture', imageBlob, 'image.jpg');




  // // formData
  // const form = new FormData();
  // form.append('userId', userId);
  // form.append("profilePicture", {
  //   // name: profilePicture.fileName,
  //   name: "randomPhoto",
  //   type: profilePicture.type,
  //   uri: Platform.OS === "ios" ? profilePicture.uri.replace("file://", "") : profilePicture.uri,
  // });

  // const blob = new Blob(profilePicture)

  // console.log(form.profilePicture.name)

  // const file = await fileFromPath(profilePicture.uri.replace("file://", ""))
  // console.log(file)



  try {
    const response = await axios.post("/profile/add_profile_pic", {
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    if (response.status == 200) console.log("Successfully uploaded profile picture");
    else console.log("Error uploading photo");
  } catch (error) {
    console.error(error.response.data);
  }
}




// Apparently, cannot use AXIOS with Expo for image upload


const imageUploading = async () => {
    const data = await FileSystem.uploadAsync(
      URL,
      image, // uri of the image 
      {
        httpMethod: 'POST',
        uploadType: FileSystem.FileSystemUploadType.MULTIPART,
        fieldName: 'file',
      },
    );
};

export const handleUploadProfilePicture2 = async (userId, imageURI) => {
  try {
    const response = await FileSystem.uploadAsync(
      "http://localhost:5050/api/profile/add_profile_pic",
      imageURI,
      {
        httpMethod: 'POST',
        sessionType: FileSystem.FileSystemSessionType.BACKGROUND,
        uploadType: FileSystem.FileSystemUploadType.MULTIPART,
        fieldName: 'profilePicture',
        parameters: {
          userId: userId
        }
      },
    )
    if (response.status == 200) console.log("Successfully uploaded profile picture");
    else console.log("Error uploading photo");

    console.log(response);
  } catch (error) {
    console.error(error.response.data);
  }
}
