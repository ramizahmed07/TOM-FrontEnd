import { useEffect, useState } from "react";
import { Col, Row, TableColumnsType } from "antd";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

import Table from "@components/Table";
import Button from "@components/Button";
import { checkPermission } from "@utils";
import { permissions } from "@router";
import { useDeleteJFMutation, useGetJFMutation, useListMutation } from "@services";
import { IJobFunctionReducer } from "@/store/job-function/job.function.types";
import { ICombineReducerProps } from "@store";
import AddJobFunction from "./AddJobFunction";
import EditJobFunction from "./EditJobFunction";
import { Paths } from "@/router";

type JobSubFunction = {
  id: number;
  name: string;
}

type TableRow = {
  id: number;
  name: string;
  job_sub_functions: Array<JobSubFunction>
};

const JobFunction = () => {
  const history = useHistory();
  const [isAddJFVisible, setIsAddJFVisible] = useState(false);
  const [isEditJFVisible, setIsEditJFVisible] = useState(false);
  const [getJFList, { isLoading }] = useListMutation();
  const [deleteJF] = useDeleteJFMutation();
  const jfReducer: IJobFunctionReducer = useSelector((state: ICombineReducerProps) => state.jobFunction);
  const [editJfId, setEditJFId] = useState<string>('');
  const [getJF] = useGetJFMutation();

  useEffect(() => {
    getJFListFromApi();
  }, []);


  const columns: TableColumnsType<TableRow> = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
      width: "10%",
    },
    {
      title: "Job Function",
      dataIndex: "jobFunction",
      key: "jobFunction",
      width: "20%",
      render: ({ id, name, }) => {
        return <span style={{ cursor: "pointer" }} onClick={() => onNavigateSJF(id, name)}>{name}</span>
      }
    },
    {
      title: "Job Sub-Function",
      key: "job_sub_functions",
      width: "55%",
      render: ({ job_sub_functions }) => {
        if (Array.isArray(job_sub_functions) && job_sub_functions.length) {
          return job_sub_functions.map((val: JobSubFunction) => {
            return val.name
          }).join(', ');
        }
        return null;
      }
    },
    ...((!checkPermission([
      permissions.UPDATE_JOB_SUB_FUNCTION,
      permissions.DELETE_JOB_SUB_FUNCTION,
    ])
      ? []
      : [
        {
          title: "Actions",
          key: "action",
          fixed: "right",
          width: "15%",
          render: ({ id }: TableRow) => {
            return (
              <div>
                {checkPermission(permissions.UPDATE_JOB_SUB_FUNCTION) && (
                  <span className="table__action__btn" onClick={() => onEditJf(id.toString())}>Edit</span>
                )}
                {checkPermission(permissions.DELETE_JOB_SUB_FUNCTION) && (
                  <span className="table__action__btn table__action__btn--delete" onClick={() => deleteJFFromApi(id.toString())}>
                    Delete
                  </span>
                )}
              </div>
            );
          },
        },
      ]) as any),
  ];

  const onNavigateSJF = (id: number, name: string) => {
    history.push(`${Paths.Settings.sub_job_function}${id}`);
  }

  const onEditJf = async (id: string) => {
    await getJF(id);
    setEditJFId(id);
    setIsEditJFVisible(true);
  }

  const getJFListFromApi = async () => {
    try {
      await getJFList('');
    } catch (e) {
      console.log('Err: ', e);
    }
  }

  const deleteJFFromApi = async (id: string) => {
    try {
      await deleteJF(id);
      getJFListFromApi();
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <AddJobFunction setIsVisible={setIsAddJFVisible} isVisible={isAddJFVisible} />
      <EditJobFunction setIsVisible={setIsEditJFVisible} isVisible={isEditJFVisible} editJfId={editJfId} />
      <Row>
        <Col span={24}>
          <div className="main-heading">Job Function & Sub-Function</div>
        </Col>
      </Row>
      <Row className="mt-16 mb-20">
        <Col className="align-start" span={16}>
          <Button
            variant="upload"
            onClick={() => console.log("upload job function")}
          >
            Upload Job Functions
          </Button>
          <Button
            variant="download"
            onClick={() => console.log("Download Job Functions")}
          >
            Download Job Functions
          </Button>
        </Col>
        <Col className="align-end" span={8}>
          {checkPermission(permissions.CREATE_JOB_SUB_FUNCTION) && (
            <Button variant="add" onClick={() => setIsAddJFVisible(true)}>
              Add New Job
            </Button>
          )}
        </Col>
      </Row>
      <Row>
        <Table data={jfReducer.list} columns={columns} />
      </Row>
    </>
  );
};

export default JobFunction;
