import {ModelItem, ModelsSchema} from "../types/ModelsSchema.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getModels} from "@/features/Models/model/services/getModels.tsx";

const initialState:ModelsSchema = {
    isLoading:false,
    error:null,
    models:[],
    currentModel: undefined
}

export const ModelsSlice = createSlice({
    name:'models',
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
            .addCase(getModels.pending, (state)=>{
                state.isLoading = true;
                state.error = null
            })
            .addCase(getModels.fulfilled, (state, action: PayloadAction<ModelItem[]>)=>{
                state.isLoading = false;
                state.models = action.payload
                state.error = null;
            })
            .addCase(getModels.rejected, (state, action)=>{
                state.isLoading = false;
                state.error = action.payload as string;
            })
    }
})

export const {reducer: modelsReducer} = ModelsSlice;
export const {actions: modelsActions} = ModelsSlice;