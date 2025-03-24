import cls from './UserForm.module.scss';
import {classNames} from "@/shared/lib/classNames/classNames";
import {useAppDispatch} from "@/shared/lib/hooks/appDispatch/appDispatch.ts";
import {useSelector} from "react-redux";
import {getUserPassword} from "../../model/selectors/getUserPassword/getUserPassword.tsx";
import {getUserName} from "../../model/selectors/getUserName/getUserName.tsx";
import {getUserError} from "../../model/selectors/getUserError/getUserError.tsx";
import {authActions, authReducer, loginByUserName} from "@/features/AuthByUserName";
import {useCallback} from "react";
import {Input} from "@/shared/ui/Input/Input.tsx";
import {Button, ButtonType} from "@/shared/ui/Button/Button.tsx";
import {CustomText} from "@/shared/ui/CustomText/CustomText.tsx";
import {DynemicModuleLoader, ReducersList} from "@/shared/lib/components/DynemicModuleLoader/DynemicModuleLoader.tsx";


interface UserFormProps{
    className?: string;
}

const intialReducer: ReducersList = {
    login: authReducer
}

const UserForm = ({className}:UserFormProps) => {

    const dispatch = useAppDispatch();

    const password = useSelector(getUserPassword);
    const username = useSelector(getUserName);
    const error = useSelector(getUserError);


    const onChangeUsername = useCallback((value:string)=>{
        dispatch(authActions.setUserName(value));
    },[dispatch])

    const onChangePassword = useCallback((value:string)=>{
        dispatch(authActions.setPassword(value));
    },[dispatch])


    const onLoginClick = useCallback(() => {
        dispatch(loginByUserName());
    }, [dispatch]);

    return (
        <DynemicModuleLoader reducers={intialReducer}>
        <div className={classNames(cls.UserForm, {}, [className])}>
            {error && <CustomText text={error}/>}
            <div className={cls.input}>
                <label>E-Mail</label>
                <Input onChange={onChangeUsername} value={username} placeholder={'Ваш E-Mail'}/>
            </div>
            <div  className={cls.input}>
                <label>Пароль</label>
                <Input onChange={onChangePassword} value={password} placeholder={'Ваш пароль'}/>
            </div>

            <Button className={cls.btn} type={ButtonType.PRIMARY} onClick={onLoginClick}>Войти</Button>
        </div>
        </DynemicModuleLoader>
    )
}
export default UserForm