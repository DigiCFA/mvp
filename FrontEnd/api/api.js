import axios from "axios";

axios.defaults.baseURL = "http://192.168.3.106:5050/routes";

export const fetchUser = (userId) => {
    return axios.get("/profile/retrieve_user", {
        params: {
            userId: userId,
        }
    });
}

export const fetchTransactions = (userId) => {
    return axios.get("/profile/retrieve_user_transactions", {
        params: {
          userId: userId,
        },
    });
}