import React from "react";
import { Col, Row, Table, Dropdown, Menu, TableColumnsType } from "antd";

import { ReactComponent as MenuIcon } from "@assets/images/vertical-dots.svg";
import { ReactComponent as FilterIcon } from "@assets/images/filter.svg";

const columns: TableColumnsType<TableRow> = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
    width: 80,
  },
  {
    title: "Business Unit Name",
    dataIndex: "businessUnitName",
    key: "businessUnitName",
    width: 240,
  },
  {
    title: "Sector",
    dataIndex: "sector",
    key: "sector",
    width: 120,
  },
  {
    title: "Industry",
    dataIndex: "industry",
    key: "industry",
    width: 280,
    filters: [],
    filterIcon: <FilterIcon className="table__filter__icon" />,
  },
  {
    title: "Sub-Industry",
    dataIndex: "subIndustry",
    key: "subIndustry",
    width: 200,
    filters: [],
    filterIcon: <FilterIcon className="table__filter__icon" />,
  },
  {
    title: "Region",
    dataIndex: "region",
    key: "region",
    width: 100,
  },
  {
    title: "Action",
    key: "action",
    fixed: "right",
    width: 80,
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

const data: TableRow[] = [
  {
    id: "01",
    businessUnitName: "Financial Services",
    sector: "Energy",
    industry: "Energy Equipment & Services",
    subIndustry: "Oil & Gas Drilling",
    region: "3",
  },
  {
    id: "02",
    businessUnitName: "Insurances",
    sector: "Energy",
    industry: "Energy Equipment & Services",
    subIndustry: "Oil & Gas Drilling",
    region: "2",
  },
  {
    id: "03",
    businessUnitName: "Health Care",
    sector: "Energy",
    industry: "Energy Equipment & Services",
    subIndustry: "Oil & Gas Drilling",
    region: "3",
  },
];

const index = () => {
  return (
    <Row>
      <Col span={24}>
        <Table scroll={{ x: 1300 }} columns={columns} dataSource={data} />
      </Col>
    </Row>
  );
};

export default index;
