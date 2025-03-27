import cls from './ChatPage.module.scss';
import {classNames} from "@/shared/lib/classNames/classNames";
import {SideBar} from "@/widgets/SideBar";
import {ChatAi} from "@/widgets/ChatAI";
import {useSelector} from "react-redux";
import {getChatId} from "@/features/chat";



interface ChatPageProps{
    className?: string;
}

const ChatPage = ({className}:ChatPageProps) => {

    const chatId = useSelector(getChatId)

    return (
        <div className={classNames(cls.ChatPage, {},[className])}>
            <SideBar/>
            <div className={cls.windowChat}>
                <ChatAi chatId={chatId}/>
            </div>

        </div>
    )
}
export default ChatPage;
