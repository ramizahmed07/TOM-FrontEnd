import { ICountry } from "@/store/countries";

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
