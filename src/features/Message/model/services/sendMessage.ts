import {createAsyncThunk} from "@reduxjs/toolkit";
import {Message} from "../types/MessageType.tsx";
import {ThunkConfig} from "@/app/providers/StoreProvider";

export const sendMessage = createAsyncThunk<Message, {chatId:string, text: string}, ThunkConfig>(
    'message/sendMessage',
    async ({chatId, text}, {extra,rejectWithValue}) => {
        try {
            const response = await extra.api.post<Message>('/message/send', {
                chatId,
                message: text,
                stream: true
            });
            return {
                id: response.data.id || Date.now().toString(),
                chatId,
                text: response.data.text,
                sender: 'user',
                timestamp: new Date().toISOString(),
            };
        }
        catch (e) {
            return rejectWithValue('Ошибка отправки сообщения');
        }
    }
)