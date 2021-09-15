import { LoadingOutlined } from "@ant-design/icons";
import moment from "moment";
import { Switch, TableColumnsType } from "antd";

import { ISalaryRange, ICountry } from "@types";

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

export const getVersionsColumns = ({
  handleActive,
  active,
}: {
  handleActive: (id: number) => Promise<void>;
  active: boolean;
}): TableColumnsType<any> => [
  {
    title: "id",
    dataIndex: "id",
    key: "id",
    width: "15%",
  },
  {
    title: "created at",
    dataIndex: "created_at",
    key: "created_at",
    width: "35%",
    render: (date: string) => <div>{moment(date).format("do-MM-YYYY")}</div>,
  },
  {
    title: "Active",
    key: "active",
    width: "15%",
    align: "center",
    render: (version: any) => (
      <Switch
        onChange={checked => {
          if (!checked) return;
          handleActive(version?.id);
        }}
        checked={active || version?.is_active === "TRUE"}
        defaultChecked={version?.is_active === "TRUE"}
      />
    ),
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
