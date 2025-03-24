import {StateSchema} from "@/app/providers/StoreProvider/config/StateSchema.ts";
import {NavigateOptions, To, useNavigate} from "react-router-dom";
import {ReactNode} from "react";
import {ReducersMapObject} from "@reduxjs/toolkit";
import {createReduxStore} from "../config/store.ts";
import {Provider} from "react-redux";

interface StoreProviderProps{
    children?: ReactNode
    initialState?: Partial<StateSchema>;
    navigate?:  (to: To, options?: NavigateOptions) => void | Promise<void>;
    asuncReducers?: Partial<ReducersMapObject<StateSchema>>;
}

export const StoreProvider = (props:StoreProviderProps) => {
    const {
        children,
        initialState,
        asuncReducers
    } = props;

    const navigate = useNavigate();

    const store = createReduxStore(initialState as StateSchema, asuncReducers as ReducersMapObject<StateSchema>, navigate);

    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}