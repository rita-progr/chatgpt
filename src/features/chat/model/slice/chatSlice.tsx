import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ChatSchema} from "../types/chatSchema.ts";
import {fetchChats} from "../services/fetchChats.tsx";
import {addChat} from "../services/addChat.tsx";
import {deleteChat} from "../services/deleteChat.tsx";
import {updateChat} from "@/features/chat/model/services/updateChat.tsx";

const initialState: ChatSchema = {
    chats: [],
    loading: false,
    error: null,
    currentChatId: null,
}

export const chatSlice = createSlice({
    name:'chat',
    initialState,
    reducers:{
        setCurrentChat: (state, action: PayloadAction<string>)=>{
            state.currentChatId = action.payload;
        },
        clearCurrentChat: (state) => {
            state.currentChatId = null;
        },
    },
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
            .addCase(updateChat.pending, (state)=>{
                state.loading = true;
                state.error = null
            })
            .addCase(updateChat.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;

                const index = state.chats.findIndex((chat) => chat.id === action.payload.id);
                if (index !== -1) {
                    state.chats[index] = action.payload;
                }
            })
            .addCase(updateChat.rejected, (state, action)=>{
                state.loading = false;
                state.error = action.payload || ''
            })

    }
})
export const {reducer : chatReducer} = chatSlice;
export const {actions : chatActions} = chatSlice;