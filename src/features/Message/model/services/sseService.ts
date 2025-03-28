import { EventSource } from 'eventsource'

interface SSEOptions {
    onMessage: (data: any) => void
    onError?: (error: any) => void
}

export const createSSEConnection = (chat_id: string, token: string, options: SSEOptions) => {
    const url = `https://bothubq.com/api/v2/chats/${chat_id}/stream`
    const eventSource = new EventSource(`${url}?token=${token}`)

    eventSource.onmessage = (event) => {
        try {
            const data = JSON.parse(event.data)
            options.onMessage(data)
        } catch (error) {
            options.onError?.(error)
        }
    }

    eventSource.onerror = (error) => {
        options.onError?.(error)
        eventSource.close()
    }

    return {
        close: () => eventSource.close()
    }
}