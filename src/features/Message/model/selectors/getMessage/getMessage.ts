import {StateSchema} from "@/app/providers/StoreProvider";

export const getMessages = (state: StateSchema)=> state?.message?.messages || []