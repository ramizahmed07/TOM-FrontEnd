import { useEffect, useState } from "react";
import { Col, Row, TableColumnsType } from "antd";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

import Table from "@components/Table";
import Button from "@components/Button";
import { useDeleteJFMutation, useDeleteJSFMutation, useGetJFMutation, useGetJSFMutation, useListMutation, useSjfListMutation } from "@services";
import { IJobFunctionReducer } from "@/store/job-function/job.function.types";
import { ICombineReducerProps } from "@store";
import { Paths } from "@/router";
import { useLocation, useParams } from "react-router-dom";
import AddJobSubFunction from "./AddJobSubFunction";
import EditJobSubFunction from "./EditJobSubFunction";

type TableRow = {
    id: number;
    name: string;
};

const SubJobFunction = () => {
    const [isAddJSFVisible, setIsAddJSFVisible] = useState(false);
    const [isEditJSFVisible, setIsEditJSFVisible] = useState(false);
    const [getSJFList, { isLoading }] = useSjfListMutation();
    const [deleteJSF] = useDeleteJSFMutation();
    const jfReducer: IJobFunctionReducer = useSelector((state: ICombineReducerProps) => state.jobFunction);
    const [editJsfId, setEditJSFId] = useState<string>('');
    const [getJSF] = useGetJSFMutation();
    const [listData, setListData] = useState<Array<TableRow>>([]);
    const params: { job_id: string } = useParams();

    const id = Number(params?.job_id);

    useEffect(() => {
        updateListData();
    }, []);

    const updateListData = () => {
        let listData: Array<TableRow> = [];
        for (let index = 0; index <= jfReducer.list.length; index++) {
            const item = jfReducer.list[index];
            if (item.id == id) {
                listData = item.job_sub_functions.map(t => {
                    return { id: t.id, name: t.name };
                });
                break;
            }
        }
        setListData(listData);
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
                        <span className="table__action__btn" onClick={() => onEditJSf(id)}>Edit</span>
                        <span className="table__action__btn table__action__btn--delete" onClick={() => deleteJFFromApi(id)}>
                            Delete
                        </span>
                    </div>
                );
            },
        },
    ];

    const onEditJSf = async (id: string) => {
        await getJSF(id);
        setEditJSFId(id);
        setIsEditJSFVisible(true);
    }

    const getSJFListFromApi = async () => {
        try {
            await getSJFList('');
        } catch (e) {
            console.log('Err: ', e);
        }
    }

    const deleteJFFromApi = async (id: string) => {
        try {
            await deleteJSF(id);
            getSJFListFromApi();
            updateListData();
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <>
            <AddJobSubFunction setIsVisible={setIsAddJSFVisible} isVisible={isAddJSFVisible} job_function_id={id} updateList={updateListData} />
            <EditJobSubFunction setIsVisible={setIsEditJSFVisible} isVisible={isEditJSFVisible} editJsfId={editJsfId} job_function_id={id} />
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
                <Table data={listData} columns={columns} />
            </Row>
        </>
    );
};

export default SubJobFunction;
