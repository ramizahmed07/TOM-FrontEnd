import { Col, Row } from "antd";

import Button from "@components/Button";
import Table from "@components/Table";
import { columns } from "./config";

const GradeSetup = () => {
  return (
    <>
      <Row>
        <Col span={24}>
          <div className="main-heading">Grade Setup</div>
        </Col>
      </Row>
      <Row className="mt-16 mb-20">
        <Col className="align-start" span={16}>
          <Button variant="upload_client">Upload</Button>
          <Button variant="download_client">Download</Button>
        </Col>
      </Row>
      <Row>
        <Table
          //   onRowClick={onRowClick}
          data={[
            {
              jobGrade: "11",
              country: "Pakistan",
              type: "Human Resources",
            },
            {
              jobGrade: "33A",
              country: "Afghanistan",
              type: "Design",
            },
            {
              jobGrade: "41E",
              country: "Germany",
              type: "Engineering",
            },
          ]}
          columns={columns}
          pagination={false}
        />
      </Row>
    </>
  );
};

export default GradeSetup;
