import {StateSchema} from "@/app/providers/StoreProvider";

export const getLoadMessage = (state: StateSchema)=> state?.message?.currentLoading|| false