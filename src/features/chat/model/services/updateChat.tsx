import {ThunkConfig} from "@/app/providers/StoreProvider";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {Chat} from "@/features/chat";

export const updateChat = createAsyncThunk<
    Chat,
    { chatId: string; newName: string },
    ThunkConfig
>('chats/updateChat', async ({ chatId, newName }, { extra, rejectWithValue }) => {
    try {
        const response = await extra.api.patch(`/chat/${chatId}`, { name: newName });

        if (!response.data) {
            throw new Error('Ошибка при обновлении чата');
        }

        return response.data;
    } catch (err) {
        console.error(err);
        return rejectWithValue('Не удалось обновить название чата');
    }
});