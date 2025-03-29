import avatar from '@/shared/assets/default-avatar.svg'
import cls from "./Message.module.scss"
import { Message } from '../../model/types/MessageType.tsx';



interface MessageItemProps {
    message: Message; // Сообщение для отображения
}

export const MessageItem = ({ message }: MessageItemProps) => {


    if (!message?.content?.trim()) {
        return null;
    }
    return (
        <>
            <div className={cls.msgCont} style = {{ alignSelf: message.role === 'user' ? 'flex-end' : 'flex-start'}}>


                <div
                    className={message.role === 'user'? cls.UserMes : cls.AiMes}
                >
                    <p className={cls.text}>{message.content}</p>
                    <p style={{color: '#FFF', fontSize: '8px', textAlign: 'right'}}>
                        {new Date(message?.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
                    </p>
                </div>
                {message.role === 'user' && (
                    <img src={avatar} alt=""/>
                ) }
            </div>
        </>

    );
};