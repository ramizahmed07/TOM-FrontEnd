export interface ISector {
  id: number;
  name: string;
  description: string;
  industries: any;
}

export interface ISectorsState {
  sectors: ISector[];
}
