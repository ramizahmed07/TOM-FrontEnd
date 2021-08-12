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
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { useHistory } from "react-router-dom";

import './style.less';
// import { data, TableRow } from "./dumpData";
import { ReactComponent as MenuIcon } from "@assets/images/vertical-dots.svg";
import { Paths } from "@/router";

type TableRow = {
    id: string;
    name: string;
    email: string;
    phone_no: string;
};

const SubAdminsList = () => {
    const history = useHistory();
    const listData: Array<TableRow> = [];
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
                return (
                    <div>
                        <span className="table__action__btn">
                            {/* {isGettingJF && id === jf_id?.current ? (
                                <LoadingOutlined color="primary" className="spinner" />
                            ) : ( */}
                            Edit
                            {/* )} */}
                        </span>
                        {/* <span className="table__action__btn table__action__btn--delete" onClick={() => deleteJFFromApi(id)}>
                            {isDeleting && id === jf_id?.current ? (
                                <LoadingOutlined color="red" className="spinner" />
                            ) : (
                                "Delete"
                            )}
                        </span> */}
                    </div>
                );
            },
        },
    ];

    return (
        <>
            <h1 className='page__heading'>Sub-Admins</h1>
            <div className='header__container'>
                <Input
                    className="form__input"
                    type="email"
                    placeholder='Search by name or ID...'
                    prefix={<SearchOutlined style={{ color: '#435465' }} />}
                />
                <Button type="primary" onClick={() => history.push(Paths.Users.sub_admins.create_sub_admin)}><PlusOutlined /> Create sub admin</Button>
            </div>
            <Table
                scroll={{ x: 1300, y: "calc(100vh - 27.5em)" }}
                columns={columns}
                dataSource={listData}
            />
        </>
    );
};

export default SubAdminsList;