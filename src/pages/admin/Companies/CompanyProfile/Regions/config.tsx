import { Dropdown, Menu, TableColumnsType } from "antd";

import { ICountry, IRegion } from "@types";
import { ReactComponent as MenuIcon } from "@assets/images/vertical-dots.svg";
import { ReactComponent as FilterIcon } from "@assets/images/filter.svg";

export type TableRow = {
  id: number;
  name: string;
  countries: ICountry[];
  business_units: any;
};

export const getColumns = (
  handleActionDropdown: ({
    item,
    key,
    domEvent,
  }: {
    key: string;
    domEvent:
      | React.MouseEvent<HTMLElement, MouseEvent>
      | React.KeyboardEvent<HTMLElement>;
    item: IRegion;
  }) => void
): TableColumnsType<TableRow> => {
  const columns: TableColumnsType<TableRow> = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
      width: 100,
    },
    {
      title: "region name",
      dataIndex: "name",
      key: "name",
      width: 300,
      render: (name: string) => <div className="text-wrap">{name}</div>,
    },

    {
      title: "Countries",
      dataIndex: "countries",
      key: "countries",
      width: 300,
      filters: [],
      filterIcon: <FilterIcon className="table__filter__icon" />,
      render: (countries: ICountry[]) => (
        <div className="text-wrap">
          {countries?.map(({ name }) => name).join(", ")}
        </div>
      ),
    },
    {
      title: "business unit",
      dataIndex: "business_units",
      key: "businessUnit",
      width: `calc(100% - 860px)`,
      filters: [],
      filterIcon: <FilterIcon className="table__filter__icon" />,
      render: (units: { name: string; id: number }[]) => (
        <div className="text-wrap">
          {units?.map(({ name }) => name).join(", ")}
        </div>
      ),
    },

    {
      title: <span className="align-center">action</span>,
      key: "action",
      fixed: "right",
      width: 160,

      render: (item: IRegion) => {
        const menu = (
          <Menu
            onClick={({ key, domEvent }) => {
              handleActionDropdown({ item, key, domEvent });
            }}
            tabIndex={1}
          >
            <Menu.Item key="1">Edit</Menu.Item>
            <Menu.Item key="2" danger>
              Delete
            </Menu.Item>
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
  ];
  return columns;
};
