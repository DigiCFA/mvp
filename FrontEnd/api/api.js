import axios from "axios";

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
