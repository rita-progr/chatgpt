import {ModelItem, ModelsSchema, updateModel} from "../types/ModelsSchema.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getModels} from "@/features/Models/model/services/getModels.tsx";
import {UpdateModel} from "@/features/Models/model/services/UpdateModel.tsx";

const initialState:ModelsSchema = {
    isLoading:false,
    error:null,
    models:[],
    currentModel: {
        model_id:'gpt',
        name:'ChatGPT',
        model_function_id:'describe',
    }
}

export const ModelsSlice = createSlice({
    name:'models',
    initialState,
    reducers:{
        setModel: (state, action)=>{
            state.currentModel = action.payload;
        }
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

            .addCase(UpdateModel.pending, (state)=>{
                state.isLoading = true;
                state.error = null
            })
            .addCase(UpdateModel.fulfilled, (state, action: PayloadAction<updateModel>)=>{
                state.isLoading = false;
                state.currentModel = action.payload
                state.error = null;
            })
            .addCase(UpdateModel.rejected, (state, action)=>{
                state.isLoading = false;
                state.error = action.payload as string;
            })
    }
})

export const {reducer: modelsReducer} = ModelsSlice;
export const {actions: modelsActions} = ModelsSlice;