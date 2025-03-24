import {NavigateOptions, To} from "react-router-dom";
import {AxiosInstance} from "axios";
import {UserSchema} from "@/entities/User";
import {AnyAction, EnhancedStore, Reducer, ReducersMapObject} from "@reduxjs/toolkit";
import {CombinedState} from "@reduxjs/toolkit/query";

export interface StateSchema {
    // counter: CounterSchema
    user: UserSchema
    login?: UserSchema
}

export type StateSchemaKeys = keyof StateSchema;

export interface reduxManagerInterface {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    //@ts-expect-error: This is a temporary workaround for a known issue
    reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
    add: (key: StateSchemaKeys, reducer: Reducer) => void;
    remove : (key: StateSchemaKeys)=> void;
}

export interface ReduxWithStoreManager extends  EnhancedStore<StateSchema>{
    reducerManager:reduxManagerInterface;
}

export interface ThunkExtraArgs{
    api:AxiosInstance;
    navigate?:  (to: To, options?: NavigateOptions) => void | Promise<void>;
}

export interface ThunkConfig{
    extra: ThunkExtraArgs;
    state: StateSchema;
    rejectValue: string;
}