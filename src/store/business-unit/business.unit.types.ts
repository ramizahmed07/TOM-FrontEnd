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
