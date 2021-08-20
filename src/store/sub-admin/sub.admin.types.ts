export interface ISubAdminReducer {
    list: Array<ISubAdminItem>;
    subAdmin: { [key: string]: any; };
}


export interface ISubAdminItem {
    first_name: string;
    last_name: string;
    phone_number: string;
    phone_code: number;
    role: string;
    email: string;
    is_active: boolean;
}
