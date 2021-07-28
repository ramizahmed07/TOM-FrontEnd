import { useState } from "react";
import { Col, Row, TableColumnsType, Typography } from "antd";

import { AddBtn, DownloadBtn, UploadBtn } from "@components/Buttons";
import Table from "@components/Table";
import AddJobFunction from "@components/JobFunction/AddJobFunction";

const columns: TableColumnsType<TableRow> = [
  {
    title: "ID",
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
          <span className="settings__table__action">Edit</span>
          <span className="settings__table__action">Delete</span>
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
          <Typography.Paragraph className="settings__title">
            Job Function & Sub-Function
          </Typography.Paragraph>
        </Col>
      </Row>
      <Row>
        <Col className="settings__parent__col" span={16}>
          <UploadBtn
            text="Upload Job Functions"
            callback={() => console.log("upload job function")}
          />
          <DownloadBtn
            text="Download Job Functions"
            callback={() => console.log("Download Job Functions")}
          />
        </Col>
        <Col className="settings__parent__col--last" span={8}>
          <AddBtn text="Add New Job" callback={() => setIsVisible(true)} />
        </Col>
      </Row>
      <Row className="settings__table">
        <Table data={data} columns={columns} />
      </Row>
    </>
  );
};

export default JobFunction;
