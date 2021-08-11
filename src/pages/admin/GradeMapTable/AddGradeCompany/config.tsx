import { Input } from "antd";

export type CompanyName = keyof IData;
export interface ICompany {
  id: number;
  name: string;
  value?: string;
  title?: string;
}

export interface IData {
  id: string;
  tcRank: string;
  hrbs: string;
  mercerPc: string;
  mercerCl: string;
  twGrade: string;
}

export interface IColumn {
  title: string;
  dataIndex: CompanyName | "name";
  key: CompanyName | "name";
  width: string | number;
  render?: (index: any, record: any) => React.ReactElement;
}

export const COMPANIES: ICompany[] = [
  {
    id: 1,
    name: "tcRank",
    title: "TC Rank",
  },
  {
    id: 2,
    name: "hrbs",
    title: "HRBS",
  },
  {
    id: 3,
    name: "mercerPc",
    title: "Mercer PC",
  },
  {
    id: 4,
    name: "mercerCl",
    title: "Mercer CL",
  },
  {
    id: 5,
    name: "twGrade",
    title: "TW Grade",
  },
];

export const columns: IColumn[] = [
  {
    title: "tc rank",
    dataIndex: "tcRank",
    key: "tcRank",
    width: "10%",
  },
  {
    title: "hrbs",
    dataIndex: "hrbs",
    key: "hrbs",
    width: "10%",
  },
  {
    title: "mercer pc",
    dataIndex: "mercerPc",
    key: "mercerPc",
    width: "10%",
  },
  {
    title: "mercer cl",
    dataIndex: "mercerCl",
    key: "mercerCl",
    width: "10%",
  },
  {
    title: "tw grade",
    dataIndex: "twGrade",
    key: "twGrade",
    width: "10%",
  },
  {
    title: "Name here...",
    dataIndex: "name",
    key: "name",
    width: 50,

    render: () => {
      return (
        <Input
          className="table__input"
          size="middle"
          placeholder="Enter grade here..."
        />
      );
    },
  },
];

export const data = [
  {
    id: "01",
    tcRank: "01",
    hrbs: "12",
    mercerPc: "-",
    mercerCl: "14",
    twGrade: "11",
  },
  {
    id: "02",
    tcRank: "02",
    hrbs: "27",
    mercerPc: "-",
    mercerCl: "27",
    twGrade: "17",
  },
];
