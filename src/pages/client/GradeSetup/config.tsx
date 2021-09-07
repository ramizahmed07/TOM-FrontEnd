import { TableColumnsType } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import { ICountry } from "@store/countries";

export interface IJobGrade {
  grade: string;
  type: null | string;
  country_ids?: number[];
  countries?: ICountry[];
  id?: number;
}

export const getColumns = ({
  deleteJobGrade,
  jobGrade_id,
  isDeleting,
  editJobGrade,
}: {
  isDeleting: boolean;
  deleteJobGrade: (id: number) => Promise<void>;
  jobGrade_id: React.MutableRefObject<any>;
  editJobGrade: (jobGrade: IJobGrade) => void;
}): TableColumnsType<any> => [
  {
    title: "job grade",
    dataIndex: "grade",
    key: "grade",
    width: 300,
  },
  {
    title: "countries",
    dataIndex: "countries",
    key: "countries",
    width: 250,
    render: (countries: ICountry[]) => (
      <div>{countries.map(({ name }) => name).join(", ")}</div>
    ),
  },
  {
    title: "type",
    dataIndex: "type",
    key: "type",
    width: 250,
  },
  {
    title: "action",
    key: "type",
    width: 160,
    fixed: "right",
    render: (jobGrade: IJobGrade) => (
      <>
        <div
          onClick={() => editJobGrade(jobGrade)}
          className="table__action__btn table__action__btn--client"
        >
          Edit
        </div>
        <div
          onClick={() => deleteJobGrade(jobGrade?.id!)}
          className="table__action__btn table__action__btn--delete"
        >
          {isDeleting && jobGrade?.id === jobGrade_id?.current ? (
            <LoadingOutlined color="red" className="spinner" />
          ) : (
            "Delete"
          )}
        </div>
      </>
    ),
  },
];
