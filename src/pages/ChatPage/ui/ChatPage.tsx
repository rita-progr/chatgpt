import cls from './ChatPage.module.scss';
import {classNames} from "@/shared/lib/classNames/classNames";
import {SideBar} from "@/widgets/SideBar";
import {ChatAi} from "@/widgets/ChatAI";
import {useSelector} from "react-redux";
import {getChatId} from "@/features/chat";
import {useMediaQuery} from "react-responsive";

interface ChatPageProps {
    className?: string;
}

const ChatPage = ({className}: ChatPageProps) => {
    const isSmall = useMediaQuery({maxWidth: 980});

    const chatId = useSelector(getChatId)
    console.log(chatId);

    return (
        <div className={classNames(cls.ChatPage, {}, [className])}>
            {!isSmall &&  <SideBar/>}
            <div className={cls.windowChat}>
                <ChatAi chat_id={chatId}/>
            </div>

        </div>
    )
}
export default ChatPage;
