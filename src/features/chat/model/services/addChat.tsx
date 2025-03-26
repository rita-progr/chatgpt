import {createAsyncThunk} from "@reduxjs/toolkit";

import {ThunkConfig} from "@/app/providers/StoreProvider";
import {Chat} from "@/features/chat/model/types/chatSchema.ts";



export const addChat = createAsyncThunk<Chat, void, ThunkConfig>(
    'chats/addChats',
    async (_,{rejectWithValue, extra}) => {
        try{
            const response = await extra.api.post(`/chat`, {name: "Новый чат"});
            if (!response.data) {
                throw new Error('Ошибка при создании чата');
            }
            return response.data;

        }catch(err){
            return rejectWithValue('Не удалось создать чат');
        }
    }
)