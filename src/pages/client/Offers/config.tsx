import { TableColumnsType } from "antd";

export const columns: TableColumnsType<any> = [
  {
    title: "candidate name",
    dataIndex: "candidate_name",
    key: "id",
    width: 200,
  },
  {
    title: "business title",
    dataIndex: "business_title",
    key: "id",
    width: 200,
  },
  {
    title: "business unit",
    dataIndex: "business_unit",
    key: "id",
    width: 250,
  },
  {
    title: "region",
    dataIndex: "region",
    key: "id",
    width: 200,
  },
  {
    title: "country",
    dataIndex: "country",
    key: "id",
    width: 200,
  },
  {
    title: "status",
    dataIndex: "status",
    key: "id",
    width: 200,
  },

  {
    title: "Action",
    key: "id",
    width: 160,
    fixed: "right",
    render: (offer: any) => (
      <>
        <div className="table__action__btn table__action__btn--client">
          {offer?.status === "In-Progress" ? "View" : "Continue"}
        </div>
      </>
    ),
  },
];

export const data = [
  {
    id: 1,
    candidate_name: "Ramiz Ahmed",
    business_title: "Developer",
    business_unit: "Computer Engineering",
    region: "Asia",
    country: "Pakistan",
    status: "Open",
  },
  {
    id: 2,
    candidate_name: "Ahmed",
    business_title: "Biologist",
    business_unit: "Human Sciences",
    region: "Asia",
    country: "Pakistan",
    status: "In-Progress",
  },
];
