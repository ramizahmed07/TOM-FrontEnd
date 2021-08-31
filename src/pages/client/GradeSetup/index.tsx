import { Col, Row } from "antd";

import Button from "@components/Button";
import Table from "@components/Table";

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
          columns={[
            {
              title: "job grade",
              dataIndex: "jobGrade",
              key: "jobGrade",
              width: `calc(100% - 660px)`,
            },
            {
              title: "country",
              dataIndex: "country",
              key: "country",
              width: 250,
            },
            {
              title: "type",
              dataIndex: "type",
              key: "type",
              width: 250,
            },
            {
              title: "action",
              key: "type",
              width: 160,
              render: () => (
                <>
                  <div className="table__action__btn table__action__btn--client">
                    Edit
                  </div>
                  <div className="table__action__btn table__action__btn--delete">
                    Delete
                  </div>
                </>
              ),
            },
          ]}
          pagination={false}
        />
      </Row>
    </>
  );
};

export default GradeSetup;
