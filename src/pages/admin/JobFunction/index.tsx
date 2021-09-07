import { useEffect, useRef, useState } from "react";
import { Col, Dropdown, Menu, message, Row, TableColumnsType } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

import Table from "@components/Table";
import Button from "@components/Button";
import { checkPermission } from "@utils";
import { permissions } from "@router";
import {
  ErrorServices,
  useDeleteJFMutation,
  useDownloadJobFunctionsMutation,
  useGetJFMutation,
  useListMutation,
  useUploadJobFunctionsMutation,
} from "@services";
import { IJobFunctionReducer } from "@/types";
import { ICombineReducerProps } from "@store";
import AddJobFunction from "./AddJobFunction";
import EditJobFunction from "./EditJobFunction";
import { ReactComponent as MenuIcon } from "@assets/images/vertical-dots.svg";

type JobSubFunctionType = {
  id: number;
  name: string;
};

type JobFunctionType = {
  id: number;
  name: string;
  job_sub_functions: Array<JobSubFunctionType>;
};

const JobFunction = () => {
  const history = useHistory();
  let jf_id = useRef<any>(null);
  const jfReducer: IJobFunctionReducer = useSelector(
    (state: ICombineReducerProps) => state.jobFunction
  );
  const [isAddJFVisible, setIsAddJFVisible] = useState(false);
  const [isEditJFVisible, setIsEditJFVisible] = useState(false);
  const [getJFList, { isLoading }] = useListMutation();
  const [deleteJF, { isLoading: isDeleting }] = useDeleteJFMutation();
  const [jfItem, setJfItem] = useState({});

  const [uploadJobFunction, { isLoading: isUploading }] =
    useUploadJobFunctionsMutation();

  const [downloadJobFunction, { isLoading: isDownloading }] =
    useDownloadJobFunctionsMutation();

  const inputRef = useRef<any>(null);

  useEffect(() => {
    getJFListFromApi();
  }, []);

  const handleActionDropdown = ({
    item,
    key,
    domEvent,
  }: {
    key: string;
    domEvent:
      | React.MouseEvent<HTMLElement, MouseEvent>
      | React.KeyboardEvent<HTMLElement>;
    item: JobFunctionType;
  }) => {
    domEvent.stopPropagation();
    if (key === "2") {
      deleteJFFromApi(item?.id.toString());
    } else {
      onEditJf(item);
    }
  };

  const columns: TableColumnsType<JobFunctionType> = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
      width: "10%",
    },
    {
      title: "Job Function",
      key: "name",
      dataIndex: "name",
      width: "20%",
    },
    {
      title: "Job Sub-Function",
      key: "job_sub_functions",
      width: "55%",
      render: ({ job_sub_functions }) => {
        if (Array.isArray(job_sub_functions) && job_sub_functions.length) {
          return job_sub_functions
            .map((val: JobSubFunctionType) => {
              return val.name;
            })
            .join(", ");
        }
        return null;
      },
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
            width: "10%",
            render: (item: JobFunctionType) => {
              const menu = (
                <Menu
                  onClick={({ key, domEvent }) =>
                    handleActionDropdown({ item, key, domEvent })
                  }
                  tabIndex={1}
                >
                  {checkPermission(permissions.UPDATE_JOB_SUB_FUNCTION) && (
                    <Menu.Item key="1">Edit</Menu.Item>
                  )}
                  {checkPermission(permissions.DELETE_JOB_SUB_FUNCTION) && (
                    <Menu.Item key="2" danger>
                      Delete
                    </Menu.Item>
                  )}
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
        ]) as any),
  ];

  const onRowClick = (data: any) => {
    history.push(`/job-sub-function/${data.id}`, { id: data.id });
  };

  const onEditJf = async (item: JobFunctionType) => {
    try {
      setJfItem(item);
      setIsEditJFVisible(true);
    } catch (error) {
      ErrorServices(error);
    }
  };

  const getJFListFromApi = async () => {
    try {
      await getJFList("").unwrap();
      message.success("List has been successfully fetched");
    } catch (error) {
      ErrorServices(error);
    }
  };

  const deleteJFFromApi = async (id: string) => {
    jf_id.current = id;
    try {
      await deleteJF(id).unwrap();
      getJFListFromApi();
    } catch (error) {
      ErrorServices(error);
    }
  };

  const uploadFile = async (event: any) => {
    event.stopPropagation();
    event.preventDefault();
    var file = event?.target?.files[0];
    try {
      const formData = new FormData();
      formData.append("attachment", file, file.name);
      await uploadJobFunction(formData).unwrap();
      getJFListFromApi();
      message.success("CSV Data Uploaded Successfully");
    } catch (error) {
      ErrorServices(error);
    }
  };

  const downloadFile = async (event: any) => {
    try {
      await downloadJobFunction("").unwrap();
      message.success("CSV Data Downloaded Successfully");
    } catch (error) {
      ErrorServices(error);
    }
  };

  return (
    <>
      <AddJobFunction
        setIsVisible={setIsAddJFVisible}
        isVisible={isAddJFVisible}
      />
      <EditJobFunction
        setIsVisible={setIsEditJFVisible}
        isVisible={isEditJFVisible}
        jfItem={jfItem}
      />
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
            onChange={e => uploadFile(e)}
          />
          <Button variant="upload" onClick={() => inputRef?.current?.click()}>
            {isUploading ? (
              <LoadingOutlined color="white" className="spinner" />
            ) : (
              "Upload Job Functions"
            )}
          </Button>
          <Button variant="download" onClick={downloadFile}>
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
        <Table
          data={jfReducer.list}
          columns={columns}
          onRowClick={onRowClick}
          isLoading={isLoading}
        />
      </Row>
    </>
  );
};

export default JobFunction;
