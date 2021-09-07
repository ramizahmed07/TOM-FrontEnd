import { Dispatch, SetStateAction } from "react";

/**
 * @Modal_Types
 */

export interface IModal {
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
}

/**
 * @Auth_Types
 */

export interface IUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  phone_code: number;
  role: string;
  is_active: boolean;
}

export type User = IUser | null;

export interface IAuthState {
  user: User;
  token: {
    access: null | string;
    refresh: null | string;
  };
  permissions: string[];
  is_one_time_password: boolean;
}

/**
 * @Business_Unit_Types
 */

export interface IBusinessUnitState {
  list: Array<IBusinessUnitItem>;
}

export interface IBusinessUnitItem {
  id: number;
  name: string;
  sector: {
    id: number;
    name: string;
  };
  industry: {
    id: number;
    name: string;
  };
  sub_industry: {
    id: number;
    name: string;
  };
  region_count: number;
}

/**
 * @Company_Types
 */

export interface ICompany {
  id?: number;
  name?: string;
  address?: string;
  postal_code?: string;
  country_headquarter?: string;
  financial_year?: number;
  contract_start_date?: string;
  contract_end_date?: string;
  large_logo_url?: string;
  small_logo_url?: string;
  status?: string;
  is_active?: boolean;
  user?: User;
}

export interface ICompaniesState {
  companies: ICompany[];
}

export interface IRegion {
  id?: number;
  name: string;
  countries: ICountry[] | number[];
  business_units: any;
}

export interface ILegalEntity {
  id: number;
  name: string;
}

/**
 * @Country_Types
 */

export interface ICountry {
  id: number;
  name: string;
}

/**
 * @Grade_Types
 */

export interface IGradeCompanyRank {
  rank: string | null;
  ta_rank_id: number;
  ta_rank: string;
}

export interface IGradeCompany {
  company: null | string;
  id: number;
  name: string;
  grade_company_ranks: IGradeCompanyRank[];
}

export interface ITARank {
  id: number;
  rank: string | null;
}

export interface IGradeState {
  taRanks: ITARank[];
  allGradeCompanies: IGradeCompany[];
}

/**
 * @Job_Function_Types
 */

export interface IJobFunctionReducer {
  list: Array<IJobFunctionItem>;
  jobFunctionItem: {
    [key: string]: any;
  };
}

export interface IJobFunctionItem {
  id: number;
  name: string;
  description: string;
  job_sub_functions: { [key: string]: any }[];
}

/**
 * @Sectors_Types
 */

export interface ISector {
  id: number;
  name: string;
  description: string | null;
  industries: IIndustry[];
}

export interface ISectorsState {
  allSectors: [];
  sectors: ISector[];
}

export interface IIndustry {
  id: number;
  name: string;
  description: null | string;
  sub_industries?: ISubIndustry[];
}

export interface ISubIndustry {
  id: number;
  description: null | string;
  name: string;
}

/**
 * @SubAdmin_Types
 */

export interface ISubAdminReducer {
  list: Array<ISubAdminItem>;
  pagination: any;
  subAdmin: { [key: string]: any };
}

export interface ISubAdminItem {
  id: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  phone_code: number;
  role: string;
  email: string;
  is_active: boolean;
}

/**
 * @Sub_Job_Function_Types
 */

export interface ISubJobFunctionReducer {
  list: Array<ISubJobFunctionItem>;
  jsf: { [key: string]: any };
}

export interface ISubJobFunctionItem {
  id: number;
  name: string;
}

/**
 * @Company_Job_Grades_Types
 */

export interface IJobGrade {
  grade: string;
  type: null | string;
  country_ids?: number[];
  countries?: ICountry[];
  id?: number;
}

/**
 * @Company_Salary_Range_Types
 */
export interface ISalaryRange {
  id?: number;
  grade: string;
  tier: number | null;
  year: number | null;
  country_id?: number | null;
  country?: ICountry | undefined;
  city: string;
  range_type: string;
  salary_min: number | null;
  salary_mid: number | null;
  salary_max: number | null;
}
