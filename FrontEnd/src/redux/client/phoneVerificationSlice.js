import { createSlice } from "@reduxjs/toolkit";

const phoneVerificationSlice = createSlice({
    name: 'phoneVerification',
    initialState: {
        code: null
    },
    reducers: {
        setCode: (state, action) => {
            state.code = action.payload.code
        }
    }
})

export const { setCode } = phoneVerificationSlice.actions

export default phoneVerificationSlice.reducer

export const retrieveCode = (state) => state.phoneVerification.code