export interface ISubJobFunctionReducer {
    list: Array<ISubJobFunctionItem>;
    jsf: { [key: string]: any; }
}


export interface ISubJobFunctionItem {
    "id": number;
    "name": string;
}