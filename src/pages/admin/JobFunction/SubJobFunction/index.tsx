import { useEffect, useState } from "react";
import { Col, Row, TableColumnsType } from "antd";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

import Table from "@components/Table";
import Button from "@components/Button";
import { useDeleteJFMutation, useGetJFMutation, useListMutation, useSjfListMutation } from "@services";
import { IJobFunctionReducer } from "@/store/job-function/job.function.types";
import { ICombineReducerProps } from "@store";
// import AddJobFunction from "./AddJobFunction";
// import EditJobFunction from "./EditJobFunction";
import { Paths } from "@/router";
import { useParams } from "react-router-dom";

type TableRow = {
    id: number;
    name: string;
};

const SubJobFunction = () => {
    const history = useHistory();
    const [isAddJFVisible, setIsAddJFVisible] = useState(false);
    const [isEditJFVisible, setIsEditJFVisible] = useState(false);
    const [getSJFList, { isLoading }] = useSjfListMutation();
    const [deleteJF] = useDeleteJFMutation();
    const jfReducer: IJobFunctionReducer = useSelector((state: ICombineReducerProps) => state.jobFunction);
    const [editJfId, setEditJFId] = useState<string>('');
    const [getJF] = useGetJFMutation();
    const [listData, setListData] = useState<Array<TableRow>>([]);
    const params = useParams();

    console.log(params);
    const id = 21;

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
                        <span className="table__action__btn" onClick={() => onEditJf(id)}>Edit</span>
                        <span className="table__action__btn table__action__btn--delete" onClick={() => deleteJFFromApi(id)}>
                            Delete
                        </span>
                    </div>
                );
            },
        },
    ];

    const onNavigateSJF = (id: number, name: string) => {
        history.push(`${Paths.Settings.sub_job_function}/${id}`);

    }

    const onEditJf = async (id: string) => {
        await getJF(id);
        setEditJFId(id);
        setIsEditJFVisible(true);
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
            await deleteJF(id);
            getSJFListFromApi();
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <>
            {/* <AddJobFunction setIsVisible={setIsAddJFVisible} isVisible={isAddJFVisible} />
            <EditJobFunction setIsVisible={setIsEditJFVisible} isVisible={isEditJFVisible} editJfId={editJfId} /> */}
            <Row>
                <Col span={24}>
                    <div className="main-heading">Sub Job Function</div>
                </Col>
            </Row>
            <Row className="mt-16 mb-20">
                <Col className="align-start" span={16}>
                </Col>
                <Col className="align-end" span={8}>
                    <Button variant="add" onClick={() => setIsAddJFVisible(true)}>
                        Add New Job
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
