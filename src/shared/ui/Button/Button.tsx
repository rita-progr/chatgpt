import cls from './Button.module.scss';
import {classNames} from "@/shared/lib/classNames/classNames";
import {memo, ReactNode} from "react";

export enum ButtonType {
    PRIMARY = 'primary',
    WHITE = 'white',
    NONE = 'none',
}

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
    className?: string;
    children?: ReactNode;
    onClick?: () => void;
    type?: ButtonType;
}

export const Button = memo(({className, children, onClick, type = ButtonType.NONE}:ButtonProps) => {
    return (
        <button className={classNames(cls.Button, {},[className, cls[type]])} onClick={onClick}>
            {children}
        </button>
    )
})