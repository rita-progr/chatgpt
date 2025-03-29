import { UserModal } from "@/features/AuthByUserName/ui/UserModal/UserModal.tsx";
import { useCallback, useEffect, useState } from "react";
import { ChatPage } from "pages/ChatPage";
import { getUserName, userActions } from "@/entities/User";
import { useAppDispatch } from "@/shared/lib/hooks/appDispatch/appDispatch.ts";
import { useSelector } from "react-redux";
import {chatActions} from "@/features/chat";

function App() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useAppDispatch();
    const userName = useSelector(getUserName);
    // const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        dispatch(userActions.initAuthData())
        dispatch(chatActions.initCurrentChat())
    }, [dispatch]);

    const onClose = useCallback(() => {
        setIsModalOpen(false);
    }, []);

    useEffect(() => {
        // Показываем модалку, если пользователь не авторизован
        if (!userName) {
            setIsModalOpen(true);
        }
    }, [userName,]);

    return (
        <div>
            {!userName && (
                <UserModal
                    isOpen={isModalOpen}
                    onClose={onClose}
                />
            )}
            <ChatPage />

        </div>
    );
}

export default App;