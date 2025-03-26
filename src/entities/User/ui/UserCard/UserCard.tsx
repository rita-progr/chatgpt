import cls from './UserCard.module.scss';
import {classNames} from "@/shared/lib/classNames/classNames";
import {useSelector} from "react-redux";
import {getUserName, userActions} from "@/entities/User";
import profile from "@/shared/assets/profile-pic.svg";
import logout from "@/shared/assets/logout.svg";
import {Button} from "@/shared/ui/Button/Button.tsx";
import {useAppDispatch} from "@/shared/lib/hooks/appDispatch/appDispatch.ts";
import {useCallback} from "react";

interface UserCardProps{
    className?: string;
}

export const UserCard = ({className}:UserCardProps) => {

    const name = useSelector(getUserName)
    const dispatch = useAppDispatch();

    const logoutClick = useCallback(() => {
        dispatch(userActions.logout());
    },[dispatch]);

    return (
        <div className={classNames(cls.UserCard, {},[className])}>
            <img src={profile} alt="профиль"/>
                <div className={cls.userName}>
                    {name && <p>{name}</p>}
                        <p>9 012 TKN</p>
                </div>
            <Button onClick = {logoutClick}>
                <img src={logout} alt=""/>
            </Button>

        </div>
    )
}