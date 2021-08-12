import React from "react";
import { Dropdown, Menu, TableColumnsType } from "antd";

import { ReactComponent as MenuIcon } from "@assets/images/vertical-dots.svg";
import { ReactComponent as FilterIcon } from "@assets/images/filter.svg";
import BuildingImg from "@assets/images/building.png";
import Table from "@components/Table";
import Button from "@components/Button";
import EmptyMessage from "@pages/admin/Companies/CompanyProfile/EmptyMessage";
import AddBusinessUnit from "./AddBusinessUnit";

const columns: TableColumnsType<TableRow> = [
  {
    title: "id",
    dataIndex: "id",
    key: "id",
    width: "5%",
  },
  {
    title: "business unit name",
    dataIndex: "businessUnitName",
    key: "businessUnitName",
    width: "18%",
  },
  {
    title: "sector",
    dataIndex: "sector",
    key: "sector",
    width: "15%",
  },
  {
    title: "industy",
    dataIndex: "industry",
    key: "industry",
    width: "22%",
    filters: [],
    filterIcon: <FilterIcon className="table__filter__icon" />,
  },
  {
    title: "sub-industry",
    dataIndex: "subIndustry",
    key: "subIndustry",
    width: "20%",
    filters: [],
    filterIcon: <FilterIcon className="table__filter__icon" />,
  },
  {
    title: "region",
    dataIndex: "region",
    key: "region",
    width: "10%",
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

type TableRow = {
  id: string;
  businessUnitName: string;
  sector: string;
  industry: string;
  subIndustry: string;
  region: string;
};

const data: TableRow[] = [];

const BusinessUnits = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  return (
    <div>
      <AddBusinessUnit isVisible={isVisible} setIsVisible={setIsVisible} />
      <Table
        data={data}
        columns={columns}
        pagination={false}
        locale={{
          emptyText: (
            <EmptyMessage
              img={BuildingImg}
              title="No business unit found"
              message="You didn’t added any business unit for this
            company yet!"
            >
              <Button variant="add" onClick={() => setIsVisible(true)}>
                Create business unit
              </Button>
            </EmptyMessage>
          ),
        }}
      />
    </div>
  );
};
export default BusinessUnits;
