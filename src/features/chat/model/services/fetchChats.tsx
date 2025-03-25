import {createAsyncThunk} from "@reduxjs/toolkit";
import {Chat} from "../types/chatSchema.ts";
import {ThunkConfig} from "@/app/providers/StoreProvider";



export const fetchChats = createAsyncThunk<Chat[], void, ThunkConfig>(
    'chats/fetchChats',
    async (_,{rejectWithValue, extra}) => {
        try{
            const response = await extra.api.get('/chat/list');

            if (!response.data) {
                throw new Error('Ошибка при загрузке чатов');
            }
            return response.data.data;
        }catch(err){
            return rejectWithValue('Не удалось загрузить чаты');
        }
    }
)