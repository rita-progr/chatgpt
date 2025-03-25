import cls from './SideBar.module.scss';
import {classNames} from "@/shared/lib/classNames/classNames";
import {useAppDispatch} from "@/shared/lib/hooks/appDispatch/appDispatch.ts";
import {useSelector} from "react-redux";
import {addChat, DeleteChatButton, fetchChats, getChatsList} from "@/features/chat";
import {useEffect, useState} from "react";
import logo from '@/shared/assets/logo.svg'
import languageSw from '@/shared/assets/language.svg'
import addChatIcon from '@/shared/assets/add-chat.svg'
import search from '@/shared/assets/search-simple.svg'
import {Button, ButtonType} from "@/shared/ui/Button/Button.tsx";

interface SideBarProps{
    className?: string;
}

export const SideBar = ({className}:SideBarProps) => {

    const dispatch = useAppDispatch();
    const chats = useSelector(getChatsList);
    console.log(chats);
    const [newChatName, setNewChatName] = useState<string>('');

    useEffect(()=>{
        dispatch(fetchChats());
    },[dispatch]);

    const handleAddChat = () => {
        if (newChatName.trim()) {
            dispatch(addChat(newChatName));
            setNewChatName('');
        }
    };

    return (
        <div className={classNames(cls.SideBar, {},[className])}>
            <div>
                <div className={cls.sideBarHeader}>
                    <img src={logo} alt="логотип"/>
                    <img src={languageSw} alt="переключить язык"/>
                </div>

                <div>
                    <div className={cls.contentBtns}>
                        <Button className={cls.addChatBtn} type={ButtonType.PRIMARY} onClick={handleAddChat}>
                            <img src={addChatIcon} alt=""/>
                        </Button>
                        <Button className={cls.searchChatBtn} type={ButtonType.NONE}>
                            <img src={search} alt=""/>
                        </Button>
                    </div>

                    <div className={cls.chatsList}>
                        <ul>
                            {chats?.map((chat: any) => (
                                <li key={chat.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    {chat.name}
                                    <DeleteChatButton chatId={chat.id} />
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>

            </div>
        </div>
    )
}