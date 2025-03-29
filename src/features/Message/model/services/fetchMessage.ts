import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Message } from '../types/MessageType.tsx';

export const fetchMessages = createAsyncThunk<
    Message[],
    string, // chatId
    ThunkConfig
>(
    'message/fetchMessages',
    async (chatId, { extra, rejectWithValue }) => {
        try {
            const response = await extra.api.get<Message[]>(`/message/list/?chatId=${chatId}`);
            console.log('response', response);
            // @ts-ignore
            return response.data.data.map(msg => ({
                content: msg.content,
                chat_id: chatId,
                timestamp:msg.created_at,
                role: msg.role === 'assistant' ? 'assistant' : 'user',
            })).reverse();

        } catch (e) {
            return rejectWithValue('Ошибка загрузки сообщений');
        }
    }
);