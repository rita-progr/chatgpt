export interface Chat {
    id: string;
    name: string;
}

export interface ChatSchema {
    chats: Chat[];
    loading: boolean;
    error: string| null;
    currentChatId: string | null;
}