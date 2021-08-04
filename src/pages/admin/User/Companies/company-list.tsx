import React from "react";
import Layout from "@/components/Layout";
import {
  Col,
  Row,
  Table,
  Dropdown,
  Menu,
  TableColumnsType,
  Switch,
  Tag,
  Button,
  Input,
} from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";

import "./style.less";
import { ReactComponent as MenuIcon } from "@assets/images/vertical-dots.svg";
import { ReactComponent as FilterIcon } from "@assets/images/filter.svg";
import { data, TableRow } from "./dumpData";

const CompanyList = () => {
  const columns: TableColumnsType<TableRow> = [
    {
      title: "Company ID",
      dataIndex: "company_id",
      key: "company_id",
      width: 130,
    },
    {
      title: "Company Name",
      dataIndex: "company_name",
      key: "company_name",
      width: 130,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 180,
      align: "center",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 180,
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      width: 130,
      filters: [],
      filterIcon: <FilterIcon className="table__filter__icon" />,
    },
    {
      title: "status Company",
      dataIndex: "status_company",
      key: "status_company",
      width: 150,
      render: (value: string) => {
        const color: { [key: string]: string } = {
          Active: "green",
          "In Progress": "gold",
          Expired: "red",
        };
        return <Tag color={color[value]}>{value}</Tag>;
      },
    },
    {
      title: "status",
      width: 130,
      render: () => {
        return <Switch defaultChecked onChange={() => alert("Toggle")} />;
      },
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

  return (
    <>
      <Layout>
        <Row>
          <Col span={24}>
            <h1 className="page__heading">Companies list</h1>
            <div className="header__container">
              <Input
                className="form__input"
                type="email"
                placeholder="Search by name or ID..."
                prefix={<SearchOutlined style={{ color: "#435465" }} />}
              />
              <Button type="primary">
                <PlusOutlined /> Create new company
              </Button>
            </div>
            <Table
              scroll={{ x: 1300, y: "calc(100vh - 27.5em)" }}
              columns={columns}
              dataSource={data}
            />
          </Col>
        </Row>
      </Layout>
    </>
  );
};

export default CompanyList;
