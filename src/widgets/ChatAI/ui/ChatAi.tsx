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
import {API_TOKEN} from "@/shared/api/api.ts";


interface ChatAiProps{
    className?: string;
    chat_id: string;
}

export const ChatAi = ({className, chat_id}:ChatAiProps) => {
    const dispatch = useAppDispatch();
    const loading = useSelector(getMessageLoading);
    const error = useSelector(getMessageError);
    const messages = useSelector(getMessages);


    useEffect(() => {
        dispatch(messageActions.setCurrentChat(chat_id));
        dispatch(fetchMessages(chat_id));
        const cleanup = dispatch(messageStream(chat_id, API_TOKEN ));
        return () => cleanup();
    }, [chat_id, dispatch]);


    const handleSend = (content: string) => {
        dispatch(messageActions.addLocalMessage({
            id: `temp-${Date.now()}`,
            chat_id,
            content,
            role: 'user',
            timestamp: new Date().toISOString(),
            status: 'pending',
        }));

        dispatch(sendMessage({ chat_id, content }));
    };

    return (
        <>
            {loading && <div className={cls.loader}> <Loader /></div>}
            <div className={classNames(cls.ChatAi, {},[className])}>
                <div className={cls.content}>
                    {error && <CustomText align={TextAlign.CENTER} theme={TextTheme.ERROR} title ='Произошла ошибка при загрузке чата, пожалуйста выберите чат'/>}
                    <MessageList messages={messages.filter(m => m.chat_id === chat_id)} />
                </div>
                <MessageInput onSend={handleSend} />
            </div>
        </>
    )
}