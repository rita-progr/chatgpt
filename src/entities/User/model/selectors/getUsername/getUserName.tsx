import {StateSchema} from "@/app/providers/StoreProvider";


export const getUserName = (state: StateSchema)=> state?.user?.authData?.username || '';