import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AuthByUserNameSchema} from "../types/AuthByUserNameSchema.ts";

export const initialState: AuthByUserNameSchema = {
    isLoading: false,
    error: '',
    username: '',
    password: '',
}

export const AuthByUserNameSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setUserName: (state, action: PayloadAction<string>) => {
            state.username = action.payload;
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
        clearForm: (state) => {
            state.username = "";
            state.password = "";
            state.error = undefined;
        },
    }
})
export const {reducer : authReducer} = AuthByUserNameSlice;
export const {actions : authActions} = AuthByUserNameSlice;