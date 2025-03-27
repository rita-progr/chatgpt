
export interface Message {
    id: string;
    chatId: string;
    text: string;
    sender: 'user' | 'AI';
    timestamp: string;
    status?: 'pending' | 'delivered' | 'read';
}
export interface MessageState {
    messages: Message[];
    loading: boolean;
    error:null|string;
    currentChatId: null|string;
}
