import { permissions } from "@/router";
import { ISubIndustry } from "@/store/sectors";
import { checkPermission } from "@/utils";
import { LoadingOutlined } from "@ant-design/icons";
import { TableColumnsType } from "antd";

export const getColumns = ({
  isDeleting,
  editSubIndustry,
  sub_industry_id,
  handleDelete,
}: {
  isDeleting: boolean;
  editSubIndustry: (
    sub_industry: ISubIndustry,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
  sub_industry_id: any;
  handleDelete: (
    id: number,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => Promise<void>;
}) => {
  const columns: TableColumnsType<ISubIndustry> = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      width: 100,
    },

    {
      title: "Sub-Industry",
      dataIndex: "name",
      key: "subIndustry",
      width: `calc(100% - 260px)`,
      render: (name: string) => <div className="text-wrap">{name}</div>,
    },
    ...((!checkPermission([
      permissions.UPDATE_SUB_INDUSTRY,
      permissions.DELETE_SUB_INDUSTRY,
    ])
      ? []
      : [
          {
            title: "Actions",
            key: "action",
            fixed: "right",
            width: 160,
            render: (item: ISubIndustry) => {
              return (
                <div>
                  {checkPermission(permissions.UPDATE_SUB_INDUSTRY) && (
                    <div
                      onClick={event => editSubIndustry(item, event)}
                      className="table__action__btn"
                    >
                      Edit
                    </div>
                  )}
                  {checkPermission(permissions.DELETE_SUB_INDUSTRY) && (
                    <div
                      onClick={event => handleDelete(item?.id, event)}
                      className="table__action__btn table__action__btn--delete"
                    >
                      {isDeleting && item?.id === sub_industry_id?.current ? (
                        <LoadingOutlined color="red" className="spinner" />
                      ) : (
                        "Delete"
                      )}
                    </div>
                  )}
                </div>
              );
            },
          },
        ]) as any),
  ];
  return columns;
};
