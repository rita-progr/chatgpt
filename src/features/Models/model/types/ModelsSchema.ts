export interface ModelItem{
    id: string;
    name: string;
}

export interface ModelsSchema{
    isLoading: boolean,
    error: string|null,
    models: ModelItem[],
    currentModel?:ModelItem
}