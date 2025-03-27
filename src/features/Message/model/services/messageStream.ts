
import { messageActions } from '../slice/MessageSlice.tsx';
import {Message} from "../types/MessageType.tsx";
import {AppDispatch} from "@/app/providers/StoreProvider";

export const messageStream = (chatId: string) => (dispatch: AppDispatch) => {
    const eventSource = new EventSource(`/chat/${chatId}/stream`);

    eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data) as Message;
        dispatch(messageActions.addLocalMessage({
            ...data,
            sender: 'AI',
            timestamp: new Date().toISOString(),
        }));
    };

    eventSource.onerror = () => {
        eventSource.close();
    };

    return () => {
        eventSource.close();
    };
};