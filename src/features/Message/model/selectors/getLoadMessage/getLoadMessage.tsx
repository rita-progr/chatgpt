import {StateSchema} from "@/app/providers/StoreProvider";

export const getLoadMessage = (state: StateSchema)=> state?.message?.currentLoadingMessageId || null