import {createAsyncThunk} from "@reduxjs/toolkit";
import {ModelItem} from "../types/ModelsSchema.ts";
import {ThunkConfig} from "@/app/providers/StoreProvider";

export const getModels = createAsyncThunk<ModelItem[], void , ThunkConfig>(
    'models/getModels',
    async (_, {extra, rejectWithValue})=>{
        try{
            const response = await extra.api.get<ModelItem[]>('/model/list');
            console.log('response', response.data);

            return response.data;

        }catch(err){
            return rejectWithValue('Произошла ошибка при получении моделей')
        }
    }
)