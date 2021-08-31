import { LoadingOutlined } from "@ant-design/icons";
import { TableColumnsType } from "antd";

import { permissions } from "@router";
import { IIndustry, ISubIndustry } from "@store/sectors";
import { checkPermission } from "@utils";

export const getColumns = ({
  isDeleting,
  industry_id,
  editIndustry,
  handleDeleteIndustry,
}: {
  isDeleting: boolean;
  industry_id: React.MutableRefObject<any>;
  editIndustry: (
    industry: IIndustry,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
  handleDeleteIndustry: (
    id: number,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => Promise<void>;
}) => {
  const columns: TableColumnsType<IIndustry> = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      width: 100,
    },

    {
      title: "Industry",
      dataIndex: "name",
      key: "industry",
      width: `calc(50% - 260px)`,
      render: (name: string) => <div className="text-wrap">{name}</div>,
    },
    {
      title: "Sub-Industry",
      dataIndex: "sub_industries",
      key: "subIndustry",
      width: `calc(50% - 260px)`,
      render: sub_industries => {
        const names = sub_industries?.map(
          (sub_industry: ISubIndustry) => sub_industry.name
        );
        return <span className="text-wrap">{names.join(", ")}</span>;
      },
    },
    ...((!checkPermission([
      permissions.UPDATE_INDUSTRY,
      permissions.DELETE_INDUSTRY,
    ])
      ? []
      : [
          {
            title: "Actions",
            key: "action",
            fixed: "right",
            width: 160,
            render: (industry: IIndustry) => {
              return (
                <>
                  {checkPermission(permissions.UPDATE_INDUSTRY) && (
                    <div
                      onClick={event => editIndustry(industry, event)}
                      className="table__action__btn"
                    >
                      Edit
                    </div>
                  )}

                  {checkPermission(permissions.DELETE_INDUSTRY) && (
                    <div
                      onClick={event =>
                        handleDeleteIndustry(industry?.id, event)
                      }
                      className="table__action__btn table__action__btn--delete"
                    >
                      {isDeleting && industry?.id === industry_id?.current ? (
                        <LoadingOutlined color="red" className="spinner" />
                      ) : (
                        "Delete"
                      )}
                    </div>
                  )}
                </>
              );
            },
          },
        ])! as any),
  ];
  return columns;
};
