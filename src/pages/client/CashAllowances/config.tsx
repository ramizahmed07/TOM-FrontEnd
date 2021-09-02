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
    title: "grade",
    dataIndex: "grade",
    key: "grade",
    width: 150,
  },
  {
    title: "allowance name",
    dataIndex: "name",
    key: "name",
    width: 250,
  },
  {
    title: "amount/percentage",
    dataIndex: "amount_percentage",
    key: "amount_percentage",
    width: 250,
  },
  {
    title: "basic",
    dataIndex: "basic",
    key: "basic",
    width: 150,
  },
  {
    title: "value",
    dataIndex: "value",
    key: "value",
    width: 150,
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
