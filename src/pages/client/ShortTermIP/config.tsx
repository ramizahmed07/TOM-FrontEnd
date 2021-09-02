import { TableColumnsType } from "antd";
import Checkbox from "antd/lib/checkbox/Checkbox";

export const columns: TableColumnsType<any> = [
  {
    title: "types of plans",
    dataIndex: "type",
    key: "type",
    width: 200,
  },
  {
    title: "plan name",
    dataIndex: "name",
    key: "name",
    width: 200,
  },
  {
    title: "grade eligibility",
    dataIndex: "gradeEligibility",
    key: "tigradeEligibilityer",
    width: 200,
  },
  {
    title: "coverage",
    dataIndex: "coverage",
    key: "coverage",
    width: 200,
  },
  {
    title: "Actions",
    key: "actions",
    width: 160,
    fixed: "right",
    render: () => (
      <>
        <div className="table__action__btn table__action__btn--client">
          Edit
        </div>
        <div className="table__action__btn table__action__btn--delete">
          Delete
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
