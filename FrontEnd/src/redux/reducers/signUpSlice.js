import { createSlice } from "@reduxjs/toolkit";
import { signup } from "./sessionSlice";

const nullInfo = {
    phoneNumber: "",
    password: "",
    firstName: "",
    lastName: ""
}

const signUpSlice = createSlice({
    name: "signUp",
    initialState: nullInfo,
    reducers: {
        setField: (state, action) => {
            state[action.payload.field] = action.payload.content
            return state
        },
        clearAllField: (state, action) => {
            return nullInfo
        }
    }
})

export const { setField, clearAllField } = signUpSlice.actions

export default signUpSlice.reducer

export const selectFieldWithAttr = (attr) => {
    return (state) => (state["signUp"][attr])
}