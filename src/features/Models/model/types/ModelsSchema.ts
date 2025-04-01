export interface ModelItem{
    id: string;
    label: string;
    functions?: any;
}

export interface updateModel {
    name?: string;
    model_id: string;
    model_function_id: string,
}

export interface ModelsSchema{
    isLoading: boolean,
    error: string|null,
    models: ModelItem[],
    currentModel?:updateModel
}