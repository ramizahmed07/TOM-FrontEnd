import { LoadingOutlined } from "@ant-design/icons";
import { Switch, TableColumnsType } from "antd";
import moment from "moment";

import { IShortTermIncentive } from "@types";

export const getColumns = ({
  removeShortTermIncentive,
  shortTermIncentive_id,
  isDeleting,
  editShortTermIncentive,
}: {
  removeShortTermIncentive: (id: number) => Promise<void>;
  shortTermIncentive_id: React.MutableRefObject<any>;
  isDeleting: boolean;
  editShortTermIncentive: (incentive: IShortTermIncentive) => void;
}): TableColumnsType<any> => [
  {
    title: "plan name",
    key: "name",
    width: 200,
    render: (incentive: IShortTermIncentive) => incentive?.plan?.name,
  },
  {
    title: "country",
    key: "country",
    width: 200,
    render: (incentive: IShortTermIncentive) => (
      <div className="text-wrap">
        {incentive?.is_global ? "Global" : incentive?.country?.name}
      </div>
    ),
  },
  {
    title: "grade",
    key: "grade",
    width: 200,
    render: (incentive: IShortTermIncentive) =>
      incentive?.is_all_grade ? "All" : incentive?.grade,
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
    title: "target bonus",
    key: "value",
    width: 200,
    render: (shortTermIncentive: IShortTermIncentive) =>
      shortTermIncentive?.is_percentage
        ? `${shortTermIncentive?.value}%`
        : shortTermIncentive?.value,
  },
  {
    title: "basic pay or fixed",
    dataIndex: "is_basic_pay",
    key: "is_basic_pay",
    width: 250,
    render: (is_basic_pay: boolean) => (is_basic_pay ? "Basic" : "Fixed"),
  },

  {
    title: "Actions",
    key: "actions",
    width: 160,
    fixed: "right",
    render: (incentive: IShortTermIncentive) => (
      <>
        <div
          onClick={() => editShortTermIncentive(incentive)}
          className="table__action__btn table__action__btn--client"
        >
          Edit
        </div>
        <div
          onClick={() => removeShortTermIncentive(incentive?.id)}
          className="table__action__btn table__action__btn--delete"
        >
          {isDeleting && incentive?.id === shortTermIncentive_id?.current ? (
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
