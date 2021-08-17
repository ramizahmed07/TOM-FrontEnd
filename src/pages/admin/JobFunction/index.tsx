import { useState } from "react";
import { Col, Row, TableColumnsType } from "antd";

import Table from "@components/Table";
import AddJobFunction from "./AddJobFunction";
import Button from "@components/Button";
import { checkPermission } from "@utils";
import { permissions } from "@router";

type TableRow = {
  id: string;
  jobFunction: string;
  jobSubFunction: string;
};

const data: TableRow[] = [
  {
    id: "01",
    jobFunction: "General Manager",
    jobSubFunction: "Business Stategy & Planning, Risk Management",
  },
  {
    id: "02",
    jobFunction: "Finance",
    jobSubFunction: "Finance Generalists, Financial Control, Accounting, Tax",
  },
];

const JobFunction = () => {
  const [isVisible, setIsVisible] = useState(false);

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
    },
    {
      title: "Job Sub-Function",
      dataIndex: "jobSubFunction",
      key: "jobSubFunction",
      width: "55%",
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
            render: () => {
              return (
                <div>
                  {checkPermission(permissions.UPDATE_JOB_SUB_FUNCTION) && (
                    <span className="table__action__btn">Edit</span>
                  )}
                  {checkPermission(permissions.DELETE_JOB_SUB_FUNCTION) && (
                    <span className="table__action__btn table__action__btn--delete">
                      Delete
                    </span>
                  )}
                </div>
              );
            },
          },
        ]) as any),
  ];

  return (
    <>
      <AddJobFunction setIsVisible={setIsVisible} isVisible={isVisible} />
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
            <Button variant="add" onClick={() => setIsVisible(true)}>
              Add New Job
            </Button>
          )}
        </Col>
      </Row>
      <Row>
        <Table data={data} columns={columns} />
      </Row>
    </>
  );
};

export default JobFunction;
