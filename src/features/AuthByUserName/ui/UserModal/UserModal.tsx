import cls from './UserModal.module.scss';
import {classNames} from "@/shared/lib/classNames/classNames";
import {Modal} from "@/shared/ui/Modal/Modal.tsx";
import {Suspense} from "react";
import {UserFormAsync} from "../UserForm/UserForm.async.tsx";
import {Button} from "@/shared/ui/Button/Button.tsx";
import closeIcon from '@/shared/assets/close.svg';

interface UserModalProps{
    className?: string;
    isOpen?: boolean;
    onClose?: () => void;
}

export const UserModal = ({className, isOpen, onClose}:UserModalProps) => {
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

                    <UserFormAsync/>
                </div>
            </Suspense>
        </Modal>
    )
}