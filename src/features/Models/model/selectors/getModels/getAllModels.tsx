import {StateSchema} from "@/app/providers/StoreProvider";

export const getAllModels = (state: StateSchema)=>state.models.models;