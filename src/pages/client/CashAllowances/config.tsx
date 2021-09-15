import { Switch, TableColumnsType } from "antd";
import moment from "moment";
import { LoadingOutlined } from "@ant-design/icons";

import { ICashAllowance, ICountry } from "@types";

export const getColumns = ({
  removeCashAllowance,
  cashAllowance_id,
  isDeleting,
  editCashAllowance,
}: {
  isDeleting?: boolean;
  removeCashAllowance: (id: number) => Promise<void>;
  cashAllowance_id?: React.MutableRefObject<any>;
  editCashAllowance: (cashAllowance: ICashAllowance) => void;
}): TableColumnsType<any> => [
  {
    title: "country",
    dataIndex: "country",
    key: "country",
    width: 200,
    render: (country: ICountry) => <div>{country?.name}</div>,
  },
  {
    title: "city",
    dataIndex: "city",
    key: "city",
    width: 200,
  },
  {
    title: "grade",
    key: "grade",
    width: 150,
    render: (cashAllowance: ICashAllowance) =>
      cashAllowance?.is_all_grade ? "All" : cashAllowance?.grade,
  },
  {
    title: "amount/percentage",
    dataIndex: "is_percentage",
    key: "is_percentage",
    width: 250,
    render: (is_percentage: boolean) =>
      is_percentage ? "Percentage" : "Amount",
  },
  {
    title: "basic",
    dataIndex: "is_basic_pay",
    key: "is_basic_pay",
    width: 150,
    render: (basic: boolean) => (basic ? "Yes" : "No"),
  },
  {
    title: "value",
    key: "value",
    width: 150,
    render: (cashAllowance: ICashAllowance) =>
      `${cashAllowance?.value}${cashAllowance?.is_percentage ? "%" : ""}`,
  },
  {
    title: "Actions",
    key: "actions",
    width: 160,
    fixed: "right",
    render: (cashAllowance: ICashAllowance) => (
      <>
        <div
          onClick={() => editCashAllowance(cashAllowance)}
          className="table__action__btn table__action__btn--client"
        >
          Edit
        </div>
        <div
          onClick={() => removeCashAllowance(cashAllowance?.id!)}
          className="table__action__btn table__action__btn--delete"
        >
          {isDeleting && cashAllowance?.id === cashAllowance_id?.current ? (
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
