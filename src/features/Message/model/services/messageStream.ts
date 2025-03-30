import { AppDispatch } from "@/app/providers/StoreProvider";
import { messageActions } from "@/features/Message";
import {EventSource} from 'eventsource'

let activeEventSource: EventSource | null = null;

export const messageStream = (chatId: string, token: string, messageId: string) => (dispatch: AppDispatch) => {

    if (activeEventSource) {
        activeEventSource.close();
        activeEventSource = null;
    }


    if (!chatId) {
        dispatch(messageActions.setError('Chat ID is required'));
        return () => {};
    }


    const url = new URL(`https://bothubq.com/api/v2/chat/${chatId}/stream`);


    activeEventSource = new EventSource(url.toString(),  {
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
    dispatch(messageActions.loadMessages())

    console.log("Connecting to SSE:", url.toString());
    activeEventSource.onmessage = (event) => {
        try {
            const data = JSON.parse(event.data);
            console.log(data.data);
            if (!data?.data?.message?.content) {
                console.warn('Empty message received from server:', data);
                return;
            }
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

    activeEventSource.onerror = () => {
        dispatch(messageActions.setError('SSE connection error'));
    };

    return ()=> {

        console.log("Closing EventSource");
        activeEventSource?.close();
    }
};