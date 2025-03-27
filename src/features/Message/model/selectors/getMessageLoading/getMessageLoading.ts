import {StateSchema} from "@/app/providers/StoreProvider";

export const getMessageLoading = (state: StateSchema)=> state?.message?.loading || false