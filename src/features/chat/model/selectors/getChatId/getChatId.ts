import {StateSchema} from "@/app/providers/StoreProvider";

export const getChatId = (state:StateSchema) => state?.chat?.currentChatId || ''