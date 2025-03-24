import {FC, ReactNode, useEffect} from "react";
import {useStore} from "react-redux";


import {Reducer} from "@reduxjs/toolkit";
import {ReduxWithStoreManager} from "@/app/providers/StoreProvider";
import {useAppDispatch} from "@/shared/lib/hooks/appDispatch/appDispatch.ts";
import {StateSchemaKeys} from "@/app/providers/StoreProvider/config/StateSchema.ts";


export type ReducersList = {
    [name in StateSchemaKeys]?: Reducer
}



interface DynemicModuleLoaderProps{
    children?: ReactNode;
    reducers?: ReducersList;
}

export const DynemicModuleLoader: FC<DynemicModuleLoaderProps> = (props) => {
    const {children, reducers = {}} = props;
    const store = useStore() as ReduxWithStoreManager;
    const dispatch= useAppDispatch();
    useEffect(() => {
        Object.entries(reducers).forEach(([name,reducer])=>{
            store.reducerManager.add(name as StateSchemaKeys , reducer);
            dispatch({type: `@INIT ${name} reducer`});
        })

        return ()=>{
            Object.entries(reducers).forEach(([name])=>{
                store.reducerManager.remove('login');
                dispatch({type: `@DESTROY ${name} reducer`});
            })

        }
        //eslint-disable-next-line
    }, []);
    return (
        <>
            { children }
        </>
    )
}