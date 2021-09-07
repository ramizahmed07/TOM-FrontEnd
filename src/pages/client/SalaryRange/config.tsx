import { TableColumnsType } from "antd";
import Checkbox from "antd/lib/checkbox/Checkbox";

export const columns: TableColumnsType<any> = [
  {
    title: "country",
    dataIndex: "country",
    key: "country",
    width: 200,
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
    dataIndex: "rangeType",
    key: "rangeType",
    width: 200,
  },
  {
    title: "grade",
    dataIndex: "grade",
    key: "grade",
    width: 200,
  },
  {
    title: "min",
    dataIndex: "min",
    key: "min",
    width: 200,
  },
  {
    title: "mid",
    dataIndex: "mid",
    key: "mid",
    width: 200,
  },
  {
    title: "max",
    dataIndex: "max",
    key: "max",
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
