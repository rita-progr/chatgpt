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
            const response = await extra.api.get<Message[]>(`/chat/${chatId}/messages`);
            return response.data.map(msg => ({
                ...msg,
                sender: msg.sender === 'AI' ? 'AI' : 'user',
            }));
        } catch (e) {
            return rejectWithValue('Ошибка загрузки сообщений');
        }
    }
);