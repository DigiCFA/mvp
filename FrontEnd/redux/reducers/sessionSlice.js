import { createSlice } from "@reduxjs/toolkit";
import * as apiUtil from '../../utils/api'

const nullSession = {
    userId: null
}

const sessionSlice = createSlice({
    name: 'session',
    initialState: nullSession,
    reducers: {
        receiveCurrentUser: (state, action) => {
            state.userId = action.payload.userId 
        },
        logoutCurrentUser: (state, action) => {
            state.userId = null
        }
    }
})

export const {receiveCurrentUser, logoutCurrentUser} = sessionSlice.actions

export default sessionSlice.reducer

export const login = user => async (dispatch) => {
    
    const response = await apiUtil.login(user)
    const data = response.data 

    if(response.status === 200){
        return dispatch(receiveCurrentUser(data))
    }
}

export const signup = user => async (dispatch) => {

    const response = await apiUtil.signup(user)
    const data = response.data 

    if(response.status === 200){
        return dispatch(receiveCurrentUser(data))
    }

}

export const getSession = () => async (dispatch) => {

    const response = await apiUtil.getSession()
    const data = response.data 

    if(response.status === 200){
        return dispatch(receiveCurrentUser(data))
    }
}

export const logout = () => async (dispatch) => {
    
    const response = await apiUtil.logout()
    const data = response.data

    if(response.status === 200){
        return dispatch(logoutCurrentUser())
    }
}