export enum DataStateEnum{
    LOADING,
    LOADED,
    ERROR
    
}

export interface AppDataSate<T>{
    dataState?:DataStateEnum,
    data?:T,
    errorMessage?:string
}