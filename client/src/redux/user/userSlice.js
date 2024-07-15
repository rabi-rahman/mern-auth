import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser : null,
    loading : false,
    error : false,
};

const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers: {
        signInStart : (state) => {
            state.loading = true;
        },
        signInSuccess : (state,action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = false;
        },
        signInFailure : (state) => {
            state.loading = false;
        },
        updateUserStart : (state) => {
            state.loading = true;
        },
        updateUserSuccess : (state,action)  => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = false;
        },
        updateUserFailure : (state,action)  => {
            state.loading = false;
            state.error = action.payload;
        },
        deleteUserStart : (state) => {
            state.loading = true;
        },
        deleteUserSuccess : (state)  => {
            state.currentUser = null;
            state.loading = false;
            state.error = false;
        },
        deleteUserFailure : (state,action)  => {
            state.loading = false;
            state.error = action.payload;
        },
        signOutStart : (state) => {
            state.loading = true;
        },
        signOutSuccess : (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = false;
        },
        signOutFailure : (state) => {
            state.loading = false;
        }
    }
})

export const {signInStart,
    signInSuccess,
    signInFailure,
    updateUserStart,
    updateUserSuccess,
    updateUserFailure,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure,
    signOutStart,
    signOutSuccess,
    signOutFailure} = userSlice.actions

export default  userSlice.reducer;