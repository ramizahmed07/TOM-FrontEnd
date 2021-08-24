import React from "react";
import {
  Col,
  Row,
  Dropdown,
  Menu,
  TableColumnsType,
  Switch,
  Tag,
  Button,
  Input,
} from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";

import "./style.less";
import { ReactComponent as MenuIcon } from "@assets/images/vertical-dots.svg";
import { ReactComponent as FilterIcon } from "@assets/images/filter.svg";
import { Paths } from "@router";
import { useFetchCompaniesQuery } from "@services";
import { ICompany } from "@/store/companies";
import Table from "@/components/Table";

const CompanyList = () => {
  const history = useHistory();
  const { data: companiesData, isLoading: isFetching } =
    useFetchCompaniesQuery(null);
  const { data, pagination } = companiesData || {};
  const createNewCompany = () => history.push(Paths.Users.companies.create);

  const columns: TableColumnsType<ICompany> = [
    {
      title: <div className="text-wrap">Company ID</div>,
      dataIndex: "id",
      key: "id",
      width: 110,
    },
    {
      title: <div className="text-wrap">Company Name</div>,
      dataIndex: "name",
      key: "name",
      width: 130,
    },
    {
      title: <div className="text-wrap">Name</div>,
      key: "name",
      width: 120,
      render: (record: ICompany) =>
        `${record.user?.first_name} ${record.user?.last_name}`,
    },
    {
      title: <div className="text-wrap">Email</div>,
      key: "email",
      width: 200,
      render: (record: ICompany) => record.user?.email,
    },
    {
      title: <div className="text-wrap">Location</div>,
      dataIndex: "country_headquarter",
      key: "country_headquarter",
      width: 120,
      filters: [],
      filterIcon: <FilterIcon className="table__filter__icon" />,
    },
    {
      title: <div className="text-wrap">Status Company</div>,
      dataIndex: "status",
      key: "status",
      width: 130,
      render: (status: string) => {
        const color: { [key: string]: string } = {
          active: "green",
          "in progress": "gold",
          expired: "red",
        };
        return <Tag color={color[status?.toLowerCase()]}>{status}</Tag>;
      },
    },
    {
      title: <div className="text-wrap">Status</div>,
      width: 90,
      align: "center",
      render: (record: ICompany) => {
        return (
          <Switch
            defaultChecked={record.is_active}
            onChange={() => alert("Toggle")}
          />
        );
      },
    },
    {
      title: <div className="text-wrap">Action</div>,
      key: "action",
      fixed: "right",
      width: 80,
      align: "center",
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
            <Button onClick={createNewCompany} type="primary">
              <PlusOutlined /> Create new company
            </Button>
          </div>

          <Table columns={columns} data={data} isLoading={isFetching} />
        </Col>
      </Row>
    </>
  );
};

export default CompanyList;
