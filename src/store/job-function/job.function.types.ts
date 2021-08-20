export interface IJobFunctionReducer {
    list: Array<IJobFunctionItem>;
    jobFunctionItem: {
        [key: string]: any
    };
}


export interface IJobFunctionItem {
    "id": number;
    "name": string;
    "description": string;
    "job_sub_functions": { [key: string]: any }[]
}
