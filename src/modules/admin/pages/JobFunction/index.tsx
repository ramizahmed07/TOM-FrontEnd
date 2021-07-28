import { useState } from "react";
import { Col, Row, TableColumnsType } from "antd";

import { AddButton, DownloadButton, UploadButton } from "@components/Buttons";
import Table from "@components/Table";
import AddJobFunction from "./AddJobFunction";

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
  {
    title: "Actions",
    key: "action",
    fixed: "right",
    width: "15%",
    render: () => {
      return (
        <div>
          <span className="table__action__btn">Edit</span>
          <span className="table__action__btn--delete">Delete</span>
        </div>
      );
    },
  },
];

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
          <UploadButton
            text="Upload Job Functions"
            callback={() => console.log("upload job function")}
          />
          <DownloadButton
            text="Download Job Functions"
            callback={() => console.log("Download Job Functions")}
          />
        </Col>
        <Col className="align-end" span={8}>
          <AddButton text="Add New Job" callback={() => setIsVisible(true)} />
        </Col>
      </Row>
      <Row>
        <Table data={data} columns={columns} />
      </Row>
    </>
  );
};

export default JobFunction;
