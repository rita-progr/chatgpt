import {StateSchema} from "@/app/providers/StoreProvider";

export const getUserError = (state:StateSchema) => state.login?.error;