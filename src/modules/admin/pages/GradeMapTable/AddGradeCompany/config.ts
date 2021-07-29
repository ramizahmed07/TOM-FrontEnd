import { TableColumnsType } from "antd";

export interface ICompany {
  id: string;
  value: string;
  title: string;
}

export const COMPANIES: ICompany[] = [
  {
    id: "1",
    value: "tcRank",
    title: "TC Rank",
  },
  {
    id: "2",
    value: "hrbs",
    title: "HRBS",
  },
  {
    id: "3",
    value: "mercerPc",
    title: "Mercer PC",
  },
  {
    id: "4",
    value: "mercerCl",
    title: "Mercer CL",
  },
  {
    id: "5",
    value: "twGrade",
    title: "TW Grade",
  },
];

export const columns = [
  {
    title: "tc rank",
    dataIndex: "tcRank",
    key: "tcRank",
    width: "13%",
  },
  {
    title: "hrbs",
    dataIndex: "hrbs",
    key: "hrbs",
    width: "13%",
  },
  {
    title: "mercer pc",
    dataIndex: "mercerPc",
    key: "mercerPc",
    width: "13%",
  },
  {
    title: "mercer cl",
    dataIndex: "mercerCl",
    key: "mercerCl",
    width: "13%",
  },
  {
    title: "tw grade",
    dataIndex: "twGrade",
    key: "twGrade",
    // width: ,
  },
];

// export type TableRow = {
//   id: string;
//   tcRank: string;
//   hrbs: string;
//   mercerPc: string;
//   mercerCl: string;
//   twGrade: string;
// };

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
  {
    id: "03",
    tcRank: "03",
    hrbs: "38",
    mercerPc: "27",
    mercerCl: "38",
    twGrade: "31",
  },
  {
    id: "04",
    tcRank: "04",
    hrbs: "40",
    mercerPc: "27",
    mercerCl: "12",
    twGrade: "35",
  },
  {
    id: "05",
    tcRank: "05",
    hrbs: "20",
    mercerPc: "37",
    mercerCl: "42",
    twGrade: "15",
  },
];
