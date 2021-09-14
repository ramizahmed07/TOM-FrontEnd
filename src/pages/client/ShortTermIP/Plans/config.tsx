import { LoadingOutlined } from "@ant-design/icons";
import Checkbox from "antd/lib/checkbox/Checkbox";
import { TableColumnsType } from "antd";

import { IShortTermPlan } from "@/types";

export const getColumns = ({
  removeShortTermPlan,
  shortTermPlan_id,
  isDeleting,
  editShortTermPlan,
}: {
  removeShortTermPlan: (id: number) => Promise<void>;
  shortTermPlan_id: React.MutableRefObject<any>;
  isDeleting: boolean;
  editShortTermPlan: (selectedShortTermPlan: IShortTermPlan) => void;
}): TableColumnsType<any> => [
  {
    title: "type of plan",
    dataIndex: "type",
    key: "type",
    width: 250,
    render: (type: { id: number; name: string }) => type.name,
  },
  {
    title: "name",
    dataIndex: "name",
    key: "name",
    width: 250,
  },
  {
    title: "grades",
    key: "grades",
    width: 400,
    render: (plan: IShortTermPlan) => (
      <div className="text-wrap">
        {plan?.is_all_grade ? "All" : plan?.grades.join(", ")}
      </div>
    ),
  },
  {
    title: "coverage",
    key: "coverage",
    width: 400,
    render: (plan: IShortTermPlan) => (
      <div className="text-wrap">
        {plan?.is_global
          ? "Global"
          : plan?.countries?.map(country => country?.name).join(", ")}
      </div>
    ),
  },
  {
    title: "Actions",
    key: "actions",
    width: 160,
    fixed: "right",
    render: (shortTermPlan: IShortTermPlan) => (
      <>
        <div
          onClick={() => editShortTermPlan(shortTermPlan)}
          className="table__action__btn table__action__btn--client"
        >
          Edit
        </div>
        <div
          onClick={() => removeShortTermPlan(shortTermPlan?.id)}
          className="table__action__btn table__action__btn--delete"
        >
          {isDeleting && shortTermPlan?.id === shortTermPlan_id?.current ? (
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
