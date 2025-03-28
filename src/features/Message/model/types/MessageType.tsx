
export interface Message {
    created_at?: any;
    id?: string;
    chat_id: string;
    content: string;
    role: 'user' | 'assistant';
    timestamp?: string;
    status?: 'pending' | 'delivered' | 'read';
    model?: string;
    tokens?:string|number;
}

export interface MessageState {
    messages: Message[];
    loading: boolean;
    error:null|string;
    currentChatId: null|string;
}
