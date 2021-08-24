import { TableColumnsType } from "antd";
import { Link } from "react-router-dom";

import { ICountry } from "@store/countries";

export const columns: TableColumnsType<ICountry> = [
  {
    title: "id",
    dataIndex: "id",
    key: "id",
    width: 100,
  },
  {
    title: "country",
    key: "name",
    dataIndex: "name",
    width: `calc(100% - 300px)`,
  },

  {
    title: "Actions",
    key: "action",
    width: 200,
    align: "center",
    render: (item: any) => (
      <Link
        to={`${window.location.pathname}/${item?.id}`}
        className="table__action__btn"
      >
        View
      </Link>
    ),
  },
];
