import { useState } from "react";
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
import { paths } from "@router";
import {
  ErrorServices,
  useFetchCompaniesQuery,
  useUpdateCompanyStatusMutation,
} from "@services";
import Table from "@components/Table";
import { ICompany } from "@/types";

const Companies = () => {
  const history = useHistory();
  const [page, setPage] = useState(1);
  const [updateCompanyStatus] = useUpdateCompanyStatusMutation();
  const { data: companiesData, isLoading: isFetching } =
    useFetchCompaniesQuery(page);
  const { data, pagination } = companiesData || {};

  const createNewCompany = () =>
    history.push(paths.admin.users.companies.create);

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
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 100,
    },
    {
      title: "Company Name",
      dataIndex: "name",
      key: "name",
      width: 200,
      render: (name: string) => <div className="text-wrap">{name}</div>,
    },
    {
      title: "Name",
      key: "name",
      width: 120,
      render: (record: ICompany) => (
        <div className="text-wrap">
          {`${record.user?.first_name} ${record.user?.last_name}`}
        </div>
      ),
    },
    {
      title: "Email",
      key: "email",
      width: 250,
      render: (record: ICompany) => (
        <div className="text-wrap">{record.user?.email}</div>
      ),
    },
    {
      title: "Location",
      dataIndex: "country_headquarter",
      key: "country_headquarter",
      width: 150,
      render: (location: string) => <div className="text-wrap">{location}</div>,
    },
    {
      title: "Status Company",
      dataIndex: "status",
      key: "status",
      width: 200,
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
      title: "Status",
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
      title: "Action",
      key: "action",
      fixed: "right",
      width: 160,
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
            pagination={true}
            count={pagination?.count}
            onChangePage={setPage}
            page={page}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Companies;
