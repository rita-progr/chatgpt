import {Message} from "../../model/types/MessageType.tsx";
import cls from "./MessageList.module.scss"
import {MessageItem} from "../MessageSingle/Message.tsx";
import {classNames} from "@/shared/lib/classNames/classNames.tsx";


interface MessageListProps {
    messages: Message[];
    className?: string;
}

export const MessageList = ({ messages, className }: MessageListProps) => {


    return (
        <div style={{overflowY: 'auto' }} className={classNames(cls.MessageList, {}, [className])}>
            { messages.length === 0 && (
             <div className={cls.notFoundMsg}>Нет сообщений</div>
            )}
            {messages.map((message) => (
                <MessageItem key={message.id} message={message} />
            ))}
        </div>
    );
};