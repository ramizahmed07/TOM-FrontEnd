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
  Button,
  Input,
} from "antd";
import {PlusOutlined, SearchOutlined} from '@ant-design/icons';
import { useHistory } from "react-router-dom";

import './style.less';
import { data, TableRow } from "./dumpData";
import RoutePaths from "@/routes/RoutePaths";
import { ReactComponent as MenuIcon } from "@assets/images/vertical-dots.svg";

const SubAdminsList = () => {
  const history = useHistory();
  const columns: TableColumnsType<TableRow> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 130,
    },
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
      width: 130,
    },
   
    {
      title: "EMAIL",
      dataIndex: "email",
      key: "email",
      width: 180,
    },
    {
      title: "PHONE NO",
      dataIndex: "phone_no",
      key: "phone_no",
      width: 130,
    },
    {
      title: "Active/Inactive",
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
            <h1 className='page__heading'>Sub-Admins</h1>
            <div className='header__container'>
              <Input
                className="form__input"
                type="email"
                placeholder='Search by name or ID...'
                // width='100vw'
                prefix={<SearchOutlined style={{color: '#435465'}}/>}
              />
              <Button type="primary" onClick={() => history.push(RoutePaths.User.subAdminsCreate)}><PlusOutlined /> Create sub admin</Button>
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

export default SubAdminsList;