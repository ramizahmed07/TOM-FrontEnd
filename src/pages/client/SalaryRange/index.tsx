import { Col, Row } from "antd";
import { useState } from "react";

import UploadSalaryRange from "./UploadSalaryRange";
import Button from "@components/Button";
import Table from "@components/Table";
import Modal from "@components/Modal";

const SalaryRange = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [versionsModal, setVersionsModal] = useState(false);

  return (
    <>
      {isVisible && (
        <UploadSalaryRange isVisible={isVisible} setIsVisible={setIsVisible} />
      )}
      <Modal
        mode="versions"
        footer={null}
        title="Previous Versions of Salary Range"
        isVisible={versionsModal}
        width={855}
        setIsVisible={setVersionsModal}
      >
        <Table
          data={[
            {
              name: "2019_salary_range.xls",
              duration: "2019-2020",
              date: "29th-may-2019",
            },
            {
              name: "2020_salary_range.xls",
              duration: "2020-2021",
              date: "29th-june-2020",
            },
          ]}
          columns={[
            {
              title: "file name",
              dataIndex: "name",
              key: "name",
              width: "30%",
            },
            {
              title: "duration",
              dataIndex: "duration",
              key: "duration",
              width: "25%",
            },
            {
              title: "upload date",
              dataIndex: "date",
              key: "date",
              width: "30%",
            },
            {
              title: "action",
              key: "action",
              width: "15%",
              align: "center",
              render: () => (
                <div className="table__action__btn table__action__btn--client">
                  Download
                </div>
              ),
            },
          ]}
          pagination={false}
        />
      </Modal>
      <Row>
        <Col span={24}>
          <div className="main-heading">Salary Range</div>
        </Col>
      </Row>
      <Row className="mt-16 mb-20">
        <Col className="align-start" span={16}>
          <Button onClick={() => setIsVisible(true)} variant="upload_client">
            Upload
          </Button>
          <Button variant="download_client">Download</Button>
          <Button
            onClick={() => setVersionsModal(true)}
            variant="versions"
            icon={false}
          >
            Versions
          </Button>
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
          ]}
          scroll={1300}
          pagination={false}
        />
      </Row>
    </>
  );
};

export default SalaryRange;
