import { useEffect, useRef, useState } from "react";
import { Col, message, Row, TableColumnsType } from "antd";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

import Table from "@components/Table";
import Button from "@components/Button";
import { ErrorServices, useDeleteJFMutation, useDeleteJSFMutation, useGetJFMutation, useGetJSFMutation, useListMutation, useSjfListMutation } from "@services";
import { IJobFunctionReducer } from "@/store/job-function/job.function.types";
import { ICombineReducerProps } from "@store";
import { Paths } from "@/router";
import { useLocation, useParams } from "react-router-dom";
import AddJobSubFunction from "./AddJobSubFunction";
import EditJobSubFunction from "./EditJobSubFunction";
import { LoadingOutlined } from "@ant-design/icons";

type TableRow = {
    id: number;
    name: string;
};

const SubJobFunction = () => {
    let jsf_id = useRef<any>(null);
    const jfReducer: IJobFunctionReducer = useSelector((state: ICombineReducerProps) => state.jobFunction);
    const [isAddJSFVisible, setIsAddJSFVisible] = useState(false);
    const [isEditJSFVisible, setIsEditJSFVisible] = useState(false);
    const [getSJFList, { isLoading }] = useSjfListMutation();
    const [deleteJSF, { isLoading: isDeleting }] = useDeleteJSFMutation();
    const [editJsfId, setEditJSFId] = useState<string>('');
    const [getJSF, { isLoading: isGettingJSF }] = useGetJSFMutation();
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

    const columns: TableColumnsType<TableRow> = [
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
            width: "20%",
        },
        {
            title: "Actions",
            key: "action",
            fixed: "right",
            width: "15%",
            render: ({ id }) => {
                return (
                    <div>
                        <span className="table__action__btn" onClick={() => onEditJSf(id)}>
                            {isGettingJSF && id === jsf_id?.current ? (
                                <LoadingOutlined color="primary" className="spinner" />
                            ) : (
                                "Edit"
                            )}
                        </span>
                        <span className="table__action__btn table__action__btn--delete" onClick={() => deleteJSFromApi(id)}>
                            {isDeleting && id === jsf_id?.current ? (
                                <LoadingOutlined color="red" className="spinner" />
                            ) : (
                                "Delete"
                            )}
                        </span>
                    </div>
                );
            },
        },
    ];

    const onEditJSf = async (id: string) => {
        jsf_id.current = id;
        try {
            await getJSF(id).unwrap;
            setEditJSFId(id);
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
            jsf_id.current = id;
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
            <EditJobSubFunction setIsVisible={setIsEditJSFVisible} isVisible={isEditJSFVisible} editJsfId={editJsfId} job_function_id={id} updateList={updateListData} />
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
