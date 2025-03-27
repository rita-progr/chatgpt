import cls from './Input.module.scss';
import {classNames} from "@/shared/lib/classNames/classNames";
import {ChangeEvent, InputHTMLAttributes, memo} from "react";


type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'| 'readOnly'>;

interface InputProps extends HTMLInputProps {
    className?: string;
    classNameInput?: string;
    placeholder?: string;
    value?: string | number;
    onChange?: (value: string) => void;
}

export const Input = memo( function Input(props:InputProps){
    const {
        className,
        placeholder,
        type = 'text',
        value,
        classNameInput,
        onChange,
        ...otherProps
    } = props;

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
    }


    return (
        <div className={classNames(cls.InputWrapper, {}, [className,])}>
            <div className={classNames(cls.Input, {}, [classNameInput, ])}>
                <input type={type}
                       value={value}
                       onChange={onChangeHandler}
                       placeholder={placeholder}
                       {...otherProps}/>
            </div>
        </div>
    )
})