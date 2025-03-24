import {StateSchema} from "@/app/providers/StoreProvider";

export const getUserName = (state:StateSchema) => state.login?.username;