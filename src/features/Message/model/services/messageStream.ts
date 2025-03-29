import { AppDispatch } from "@/app/providers/StoreProvider";
import { messageActions } from "@/features/Message";
import {EventSource} from 'eventsource'

// interface SseMessage {
//     id: string;
//     chat_id: string;
//     content: string;
//     role: "user" | "assistant";
//     created_at: string;
//     status?: string;
// }


export const messageStream = (chatId: string, token: string, messageId: string) => (dispatch: AppDispatch) => {
    if (!chatId) {
        dispatch(messageActions.setError('Chat ID is required'));
        return () => {};
    }


    const url = new URL(`https://bothubq.com/api/v2/chat/${chatId}/stream`);


    const eventSource = new EventSource(url.toString(),  {
        fetch: (input, init) =>
            fetch(input, {
                ...init,
                headers: {
                    ...init?.headers,
                    Authorization: `Bearer ${token}`,
                },
            })
    }
    );

    console.log("Connecting to SSE:", url.toString());
    eventSource.onmessage = (event) => {
        try {
            const data = JSON.parse(event.data);
            console.log(data.data);
            if(data?.data?.message?.job?.status == 'DONE'){
                console.log('done');
                dispatch(messageActions.addMessage(({
                    id: messageId,
                    content: data.data.message.content,
                    chat_id: chatId,
                    timestamp:data.data.message.job.created_at,
                    role: 'assistant',
                })));
            }

        } catch (error) {
            console.error('SSE parse error:', error);
        }
    };

    eventSource.onerror = () => {
        dispatch(messageActions.setError('SSE connection error'));
    };

    return ()=> {

        console.log("Closing EventSource");
        eventSource.close();
    }
};