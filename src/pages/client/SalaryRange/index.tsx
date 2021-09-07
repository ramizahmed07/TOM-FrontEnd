import { Col, Row } from "antd";
import { useState } from "react";

import UploadSalaryRange from "./UploadSalaryRange";
import Button from "@components/Button";
import Table from "@components/Table";
import Modal from "@components/Modal";
import { columns, versionsColumns } from "./config";

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
          columns={versionsColumns}
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
          columns={columns}
          scroll={1300}
          pagination={false}
        />
      </Row>
    </>
  );
};

export default SalaryRange;
