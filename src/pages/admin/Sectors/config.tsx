import { Dropdown, Menu, TableColumnsType } from "antd";

import { IIndustry, ISector } from "@/types";
import { permissions } from "@router";
import { checkPermission } from "@utils";
import { ReactComponent as MenuIcon } from "@assets/images/vertical-dots.svg";

export const getColumns = ({
  handleActionDropdown,
}: {
  handleActionDropdown: ({
    item,
    key,
    domEvent,
  }: {
    key: string;
    domEvent:
      | React.MouseEvent<HTMLElement, MouseEvent>
      | React.KeyboardEvent<HTMLElement>;
    item: ISector;
  }) => void;
}) => {
  const columns: TableColumnsType<ISector> = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      width: 100,
    },
    {
      title: "Sector",
      dataIndex: "name",
      key: "sector",
      width: 200,
      render: (name: string) => <div className="text-wrap">{name}</div>,
    },
    {
      title: "Industry",
      dataIndex: "industries",
      key: "industry",
      width: `calc(100% - 460px)`,
      render: (industries: IIndustry[]) => {
        const names = industries?.map((industry: IIndustry) => industry.name);
        return <span className="text-wrap">{names.join(", ")}</span>;
      },
    },
    ...((!checkPermission([
      permissions.UPDATE_SECTOR,
      permissions.DELETE_SECTOR,
    ])
      ? []
      : [
          {
            title: <span className="align-center">Actions</span>,
            key: "action",
            fixed: "right",
            width: 160,
            render: (item: ISector) => {
              const menu = (
                <Menu
                  onClick={({ key, domEvent }) =>
                    handleActionDropdown({ item, key, domEvent })
                  }
                  tabIndex={1}
                >
                  {checkPermission(permissions.UPDATE_SECTOR) && (
                    <Menu.Item key="1">Edit</Menu.Item>
                  )}
                  {checkPermission(permissions.DELETE_SECTOR) && (
                    <Menu.Item key="2" danger>
                      Delete
                    </Menu.Item>
                  )}
                </Menu>
              );
              return (
                <div className="table__action__menu">
                  <Dropdown overlay={menu} trigger={["click"]}>
                    <MenuIcon
                      onClick={e => {
                        e.stopPropagation();
                      }}
                    />
                  </Dropdown>
                </div>
              );
            },
          },
        ]) as any),
  ];

  return columns;
};
