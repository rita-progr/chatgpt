import {createSlice} from "@reduxjs/toolkit";
import {ChatSchema} from "../types/chatSchema.ts";
import {fetchChats} from "../services/fetchChats.tsx";
import {addChat} from "../services/addChat.tsx";
import {deleteChat} from "../services/deleteChat.tsx";

const initialState: ChatSchema = {
    chats: [],
    loading: false,
    error: null,
}

export const chatSlice = createSlice({
    name:'chat',
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder
            .addCase(fetchChats.pending, (state)=>{
                state.loading = true;
                state.error = null
            })
            .addCase(fetchChats.fulfilled, (state, action)=>{
                state.loading = false;
                state.error = null;
                state.chats = action.payload;
            })
            .addCase(fetchChats.rejected, (state, action)=>{
                state.loading = false;
                state.error = action.payload || ''
            })
            .addCase(addChat.pending, (state)=>{
                state.loading = true;
                state.error = null
            })
            .addCase(addChat.fulfilled, (state, action)=>{
                state.loading = false;
                state.error = null;
                state.chats.push(action.payload);
            })
            .addCase(addChat.rejected, (state, action)=>{
                state.loading = false;
                state.error = action.payload || ''
            })
            .addCase(deleteChat.pending, (state)=>{
                state.loading = true;
                state.error = null
            })
            .addCase(deleteChat.fulfilled, (state, action)=>{
                state.loading = false;
                state.error = null;
                state.chats = state.chats.filter((chat) => chat.id !== action.payload)
            })
            .addCase(deleteChat.rejected, (state, action)=>{
                state.loading = false;
                state.error = action.payload || ''
            })

    }
})
export const {reducer : chatReducer} = chatSlice;
export const {actions : chatActions} = chatSlice;