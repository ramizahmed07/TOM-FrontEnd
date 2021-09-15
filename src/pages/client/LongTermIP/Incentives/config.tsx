import { LoadingOutlined } from "@ant-design/icons";
import { Switch, TableColumnsType } from "antd";
import moment from "moment";

import { ICountry, ILongTermIncentive, ILongTermPlan } from "@/types";

export const getColumns = ({
  removeLongTermIncentive,
  longTermIncentive_id,
  isDeleting,
  editLongTermIncentive,
}: {
  removeLongTermIncentive: (id: number) => Promise<void>;
  longTermIncentive_id: React.MutableRefObject<any>;
  isDeleting: boolean;
  editLongTermIncentive: (incentive: ILongTermIncentive) => void;
}): TableColumnsType<any> => [
  {
    title: "type",
    dataIndex: "plan",
    key: "type",
    width: 250,
    render: (plan: ILongTermPlan) => plan?.type?.name,
  },
  {
    title: "name",
    key: "name",
    dataIndex: "plan",
    width: 200,
    render: (plan: ILongTermPlan) => plan?.name,
  },
  {
    title: "country",
    key: "country",
    dataIndex: "country",
    width: 200,
    render: (country: ICountry | null) => country?.name || "-",
  },
  {
    title: "amount or units",
    dataIndex: "is_amount",
    key: "is_amount",
    width: 250,
    render: (is_amount: boolean) => (is_amount ? "Amount" : "Units"),
  },
  {
    title: "grade",
    dataIndex: "grade",
    key: "grade",
    width: 200,
    render: (grade: string | null) => grade || "-",
  },
  {
    title: "type",
    dataIndex: "range_type",
    key: "range_type",
    width: 250,
  },
  {
    title: "equity min",
    dataIndex: "equity_min",
    key: "equity_min",
    width: 250,
  },
  {
    title: "equity mid",
    dataIndex: "equity_mid",
    key: "equity_mid",
    width: 250,
  },
  {
    title: "equity max",
    dataIndex: "equity_max",
    key: "equity_max",
    width: 250,
  },
  {
    title: "Actions",
    key: "actions",
    width: 160,
    fixed: "right",
    render: (incentive: ILongTermIncentive) => (
      <>
        <div
          onClick={() => editLongTermIncentive(incentive)}
          className="table__action__btn table__action__btn--client"
        >
          Edit
        </div>
        <div
          onClick={() => removeLongTermIncentive(incentive?.id)}
          className="table__action__btn table__action__btn--delete"
        >
          {isDeleting && incentive?.id === longTermIncentive_id?.current ? (
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
