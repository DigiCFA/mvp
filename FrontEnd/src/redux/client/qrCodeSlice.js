
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    qrCodeLink: "",
}

const qrCodeSlice = createSlice({
    name: 'qrCode',
    initialState,
    reducers: {
        generateQRCodeLink(state, action) {
            state.qrCodeLink = action.payload;
        }
    }
})

export const { generateQRCodeLink } = qrCodeSlice.actions;
export default qrCodeSlice.reducer;