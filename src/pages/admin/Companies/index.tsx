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
  message,
} from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";

import "./companies.less";
import { ReactComponent as MenuIcon } from "@assets/images/vertical-dots.svg";
import { ReactComponent as FilterIcon } from "@assets/images/filter.svg";
import { Paths } from "@router";
import {
  ErrorServices,
  useFetchCompaniesQuery,
  useUpdateCompanyStatusMutation,
} from "@services";
import { ICompany } from "@store/companies";
import Table from "@components/Table";

const Companies = () => {
  const history = useHistory();
  const [updateCompanyStatus] = useUpdateCompanyStatusMutation();
  const { data: companiesData, isLoading: isFetching } =
    useFetchCompaniesQuery(null);
  const { data, pagination } = companiesData || {};

  const createNewCompany = () => history.push(Paths.Users.companies.create);

  const toggleSwitch = async (
    status: boolean,
    company_id: number,
    e: MouseEvent
  ) => {
    e.stopPropagation();
    try {
      await updateCompanyStatus({ company_id, status });
      message.success("Status updated!");
    } catch (error) {
      ErrorServices(error);
      console.log(error);
    }
  };

  const columns: TableColumnsType<ICompany> = [
    {
      title: <div className="companies__table__col__title">Company ID</div>,
      dataIndex: "id",
      key: "id",
      width: 110,
    },
    {
      title: <div className="companies__table__col__title">Company Name</div>,
      dataIndex: "name",
      key: "name",
      width: 130,
    },
    {
      title: <div className="companies__table__col__title">Name</div>,
      key: "name",
      width: 120,
      render: (record: ICompany) =>
        `${record.user?.first_name} ${record.user?.last_name}`,
    },
    {
      title: <div className="companies__table__col__title">Email</div>,
      key: "email",
      width: 200,
      render: (record: ICompany) => record.user?.email,
    },
    {
      title: <div className="companies__table__col__title">Location</div>,
      dataIndex: "country_headquarter",
      key: "country_headquarter",
      width: 120,
      filters: [],
      filterIcon: <FilterIcon className="table__filter__icon" />,
    },
    {
      title: <div className="companies__table__col__title">Status Company</div>,
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
      title: <div className="companies__table__col__title">Status</div>,
      width: 90,
      align: "center",
      render: (record: ICompany) => {
        return (
          <Switch
            defaultChecked={record.is_active}
            onChange={(val, e) => toggleSwitch(val, record?.id!, e)}
          />
        );
      },
    },
    {
      title: <div className="companies__table__col__title">Action</div>,
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

  const onRowClick = (data: any) => {
    history.push(`/companies/${data?.id}`);
  };

  return (
    <div className="companies">
      <Row>
        <Col span={24}>
          <div className="main-heading mb-16">Companies list</div>
          <div className="companies__upper mb-20">
            <Input
              className="companies__upper__searchbar"
              type="email"
              placeholder="Search by name or ID..."
              prefix={<SearchOutlined color="#435465" />}
            />
            <Button onClick={createNewCompany} type="primary">
              <PlusOutlined /> Create new company
            </Button>
          </div>

          <Table
            onRowClick={onRowClick}
            columns={columns}
            data={data}
            isLoading={isFetching}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Companies;
