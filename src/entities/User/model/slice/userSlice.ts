import {UserSchema} from "../types/UserSchema.ts";
import {createSlice} from "@reduxjs/toolkit";
import {USER_LOCALSTORAGE_KEY} from "@/shared/const/global.ts";

const initialState: UserSchema= {
    authData: undefined,
}

export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        setAuthData: (state, action) => {
            const userData = { username: action.payload };
            state.authData = userData;
            localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(userData));
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
export const {actions : userActions} = userSlice;