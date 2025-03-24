import {createSlice} from "@reduxjs/toolkit";
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
    reducers:{

    },
    // extraReducers:(builder)=>{
    //     builder
    //
    // }
})
export const {reducer : loginReducer} = AuthByUserNameSlice;
export const {actions : loginActions} = AuthByUserNameSlice;