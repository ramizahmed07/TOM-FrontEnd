import { TableColumnsType } from "antd";

export const columns: TableColumnsType<any> = [
  {
    title: "job grade",
    dataIndex: "jobGrade",
    key: "jobGrade",
    width: `calc(100% - 660px)`,
  },
  {
    title: "country",
    dataIndex: "country",
    key: "country",
    width: 250,
  },
  {
    title: "type",
    dataIndex: "type",
    key: "type",
    width: 250,
  },
  {
    title: "action",
    key: "type",
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
