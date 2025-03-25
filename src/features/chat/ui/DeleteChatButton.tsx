import {useAppDispatch} from "@/shared/lib/hooks/appDispatch/appDispatch.ts";
import {deleteChat} from "../model/services/deleteChat.tsx";
import {Button, ButtonType} from "@/shared/ui/Button/Button.tsx";
import deleteIcon from '@/shared/assets/delete.svg'


interface DeleteChatButtonProps {
    chatId: string; // ID чата
}
export const DeleteChatButton = ({ chatId }: DeleteChatButtonProps) => {
    const dispatch = useAppDispatch();

    const handleDelete = () => {
        dispatch(deleteChat(chatId));
    };

    return (
        <Button onClick={handleDelete} type={ButtonType.NONE} style={{ color: 'red' }}>
            <img src={deleteIcon} alt="удалить"/>
        </Button>
    );
};