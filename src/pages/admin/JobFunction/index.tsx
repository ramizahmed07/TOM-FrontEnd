import { useEffect, useRef, useState } from "react";
import { Col, message, Row, TableColumnsType } from "antd";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

import Table from "@components/Table";
import Button from "@components/Button";
import { useDeleteJFMutation, useDownloadJobFunctionsMutation, useGetJFMutation, useListMutation, useUploadJobFunctionsMutation } from "@services";
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

  const [uploadJobFunction, { isLoading: isUploading }] =
    useUploadJobFunctionsMutation();

  const [downloadJobFunction, { isLoading: isDownloading }] = useDownloadJobFunctionsMutation();

  const inputRef = useRef<any>(null);

  useEffect(() => {
    getJFListFromApi();
  }, []);

  console.log('isLoading: ', isLoading);
  const columns: TableColumnsType<TableRow> = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
      width: "10%",
    },
    {
      title: "Job Function",
      key: "name",
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
    history.push(`/job-sub-function/${id}`, { id });
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

  const uploadFile = async (event: any) => {
    event.stopPropagation();
    event.preventDefault();
    var file = event?.target?.files[0];
    try {
      const formData = new FormData();
      formData.append("attachment", file, file.name);
      alert('Uploading start')
      await uploadJobFunction(formData).unwrap();
      message.success("CSV Data Uploaded Successfully");
    } catch (error) {
      message.error(error?.message);
      console.log(error);
    }
  }

  const downloadFile = async (event: any) => {
    try {
      const response = await downloadJobFunction('');
      // console.log(response);
      message.success("CSV Data Downloaded Successfully");
    } catch (error) {
      message.error(error?.message);
      console.log(error);
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
          <input
            id="myInput"
            type="file"
            ref={inputRef}
            hidden={true}
            onChange={(e) => uploadFile(e)}
          />
          <Button
            variant="upload"
            onClick={() => inputRef?.current?.click()}
          >
            Upload Job Functions
          </Button>
          <Button
            variant="download"
            onClick={downloadFile}
          >
            Download Job Functions
          </Button>
        </Col>
        <Col className="align-end" span={8}>
          <Button variant="add" onClick={() => setIsAddJFVisible(true)}>
            Add New Job
          </Button>
        </Col>
      </Row>
      <Row>
        <Table data={jfReducer.list} columns={columns} />
      </Row>
    </>
  );
};

export default JobFunction;
