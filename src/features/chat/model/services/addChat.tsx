import {createAsyncThunk} from "@reduxjs/toolkit";

import {ThunkConfig} from "@/app/providers/StoreProvider";
import {Chat} from "@/features/chat/model/types/chatSchema.ts";



export const addChat = createAsyncThunk<Chat, string, ThunkConfig>(
    'chats/addChats',
    async (chatName,{rejectWithValue, extra}) => {
        try{
            const response = await extra.api.post(`/chat`, {name: chatName});
            if (!response.data) {
                throw new Error('Ошибка при создании чата');
            }
            return response.data;

        }catch(err){
            return rejectWithValue('Не удалось создать чат');
        }
    }
)