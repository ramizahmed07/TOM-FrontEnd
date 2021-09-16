import { TableColumnsType } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import { ILegalEntity } from "@types";

export interface IParams {
  region_id: string;
  country_id: string;
  business_unit_id: string;
  company_id: string;
}

export const getColumns = ({
  handleDelete,
  isDeleting,
  entity_id,
  handleUpdate,
}: {
  handleDelete: (id: number) => Promise<void>;
  isDeleting: boolean;
  entity_id: React.MutableRefObject<any>;
  handleUpdate: (legalEntity: ILegalEntity) => void;
}): TableColumnsType<ILegalEntity> => {
  const columns: TableColumnsType<ILegalEntity> = [
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
      render: (entity: ILegalEntity) => (
        <div className="text-wrap">
          <div
            onClick={() => handleUpdate(entity)}
            className="table__action__btn"
          >
            Edit
          </div>

          <div
            onClick={() => handleDelete(entity?.id)}
            className="table__action__btn table__action__btn--delete"
          >
            {isDeleting && entity?.id === entity_id?.current ? (
              <LoadingOutlined color="red" className="spinner" />
            ) : (
              "Delete"
            )}
          </div>
        </div>
      ),
    },
  ];

  return columns;
};
