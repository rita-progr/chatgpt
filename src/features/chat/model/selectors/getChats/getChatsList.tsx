import {StateSchema} from "@/app/providers/StoreProvider";

export const getChatsList= (state: StateSchema) => state.chat?.chats || []