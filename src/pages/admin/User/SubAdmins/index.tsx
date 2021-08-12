import { useEffect, useRef } from "react";
import {
    Table,
    TableColumnsType,
    Switch,
    Button,
    Input,
    message,
} from "antd";
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import { Paths } from "@/router";
import { useGetSubAdminMutation, useSubAdminListMutation, useToggleSubAdminMutation } from "@/services/sub.admin";
import { ICombineReducerProps } from "@/store";
import { ISubAdminItem, ISubAdminReducer } from "@/store/sub-admin/sub.admin.types";
import { LoadingOutlined } from "@ant-design/icons";
import './style.less';

const SubAdminsList = () => {
    let sub_admin_id = useRef<any>(null);
    const subAdminReducer: ISubAdminReducer = useSelector((state: ICombineReducerProps) => state.subAdmin);

    const history = useHistory();
    const [getSubAdminList] = useSubAdminListMutation();
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
            dataIndex: "phone_number",
            key: "phone_number",
            width: 130,
        },
        {
            title: "Active/Inactive",
            width: 130,
            render: ({ id, first_name, last_name, is_active }) => {
                console.log('is_active: ', is_active);
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
            await getSubAdminList('');
        } catch (error) {
            message.error(error?.message);
        }
    }

    const toggleSubAdminFromApi = async (id: string, name: string, is_active: boolean) => {
        const isUserActive = is_active ? 'active' : 'inactive';
        try {
            await toggleSubAdmin({ id, is_active });
            getAdminListFromApi();
            message.success(`${name} has been successfully ${isUserActive}`);
        } catch (error) {
            message.error(error?.message);
        }
    }

    const onEditSubAdmin = async (id: string) => {
        sub_admin_id.current = id;
        try {
            await getSubAdmin(id);
            history.push(`/sub-admins/edit/${id}`);
        } catch (error) {
            message.error(error?.message);
        }
    }

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
                dataSource={subAdminReducer.list}
            />
        </>
    );
};

export default SubAdminsList;