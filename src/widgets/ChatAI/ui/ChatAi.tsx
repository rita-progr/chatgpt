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
import { useCallback, useEffect, useState} from "react";
import {Loader} from "@/shared/ui/Loader/Loader.tsx";
import {CustomText, TextAlign, TextTheme} from "@/shared/ui/CustomText/CustomText.tsx";
import {API_TOKEN} from "@/shared/api/api.ts";
import {Burger} from "@/widgets/BurgerBtn/ui/Burger.tsx";
import {SideBar} from "@/widgets/SideBar";
import {useMediaQuery} from "react-responsive";
import {
    getCurrentModelFunc, getCurrentModelId,
    modelsActions,
    ModelsSelect
} from "@/features/Models";
import {UpdateModel} from "@/features/Models/model/services/UpdateModel.tsx";
import {getChatId} from "@/features/chat";
import {getAllModels} from "@/features/Models/model/selectors/getModels/getAllModels.tsx";



interface ChatAiProps{
    className?: string;
    chat_id: string;
}

export const ChatAi = ({className, chat_id}:ChatAiProps) => {
    const dispatch = useAppDispatch();
    const loading = useSelector(getMessageLoading);
    const error = useSelector(getMessageError);
    const messages = useSelector(getMessages);
    const [isOpen, setIsOpen] = useState(false);
    const isSmall = useMediaQuery({maxWidth: 980});
    const getModelFunctionId = useSelector(getCurrentModelFunc);
    const currentModelID = useSelector(getCurrentModelId);
    // const value = useSelector(getCurrentModelName);
    const chatId = useSelector(getChatId);
    const options = useSelector(getAllModels);


    const onChange = useCallback((modelId: string) => {
        const selectedModel = options.find(model => model.id === modelId);
        if (selectedModel) {
            dispatch(modelsActions.setCurrentModel({
                model_id: selectedModel.id,
                name: selectedModel.label,
                model_function_id: selectedModel.functions[0].id || null
            }));

            dispatch(UpdateModel({chatId, modelId: modelId, modelFunctionId:  selectedModel.functions[0] || null}));
        }
    }, [dispatch, chatId, getModelFunctionId, options]);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        dispatch(messageActions.setCurrentChat(chat_id));
        dispatch(fetchMessages(chat_id));

    }, [chat_id, dispatch]);


    const handleSend = (content: string) => {
        const messageId = `temp-${Date.now()}`;
        dispatch(messageActions.addLocalMessage({
            id: `temp-${Date.now()}`,
            chat_id,
            content: content,
            role: 'user',
            timestamp: new Date().toISOString(),
            status: 'pending',
        }));
        dispatch(sendMessage({ chat_id, content }));
        const cleanup = dispatch(messageStream(chat_id, API_TOKEN, messageId));
        return () => {
            console.log("Closing EventSource connection");
            cleanup();
        };
    };

    return (
        <>
            {loading && <div className={cls.loader}> <Loader /></div>}
            <div className={classNames(cls.ChatAi, {},[className])}>
                <div className={cls.btn}>
                    {isSmall && <Burger onToggle={toggleMenu} open={isOpen} /> }
                </div>
                {isOpen ? (
                    <>
                        <SideBar/>
                    </>
                ): (
                    <>
                        <div className={cls.content}>
                            {!chat_id && error && <CustomText align={TextAlign.CENTER} theme={TextTheme.ERROR}
                                                              title='Произошла ошибка при загрузке чата, пожалуйста выберите чат'/>}
                            <MessageList messages={messages.filter(m => m.chat_id === chat_id)}/>
                        </div>
                        <ModelsSelect value={currentModelID} onChange={onChange}/>
                        <MessageInput onSend={handleSend}/>
                    </>
                    )}

            </div>
        </>
    )
}