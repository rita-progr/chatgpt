import {NavigateOptions, To} from "react-router-dom";
import {AxiosInstance} from "axios";
import {UserSchema} from "@/entities/User";
import {AnyAction, EnhancedStore, Reducer, ReducersMapObject} from "@reduxjs/toolkit";
import {CombinedState} from "@reduxjs/toolkit/query";
import {AuthByUserNameSchema} from "@/features/AuthByUserName";
import {ChatSchema} from "@/features/chat/model/types/chatSchema.ts";
import {MessageState} from "@/features/Message";
import {ModelsSchema} from "@/features/Models";

export interface StateSchema {
    user: UserSchema
    chat: ChatSchema
    message: MessageState
    login?: AuthByUserNameSchema
    models: ModelsSchema
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