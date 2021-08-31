import { Col, Row } from "antd";

import Button from "@components/Button";
import Table from "@components/Table";

const SalaryRange = () => {
  return (
    <>
      <Row>
        <Col span={24}>
          <div className="main-heading">Salary Range</div>
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
              country: "Pakistan",
              city: "Karachi",
              tier: 2,
              rangeType: "Tech",
              grade: 14,
              min: 20000,
              mid: 50000,
              max: 80000,
            },
            {
              country: "Afghanistan",
              city: "Kabul",
              tier: 1,
              rangeType: "Non-Tech",
              grade: 14,
              min: 10000,
              mid: 30000,
              max: 50000,
            },
            {
              country: "Pakistan",
              city: "Karachi",
              tier: 2,
              rangeType: "Tech",
              grade: 14,
              min: 20000,
              mid: 50000,
              max: 80000,
            },
          ]}
          columns={[
            {
              title: "country",
              dataIndex: "country",
              key: "country",
              width: 300,
            },
            {
              title: "city",
              dataIndex: "city",
              key: "city",
              width: 300,
            },
            {
              title: "tier",
              dataIndex: "tier",
              key: "tier",
              width: 300,
            },
            {
              title: "range type",
              dataIndex: "rangeType",
              key: "rangeType",
              width: 300,
            },
            {
              title: "grade",
              dataIndex: "grade",
              key: "grade",
              width: 300,
            },
            {
              title: "min",
              dataIndex: "min",
              key: "min",
              width: 300,
            },
            {
              title: "mid",
              dataIndex: "mid",
              key: "mid",
              width: 300,
            },
            {
              title: "max",
              dataIndex: "max",
              key: "max",
              width: 300,
            },
            {
              title: "action",
              key: "type",
              width: 300,
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
          scroll={1300}
          pagination={false}
        />
      </Row>
    </>
  );
};

export default SalaryRange;
