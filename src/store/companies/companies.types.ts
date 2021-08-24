import { User } from "../auth/auth.types";
import { ICountry } from "../countries";

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
