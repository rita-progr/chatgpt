import {StateSchema} from "@/app/providers/StoreProvider";

export const getMessageError = (state: StateSchema)=> state?.message?.error || ''