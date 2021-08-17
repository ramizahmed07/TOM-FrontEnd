import { useEffect, useRef } from "react";
import {
  TableColumnsType,
  Switch,
  Input,
  message,
  Row,
  Col,
} from "antd";
import { PlusOutlined, SearchOutlined, LoadingOutlined } from '@ant-design/icons';
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import { Paths } from "@/router";
import Button from "@components/Button";
import Table from "@components/Table";
import { useGetSubAdminMutation, useSubAdminListMutation, useToggleSubAdminMutation } from "@/services/sub.admin";
import { ICombineReducerProps } from "@/store";
import { ISubAdminItem, ISubAdminReducer } from "@/store/sub-admin/sub.admin.types";
import { ErrorServices } from "@/services";

const SubAdminsList = () => {
  let sub_admin_id = useRef<any>(null);
  const subAdminReducer: ISubAdminReducer = useSelector((state: ICombineReducerProps) => state.subAdmin);

  const history = useHistory();
  const [getSubAdminList, { isLoading: isGettingSubAdminList }] = useSubAdminListMutation();
  const [toggleSubAdmin] = useToggleSubAdminMutation();
  const [getSubAdmin, { isLoading }] = useGetSubAdminMutation();

  const columns: TableColumnsType<ISubAdminItem> = [
    {
      title: "NAME",
      key: "name",
      width: 130,
      render: ({ first_name, last_name }) =>
        (<span>{first_name} {last_name}</span>)
    },
    {
      title: "EMAIL",
      dataIndex: "email",
      key: "email",
      width: 180,
    },
    {
      title: "PHONE NO",
      key: "phone_number",
      width: 130,
      render: ({ phone_number, phone_code }) => (<span>+{phone_code}{phone_number}</span>)
    },
    {
      title: "Active/Inactive",
      width: 130,
      render: ({ id, first_name, last_name, is_active }) => {
        return <Switch
          defaultChecked={is_active}
          onChange={(checked: boolean) => toggleSubAdminFromApi(id, `${first_name} ${last_name}`, checked)}
        />;
      },
    },
    {
      title: "Action",
      key: "action",
      fixed: "right",
      width: 80,
      render: ({ id }) => {
        return (
          <div>
            <span className="table__action__btn" onClick={() => onEditSubAdmin(id)}>
              {isLoading && id === sub_admin_id?.current ? (
                <LoadingOutlined color="primary" className="spinner" />
              ) : (
                "Edit"
              )}
            </span>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    getAdminListFromApi();
  }, []);

  const getAdminListFromApi = async () => {
    try {
      await getSubAdminList('').unwrap();
    } catch (error) {
      ErrorServices(error);
    }
  }

  const toggleSubAdminFromApi = async (id: string, name: string, is_active: boolean) => {
    const isUserActive = is_active ? 'active' : 'inactive';
    try {
      await toggleSubAdmin({ id, is_active }).unwrap();
      // getAdminListFromApi();
      message.success(`${name} has been successfully ${isUserActive}`);
    } catch (error) {
      ErrorServices(error);
    }
  }

  const onEditSubAdmin = async (id: string) => {
    sub_admin_id.current = id;
    try {
      await getSubAdmin(id).unwrap();
      history.push(`/sub-admins/edit/${id}`);
    } catch (error) {
      ErrorServices(error);
    }
  }

  return (
    <>
      <Row>
        <Col span={24}>
          <div className="main-heading">Sub-Admins</div>
        </Col>
      </Row>
      <div className='header__container'>
        <div />
        {/* <Input
                    className="form__input"
                    type="email"
                    placeholder='Search by name or ID...'
                    prefix={<SearchOutlined style={{ color: '#435465' }} />}
                /> */}
        <Col className="align-end" span={8}>
          <Button variant="add" onClick={() => history.push(Paths.Users.sub_admins.create)}>
            Create sub admin
          </Button>
        </Col>
      </div>

      <Table
        pagination={false}
        isLoading={isGettingSubAdminList}
        data={subAdminReducer.list} columns={columns}

      />
    </>
  );
};

export default SubAdminsList;