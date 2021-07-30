import { Input, TableColumnsType } from "antd";

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

    render: (index: any, record: any) => {
      console.log({ index, record });
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
];
