export interface IJobFunctionReducer {
    list: Array<IJobFunctionItem>;
    permissions: string[];
    jobFunctionItem: {
        [key: string]: any
    };
}


export interface IJobFunctionItem {
    "id": number;
    "name": string;
    "description": string;
    "job_sub_functions": string[]
}