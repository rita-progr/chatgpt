// src/entities/Message/ui/MessageItem.tsx
import cls from "./Message.module.scss"
import { Message } from '../../model/types/MessageType.tsx';

interface MessageItemProps {
    message: Message; // Сообщение для отображения
}

export const MessageItem = ({ message }: MessageItemProps) => {
    return (
        <div className={cls.msgCont} style = {{ alignSelf: message.sender === 'user' ? 'flex-end' : 'flex-start'}}>
            <div
                className={cls.Message}
                style={{
                    background: message.sender === 'user' ? 'rgba(71,133,255,0.5)' : '#ffffff',
                }}
            >
                <p className={cls.text}>{message.text}</p>
                <p style={{color: '#FFF', fontSize: '8px', textAlign: 'right'}}>
                    {new Date(message.timestamp).toLocaleTimeString()}
                </p>
            </div>
        </div>

    );
};