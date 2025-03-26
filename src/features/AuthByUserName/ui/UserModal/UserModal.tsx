import cls from './UserModal.module.scss';
import {classNames} from "@/shared/lib/classNames/classNames";
import {Modal} from "@/shared/ui/Modal/Modal.tsx";
import {Suspense, useCallback} from "react";
import {UserFormAsync} from "../UserForm/UserForm.async.tsx";
import {Button, ButtonType} from "@/shared/ui/Button/Button.tsx";
import closeIcon from '@/shared/assets/close.svg';
import {loginByUserName} from "@/features/AuthByUserName";
import {useAppDispatch} from "@/shared/lib/hooks/appDispatch/appDispatch.ts";

interface UserModalProps{
    className?: string;
    isOpen?: boolean;
    onClose?: () => void;
}

export const UserModal = ({className, isOpen, onClose}:UserModalProps) => {

    const dispatch = useAppDispatch();
    const onLoginClick = useCallback(() => {
        dispatch(loginByUserName());
        if (onClose) {
            onClose();
        }
    }, [dispatch]);
    return (
        <Modal className={classNames(cls.UserModal, {},[className])}
        isOpen={isOpen}
        onClose={onClose}>
            <Suspense fallback={''}>
                <div className={cls.form}>
                    <div className={cls.titleForm}>
                        <p className={cls.auth}>Авторизация</p>
                        <Button className={cls.closeAbs} onClick={onClose}>
                            <img src={closeIcon} alt=""/>
                        </Button>
                    </div>
                    <div>
                        <UserFormAsync/>
                        <Button className={cls.btn} type={ButtonType.PRIMARY} onClick={onLoginClick}>Войти</Button>
                    </div>
                </div>
            </Suspense>
        </Modal>
    )
}