import cls from './Burger.module.scss';
import {classNames, Mods} from "@/shared/lib/classNames/classNames";
import {Button, ButtonType} from "@/shared/ui/Button/Button.tsx";


interface BurgerProps{
    className?: string;
    onToggle?: () => void;
    open?: boolean;
}

export const Burger = ({className, open, onToggle}:BurgerProps) => {

    const mods: Mods = {
        [cls.open]:open
    }
    return (
        <Button type = {ButtonType.WHITE}  className={classNames(cls.burgerContainer, mods, [className])} onClick={onToggle}>
            <span className= {cls.burgerLine}></span>
            <span className={cls.burgerLine}></span>
            <span className={cls.burgerLine}></span>
        </Button>
    )
}