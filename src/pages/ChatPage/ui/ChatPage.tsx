import cls from './ChatPage.module.scss';
import {classNames} from "@/shared/lib/classNames/classNames";
import {SideBar} from "@/widgets/SideBar";

interface ChatPageProps{
    className?: string;
}

const ChatPage = ({className}:ChatPageProps) => {

    return (
        <div className={classNames(cls.ChatPage, {},[className])}>
            <SideBar/>
        </div>
    )
}
export default ChatPage;
