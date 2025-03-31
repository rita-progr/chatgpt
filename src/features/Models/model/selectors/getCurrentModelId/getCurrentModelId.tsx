import {StateSchema} from "@/app/providers/StoreProvider";

export const getCurrentModelId = (state: StateSchema)=>state?.models?.currentModel?.model_id || '';