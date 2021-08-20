import { Dropdown, Menu, TableColumnsType } from "antd";

import { ICountry } from "@store/countries";
import { ReactComponent as MenuIcon } from "@assets/images/vertical-dots.svg";
import { ReactComponent as FilterIcon } from "@assets/images/filter.svg";

export type TableRow = {
  id: number;
  name: string;
  countries: ICountry[];
  business_units: any;
};

export const columns: TableColumnsType<TableRow> = [
  {
    title: "id",
    dataIndex: "id",
    key: "id",
    width: "5%",
  },
  {
    title: "region name",
    dataIndex: "name",
    key: "name",
    width: "15%",
  },

  {
    title: "Countries",
    dataIndex: "countries",
    key: "countries",
    width: "35%",
    filters: [],
    filterIcon: <FilterIcon className="table__filter__icon" />,
    render: (countries: ICountry[]) => (
      <div className="regions__table__countries">
        {countries?.map(({ name }) => name).join(", ")}
      </div>
    ),
  },
  {
    title: "business unit",
    dataIndex: "businessUnit",
    key: "businessUnit",
    width: "35%",
    filters: [],
    filterIcon: <FilterIcon className="table__filter__icon" />,
  },

  {
    title: <span className="align-center">action</span>,
    key: "action",
    fixed: "right",
    width: "10%",
    render: () => {
      const menu = (
        <Menu>
          <Menu.Item className="table__action__item">Edit</Menu.Item>
          <Menu.Item danger className="table__action__item">
            Delete
          </Menu.Item>
        </Menu>
      );
      return (
        <div className="table__action__menu">
          <Dropdown
            overlay={menu}
            trigger={["click"]}
            className="table__action__dropdown"
          >
            <MenuIcon />
          </Dropdown>
        </div>
      );
    },
  },
];
