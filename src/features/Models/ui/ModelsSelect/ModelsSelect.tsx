import cls from './ModelsSelect.module.scss';
import {classNames} from "@/shared/lib/classNames/classNames";
import {ChangeEvent, useEffect, useMemo} from "react";
import {useSelector} from "react-redux";
import {getAllModels} from "../../model/selectors/getModels/getAllModels.tsx";
import {useAppDispatch} from "@/shared/lib/hooks/appDispatch/appDispatch.ts";
import {getModels} from "@/features/Models";



interface ModelsSelectProps{
    className?: string;
    value: string;
    onChange?: (value: string) => void;
}

export const ModelsSelect = (props:ModelsSelectProps) => {

    const { className,  value,  onChange} = props;

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getModels())
    }, [dispatch]);


    const options = useSelector(getAllModels);

    const listOption= useMemo(()=> options?.map((opt)=>(
        <option value={opt.id} key = {opt.id}>
            {opt.label}
        </option>
    )),[options]);

    const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>)=> {
        onChange?.(e.target.value)
    }

    return (
        <>
            <select name="lsd" id="1"
                    className={classNames(cls.ModelsSelect, {}, [className])}
                    onChange={onChangeHandler}
                    value={value}
            >
                {listOption}
            </select>
        </>
    )
}