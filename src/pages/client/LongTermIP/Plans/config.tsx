import { ILongTermPlan } from "@/types";
import { LoadingOutlined } from "@ant-design/icons";
import { TableColumnsType } from "antd";
import Checkbox from "antd/lib/checkbox/Checkbox";
import _ from "lodash";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const installment_types = [
  {
    value: "MONTHLY",
    label: "Monthly",
  },
  {
    value: "QUARTERLY",
    label: "Quarterly",
  },
  { value: "SEMI_ANNUALLY", label: "Semi Annually" },
  {
    value: "ANNUALLY",
    label: "Annually",
  },
];

export const getColumns = ({
  removeLongTermPlan,
  longTermPlan_id,
  isDeleting,
  editLongTermPlan,
}: {
  removeLongTermPlan: (id: number) => Promise<void>;
  longTermPlan_id: React.MutableRefObject<any>;
  isDeleting: boolean;
  editLongTermPlan: (longTermPlan: ILongTermPlan) => void;
}): TableColumnsType<any> => [
  {
    title: "type of stock",
    dataIndex: "type",
    key: "type",
    width: 300,
    render: (type: { id: number; name: string }) => (
      <div className="text-wrap">{type?.name}</div>
    ),
  },
  {
    title: "name",
    dataIndex: "name",
    key: "name",
    width: 200,
  },
  {
    title: "grades",
    key: "grades",
    width: 250,
    render: (plan: ILongTermPlan) => (
      <div className="text-wrap">
        {plan?.is_all_grade ? "All" : plan?.grades.join(", ")}
      </div>
    ),
  },
  {
    title: "holding period",
    dataIndex: "holding_period",
    key: "holding_period",
    width: 200,
  },
  {
    title: "vesting type",
    dataIndex: "is_installment",
    key: "is_installment",
    width: 200,
    render: (is_installment: boolean) =>
      is_installment ? "Installment" : "Cliff",
  },
  {
    title: "installment type",
    dataIndex: "installment_type",
    key: "installment_type",
    width: 200,
    render: (type: string) => _.replace(_.startCase(_.toLower(type)), "_", " "),
  },
  {
    title: "date of grant",
    key: "date",
    width: 200,
    render: (plan: ILongTermPlan) =>
      `${plan?.date_of_grant} ${months[plan?.month_of_grant - 1]}`,
  },
  {
    title: "equity type",
    dataIndex: "is_amount",
    key: "is_amount",
    width: 200,
    render: (is_amount: boolean) => (is_amount ? "Amount" : "Unit"),
  },
  {
    title: "Actions",
    key: "actions",
    width: 160,
    fixed: "right",
    render: (longTermPlan: ILongTermPlan) => (
      <>
        <div
          onClick={() => editLongTermPlan(longTermPlan)}
          className="table__action__btn table__action__btn--client"
        >
          Edit
        </div>
        <div
          onClick={() => removeLongTermPlan(longTermPlan?.id)}
          className="table__action__btn table__action__btn--delete"
        >
          {isDeleting && longTermPlan?.id === longTermPlan_id?.current ? (
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
