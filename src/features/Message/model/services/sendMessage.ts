import {createAsyncThunk} from "@reduxjs/toolkit";
import {Message} from "../types/MessageType.tsx";
import {ThunkConfig} from "@/app/providers/StoreProvider";

export const sendMessage = createAsyncThunk<Message, {chat_id:string, content: string}, ThunkConfig>(
    'message/sendMessage',
    async ({chat_id, content}, {extra,rejectWithValue}) => {
        try {
            const response = await extra.api.post<Message>('/message/send', {
                chatId: chat_id,
                message: content,
            });

            return {
                id: response.data.id || Date.now().toString(),
                chat_id,
                content: response.data.content,
                role: response.data.role,
                timestamp: new Date().toISOString(),
            };
        }
        catch (e) {
            return rejectWithValue('Ошибка отправки сообщения');
        }
    }
)