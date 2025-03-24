import {UserSchema} from "../types/UserSchema.ts";
import {createSlice} from "@reduxjs/toolkit";
import {USER_LOCALSTORAGE_KEY} from "@/shared/const/global.ts";

const initialState: UserSchema= {

}

export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        getAuthData: (state, action) => {
            state.authData = action.payload;
        },
        initAuthData: (state) => {
            state.authData = JSON.parse(<string>localStorage.getItem(USER_LOCALSTORAGE_KEY));
        },
        logout: (state) => {
            state.authData = undefined;
            localStorage.removeItem(USER_LOCALSTORAGE_KEY);
        }
    }
})

export const {reducer : userReducer} = userSlice;
export const {actions : userAction} = userSlice;