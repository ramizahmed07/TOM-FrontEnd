export interface ISector {
  id: number;
  name: string;
  description: string | null;
  industries: IIndustry[];
}

export interface ISectorsState {
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
