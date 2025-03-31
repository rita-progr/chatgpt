import {StateSchema} from "@/app/providers/StoreProvider";

export const getCurrentModelName = (state: StateSchema)=>state?.models?.currentModel?.name || '';