import {KeyboardEvent, useState} from 'react';
import cls from './MessageInput.module.scss';

import {classNames} from '@/shared/lib/classNames/classNames';
import {Input} from "@/shared/ui/Input/Input.tsx";
import send from '@/shared/assets/send.svg'
import {Button, ButtonType} from "@/shared/ui/Button/Button.tsx";

interface MessageInputProps {
    onSend: (message: string) => void;
    disabled?: boolean;
    placeholder?: string;
    className?: string;
}

export const MessageInput = ({
                                 onSend,
                                 disabled = false,
                                 placeholder = 'Введите сообщение...',
                                 className,
                             }: MessageInputProps) => {
    const [message, setMessage] = useState('');

    const handleSend = () => {
        if (message.trim() && !disabled) {
            onSend(message.trim());
            setMessage('');
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className={classNames(cls.messageInputContainer, {}, [className])}>
            <Input
                value={message}
                onChange={setMessage}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                disabled={disabled}
                className={cls.messageInput}
                classNameInput={cls.messageInputReset}
                aria-label="Поле ввода сообщения"
            />

            <Button type = {ButtonType.PRIMARY}
                    onClick={handleSend}
                    className={cls.btn}
                    disabled={disabled || !message.trim()}>
                <img src={send} alt="отправить" />
            </Button>
        </div>
    );
};
