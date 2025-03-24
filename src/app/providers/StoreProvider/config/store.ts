import {StateSchema, ThunkExtraArgs} from "./StateSchema.ts";
import {configureStore, ReducersMapObject} from "@reduxjs/toolkit";
import {NavigateOptions, To} from "react-router-dom";
import {$api} from "@/shared/api/api";
// import {IS_DEV} from "@/shared/const/global.ts";
import {userReducer} from "@/entities/User";
import {createReducerManager} from "@/app/providers/StoreProvider/config/reducerManager.ts";

export const createReduxStore = (initialState?: StateSchema,asyncReducers?: ReducersMapObject<StateSchema>, navigate?:  (to: To, options?: NavigateOptions) => void | Promise<void>)=>{
    const extraArg: ThunkExtraArgs = {
        api: $api,
        navigate
    }

    const rootReducer: ReducersMapObject<StateSchema> = {
        ...asyncReducers,
        // counter: counterReducer,
        user: userReducer,
    }

    const reducerManager = createReducerManager(rootReducer);

    const store = configureStore({
        reducer: reducerManager.reduce,
        preloadedState:initialState,
        middleware: getDefaultMiddleware => getDefaultMiddleware({
            thunk: {
                extraArgument: extraArg
            }
        })
    })

    //@ts-expect-error: This is a temporary workaround for a known issue
    store.reducerManager = reducerManager;

    return store;

}

export type AppDispatch = ReturnType<typeof createReduxStore>["dispatch"]