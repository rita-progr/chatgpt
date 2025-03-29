import {Message} from "../../model/types/MessageType.tsx";
import cls from "./MessageList.module.scss"
import {MessageItem} from "../MessageSingle/Message.tsx";
import {classNames} from "@/shared/lib/classNames/classNames.tsx";
import {useSelector} from "react-redux";
import {getLoadMessage} from "@/features/Message";
import {Loader} from "@/shared/ui/Loader/Loader.tsx";


interface MessageListProps {
    messages: Message[];
    className?: string;
}

export const MessageList = ({ messages, className }: MessageListProps) => {
    const loadingMessage = useSelector(getLoadMessage);
    console.log(loadingMessage);

    return (
        <div style={{overflowY: 'auto' }} className={classNames(cls.MessageList, {}, [className])}>
            { messages.length === 0 && (
             <div className={cls.notFoundMsg}>Нет сообщений</div>
            )}
            {messages.map((message, index) => (
                <>
                <MessageItem key={index} message={message} />
                </>
            ))}
            {loadingMessage && (
                <div>
                   Пожалуйста, подождите...
                </div>
            )}

        </div>
    );
};