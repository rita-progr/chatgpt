import cls from './ChatAi.module.scss';
import {classNames} from "@/shared/lib/classNames/classNames";
import {useAppDispatch} from "@/shared/lib/hooks/appDispatch/appDispatch.ts";
import {useSelector} from "react-redux";

import {
    fetchMessages,
    getMessageError,
    getMessageLoading,
    getMessages,
    messageActions,
    MessageInput,
    MessageList,
    messageStream,
    sendMessage
} from "@/features/Message";
import {useEffect} from "react";
import {Loader} from "@/shared/ui/Loader/Loader.tsx";
import {CustomText, TextAlign, TextTheme} from "@/shared/ui/CustomText/CustomText.tsx";


interface ChatAiProps{
    className?: string;
    chatId: string;
}

export const ChatAi = ({className, chatId}:ChatAiProps) => {
    const dispatch = useAppDispatch();
    const loading = useSelector(getMessageLoading);
    const error = useSelector(getMessageError);
    const messages = useSelector(getMessages);

    useEffect(() => {
        dispatch(messageActions.setCurrentChat(chatId));
        dispatch(fetchMessages(chatId));
        const cleanup = dispatch(messageStream(chatId));

        return () => cleanup();
    }, [chatId, dispatch]);

    const handleSend = (text: string) => {
        dispatch(messageActions.addLocalMessage({
            id: `temp-${Date.now()}`,
            chatId,
            text,
            sender: 'user',
            timestamp: new Date().toISOString(),
            status: 'pending',
        }));

        dispatch(sendMessage({ chatId, text }));
    };

    return (
        <>
            {loading && <div className={cls.loader}> <Loader /></div>}
            <div className={classNames(cls.ChatAi, {},[className])}>
                <div className={cls.content}>
                    {error && <CustomText align={TextAlign.CENTER} theme={TextTheme.ERROR} title ='Произошла ошибка при загрузке чата'/>}
                    <MessageList messages={messages.filter(m => m.chatId === chatId)} />
                </div>
                <MessageInput onSend={handleSend} />
            </div>
        </>
    )
}