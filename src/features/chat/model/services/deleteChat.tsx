import {createAsyncThunk} from "@reduxjs/toolkit";

import {ThunkConfig} from "@/app/providers/StoreProvider";



export const deleteChat = createAsyncThunk<string, string, ThunkConfig>(
    'chats/deleteChats',
    async (chatId,{rejectWithValue, extra}) => {
        try{
            await extra.api.delete(`/chat/${chatId}`);
            return chatId;

        }catch(err){
            return rejectWithValue('Не удалось удалить чат');
        }
    }
)