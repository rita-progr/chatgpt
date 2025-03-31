import {createAsyncThunk} from "@reduxjs/toolkit";
import {updateModel} from "../types/ModelsSchema.ts";
import {ThunkConfig} from "@/app/providers/StoreProvider";

export const UpdateModel = createAsyncThunk<updateModel, {chatId: string, modelId:string, modelFunctionId: string} , ThunkConfig>(
    'models/UpdateModel',
    async ({chatId, modelId, modelFunctionId}, {extra, rejectWithValue})=>{
        try{
            const response = await extra.api.patch<updateModel>(`/chat/${chatId}`,
                {
                    modelId,
                    modelFunctionId,
                    initial: true,
                    groupId:""
                });
            console.log('response', response.data);

            return response.data;

        }catch(err){
            return rejectWithValue('Произошла ошибка при получении моделей')
        }
    }
)