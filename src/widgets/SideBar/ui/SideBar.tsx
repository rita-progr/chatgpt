import cls from './SideBar.module.scss';
import {classNames} from "@/shared/lib/classNames/classNames";
import {useAppDispatch} from "@/shared/lib/hooks/appDispatch/appDispatch.ts";
import {useSelector} from "react-redux";
import {addChat, Chat,  DeleteChatButton, fetchChats, getChatsList, updateChat} from "@/features/chat";
import {useEffect, useState} from "react";
import logo from '@/shared/assets/logo.svg'
import languageSw from '@/shared/assets/language.svg'
import addChatIcon from '@/shared/assets/add-chat.svg'
import search from '@/shared/assets/search-simple.svg'
import {Button, ButtonType} from "@/shared/ui/Button/Button.tsx";
import {UserCard} from "@/entities/User/ui/UserCard/UserCard.tsx";
import {getUserError, getUserLoading} from "@/features/AuthByUserName";
import {Loader} from "@/shared/ui/Loader/Loader.tsx";

interface SideBarProps{
    className?: string;
}

export const SideBar = ({className}:SideBarProps) => {

    const dispatch = useAppDispatch();
    const chats = useSelector(getChatsList);
    const loading = useSelector(getUserLoading);
    const error = useSelector(getUserError);

    // const [editingChatId, setEditingChatId] = useState<string | null>(null);
    // const [editName, setEditName] = useState("");
    //
    // const [newChatName, setNewChatName] = useState<string>('');

    useEffect(()=>{
        dispatch(fetchChats());
    },[dispatch]);

    const handleAddChat = async () => {
        await dispatch(addChat());
    };
    //
    // const startEditing = (chat: Chat) => {
    //     setEditingChatId(chat.id);
    //     setEditName(chat.name);
    // };

    // const saveEdit = (id: string) => {
    //     dispatch(updateChat{ id, name: editName }));
    //     setEditingChatId(null);
    // };

    if(loading){
        return <Loader />;
    }

    return (
        <div className={classNames(cls.SideBar, {},[className])}>
            {error && <p>error</p>}
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
            <div className={cls.userCard}>
                <UserCard/>
            </div>
            </div>
    )
}