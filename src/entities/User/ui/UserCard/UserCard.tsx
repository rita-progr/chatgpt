import cls from './UserCard.module.scss';
import {classNames} from "@/shared/lib/classNames/classNames";
import {useSelector} from "react-redux";
import {getUserName} from "@/entities/User";
import profile from "@/shared/assets/profile-pic.svg";
import logout from "@/shared/assets/logout.svg";

interface UserCardProps{
    className?: string;
}

export const UserCard = ({className}:UserCardProps) => {

    const name = useSelector(getUserName)

    return (
        <div className={classNames(cls.UserCard, {},[className])}>
            <img src={profile} alt="профиль"/>
                <div>
                    {name && <p>{name}</p>}
                        <p>9 012 TKN</p>
                </div>
            <img src={logout} alt=""/>
        </div>
    )
}