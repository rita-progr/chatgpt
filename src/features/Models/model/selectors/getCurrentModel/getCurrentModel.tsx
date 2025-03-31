import {StateSchema} from "@/app/providers/StoreProvider";

export const getCurrentModels = (state: StateSchema)=>state?.models?.currentModel || '';