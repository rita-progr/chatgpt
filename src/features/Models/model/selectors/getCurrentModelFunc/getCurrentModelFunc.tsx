import {StateSchema} from "@/app/providers/StoreProvider";

export const getCurrentModelFunc = (state: StateSchema)=>state?.models?.currentModel?.model_function_id || '';