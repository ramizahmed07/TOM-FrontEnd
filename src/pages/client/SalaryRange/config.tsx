import { ICountry } from "@/types";
import { LoadingOutlined } from "@ant-design/icons";
import { TableColumnsType } from "antd";
import Checkbox from "antd/lib/checkbox/Checkbox";

import { ISalaryRange } from "@/types";

export const getColumns = ({
  editSalaryRange,
  isDeleting,
  salary_range_id,
  removeSalaryRange,
}: {
  editSalaryRange: (salaryRange: ISalaryRange) => void;
  isDeleting: boolean;
  salary_range_id: React.MutableRefObject<any>;
  removeSalaryRange: (id: number) => Promise<void>;
}): TableColumnsType<any> => [
  {
    title: "country",
    dataIndex: "country",
    key: "country",
    width: 200,
    render: (country: ICountry) => country.name,
  },
  {
    title: "city",
    dataIndex: "city",
    key: "city",
    width: 200,
  },
  {
    title: "tier",
    dataIndex: "tier",
    key: "tier",
    width: 200,
  },
  {
    title: "range type",
    dataIndex: "range_type",
    key: "range_type",
    width: 200,
  },
  {
    title: "grade",
    dataIndex: "grade",
    key: "grade",
    width: 200,
  },
  {
    title: "year",
    dataIndex: "year",
    key: "year",
    width: 200,
  },
  {
    title: "min",
    dataIndex: "salary_min",
    key: "salary_min",
    width: 200,
  },
  {
    title: "mid",
    dataIndex: "salary_mid",
    key: "salary_mid",
    width: 200,
  },
  {
    title: "max",
    dataIndex: "salary_max",
    key: "salary_max",
    width: 200,
  },
  {
    title: "Actions",
    key: "actions",
    width: 160,
    fixed: "right",
    render: (salaryRange: ISalaryRange) => (
      <>
        <div
          onClick={() => editSalaryRange(salaryRange)}
          className="table__action__btn table__action__btn--client"
        >
          Edit
        </div>
        <div
          onClick={() => removeSalaryRange(salaryRange?.id!)}
          className="table__action__btn table__action__btn--delete"
        >
          {isDeleting && salaryRange?.id === salary_range_id?.current ? (
            <LoadingOutlined color="red" className="spinner" />
          ) : (
            "Delete"
          )}
        </div>
      </>
    ),
  },
];

export const versionsColumns: TableColumnsType<any> = [
  {
    title: "file name",
    dataIndex: "name",
    key: "name",
    width: "30%",
  },
  {
    title: "duration",
    dataIndex: "duration",
    key: "duration",
    width: "25%",
  },
  {
    title: "upload date",
    dataIndex: "date",
    key: "date",
    width: "30%",
  },
  {
    title: "Active",
    key: "active",
    width: "15%",
    align: "center",
    render: () => <Checkbox />,
  },
  {
    title: "action",
    key: "action",
    width: "15%",
    render: () => (
      <div className="table__action__btn table__action__btn--client">
        Download
      </div>
    ),
  },
];
