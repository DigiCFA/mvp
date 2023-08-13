import axios from "axios";
// import {fileFromPath} from "formdata-node/file-from-path";

import {FormData, Blob} from "formdata-node"
// import {fileFromPath} from "formdata-node/file-from-path"


axios.defaults.baseURL = "http://localhost:5050/routes";

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


export const handleUploadPhoto = async (userId, profilePicture) => {

  const form = new FormData();
  form.append('userId', userId);
  form.append("profilePicture", {
    // name: profilePicture.fileName,
    name: "randomPhoto",
    type: profilePicture.type,
    uri: Platform.OS === "ios" ? profilePicture.uri.replace("file://", "") : profilePicture.uri,
  });

  const blob = new Blob(profilePicture)

  console.log(form.profilePicture.name)

  // const file = await fileFromPath(profilePicture.uri.replace("file://", ""))
  // console.log(file)

  try {
    const response = await axios.post("/profile/add_profile_pic", form)
    if (response.status == 200) console.log("Successfully uploaded profile picture");
    else console.log("Error uploading photo");
  } catch (error) {
    console.error(error.response.data);
  }
}