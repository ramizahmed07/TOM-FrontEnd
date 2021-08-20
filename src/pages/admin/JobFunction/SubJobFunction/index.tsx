import { useEffect, useState } from "react";
import { Col, Dropdown, Menu, message, Row, TableColumnsType } from "antd";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Table from "@components/Table";
import Button from "@components/Button";
import { ErrorServices, useDeleteJSFMutation, useGetJFMutation, useSjfListMutation } from "@services";
import { IJobFunctionReducer } from "@/store/job-function/job.function.types";
import { ICombineReducerProps } from "@store";
import AddJobSubFunction from "./AddJobSubFunction";
import EditJobSubFunction from "./EditJobSubFunction";
import { ReactComponent as MenuIcon } from "@assets/images/vertical-dots.svg";

type SubJobFunctionType = {
    id: number;
    name: string;
};

const SubJobFunction = () => {
    const jfReducer: IJobFunctionReducer = useSelector((state: ICombineReducerProps) => state.jobFunction);
    const [isAddJSFVisible, setIsAddJSFVisible] = useState(false);
    const [isEditJSFVisible, setIsEditJSFVisible] = useState(false);
    const [getSJFList, { isLoading }] = useSjfListMutation();
    const [deleteJSF] = useDeleteJSFMutation();
    const [jsfItem, setJsfItem] = useState({});
    const params: { job_id: string } = useParams();
    const [getJF] = useGetJFMutation();


    const id = Number(params?.job_id);

    useEffect(() => {
        updateListData();
    }, []);

    const updateListData = async () => {
        try {
            await getJF(id).unwrap();
            message.success("List has been successfully fetched");
        } catch (error) {
            ErrorServices(error);
        }
    }

    const handleActionDropdown = ({
        item,
        key,
        domEvent,
    }: {
        key: string;
        domEvent:
        | React.MouseEvent<HTMLElement, MouseEvent>
        | React.KeyboardEvent<HTMLElement>;
        item: SubJobFunctionType;
    }) => {
        domEvent.stopPropagation();
        if (key === "2") {
            deleteJSFromApi(item?.id.toString());
        } else {
            onEditJSf(item);
        }
    };


    const columns: TableColumnsType<SubJobFunctionType> = [
        {
            title: "id",
            dataIndex: "id",
            key: "id",
            width: "10%",
        },
        {
            title: "Job Sub Function",
            key: "name",
            dataIndex: "name",
            width: "50%",
        },
        {
            title: "Actions",
            key: "action",
            fixed: "right",
            width: "5%",
            render: (item: SubJobFunctionType) => {
                const menu = (
                    <Menu
                        onClick={({ key, domEvent }) =>
                            handleActionDropdown({ item, key, domEvent })
                        }
                        tabIndex={1}
                    >
                        <Menu.Item key="1">Edit</Menu.Item>
                        <Menu.Item key="2" danger>
                            Delete
                        </Menu.Item>
                    </Menu>
                );
                return (
                    <div className="table__action__menu">
                        <Dropdown overlay={menu} trigger={["click"]}>
                            <MenuIcon
                                onClick={e => {
                                    e.stopPropagation();
                                }}
                            />
                        </Dropdown>
                    </div>
                );
            },
        },
    ];

    const onEditJSf = async (item: SubJobFunctionType) => {
        try {
            setJsfItem(item);
            setIsEditJSFVisible(true);
        } catch (error) {
            ErrorServices(error);
        }
    }

    const getSJFListFromApi = async () => {
        try {
            await getSJFList('').unwrap();
        } catch (error) {
            ErrorServices(error);
        }
    }

    const deleteJSFromApi = async (id: string) => {
        try {
            await deleteJSF(id).unwrap();
            getSJFListFromApi();
            updateListData();
        } catch (error) {
            ErrorServices(error);
        }
    }

    return (
        <>
            <AddJobSubFunction setIsVisible={setIsAddJSFVisible} isVisible={isAddJSFVisible} job_function_id={id} updateList={updateListData} />
            <EditJobSubFunction setIsVisible={setIsEditJSFVisible} isVisible={isEditJSFVisible} jsfItem={jsfItem} job_function_id={id} updateList={updateListData} />
            <Row>
                <Col span={24}>
                    <div className="main-heading">Sub Job Function</div>
                </Col>
            </Row>
            <Row className="mt-16 mb-20">
                <Col className="align-start" span={16}>
                </Col>
                <Col className="align-end" span={8}>
                    <Button variant="add" onClick={() => setIsAddJSFVisible(true)}>
                        Add New Sub Job
                    </Button>
                </Col>
            </Row>
            <Row>
                <Table data={jfReducer.jobFunctionItem.job_sub_functions} columns={columns} isLoading={isLoading} />
            </Row>
        </>
    );
};

export default SubJobFunction;
