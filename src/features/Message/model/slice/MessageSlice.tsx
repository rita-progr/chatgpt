import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Message, MessageState} from '../types/MessageType.tsx';
import {sendMessage} from "../services/sendMessage.ts";
import {fetchMessages} from "../services/fetchMessage.ts";


const initialState: MessageState = {
    messages: [],
    loading: false,
    error: null,
    currentChatId: null,
};

const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        addLocalMessage: (state, action: PayloadAction<Message>) => {
            state.messages.push(action.payload);
        },
        setCurrentChat: (state, action: PayloadAction<string>) => {
            state.currentChatId = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendMessage.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(sendMessage.fulfilled, (state, action) => {
                state.loading = false;
                state.messages.push(action.payload);
            })
            .addCase(sendMessage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Unknown error';
            })

            .addCase(fetchMessages.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMessages.fulfilled, (state, action) => {
                state.loading = false;

                state.messages = [
                    ...state.messages.filter(m => m.chatId !== state.currentChatId),
                    ...action.payload
                ];
            })
            .addCase(fetchMessages.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Unknown error';
            });
    },
});

export const {actions: messageActions} = messageSlice;

export const {reducer : messageReducer} = messageSlice;