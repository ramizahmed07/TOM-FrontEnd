export interface ISector {
  id: number;
  name: string;
  description: string;
  industries: IIndustry[];
}

export interface ISectorsState {
  sectors: ISector[];
}

export interface IIndustry {
  id: number;
  name: number;
  description: null | string;
}
