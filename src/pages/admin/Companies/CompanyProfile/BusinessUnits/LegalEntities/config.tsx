import { TableColumnsType } from "antd";
import { Link } from "react-router-dom";

import { ILegalEntity } from "@store/companies";

export const columns: TableColumnsType<ILegalEntity> = [
  {
    title: "id",
    dataIndex: "id",
    key: "id",
    width: 100,
  },
  {
    title: "legal entity",
    key: "name",
    dataIndex: "name",
    width: `calc(100% - 300px)`,
    render: (name: string) => <div className="text-wrap">{name}</div>,
  },

  {
    title: "Actions",
    key: "action",
    width: 200,
    render: (entity: any) => (
      <div className="text-wrap">
        <div
          onClick={event => console.log(entity, event)}
          className="table__action__btn"
        >
          Edit
        </div>

        <div
          // onClick={event => handleDeleteIndustry(industry?.id, event)}
          className="table__action__btn table__action__btn--delete"
        >
          {/* {isDeleting && industry?.id === industry_id?.current ? (
            <LoadingOutlined color="red" className="spinner" />
          ) : ( */}
          Delete
          {/* )} */}
        </div>
      </div>
    ),
  },
];
