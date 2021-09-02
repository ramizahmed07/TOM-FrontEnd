import { Col, Row } from "antd";
import { useState } from "react";

import Modal from "@components/Modal";
import Table from "@components/Table";
import Button from "@components/Button";
import { versionsColumns, columns } from "./config";
import AddLongTermIP from "./AddLongTermIP";
import UploadShortTermIP from "./UploadShortTermIP";

const LongTermIP = () => {
  const [versionsModal, setVersionsModal] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isUploadModal, setIsUploadModal] = useState(false);

  return (
    <>
      {isUploadModal && (
        <UploadShortTermIP
          isVisible={isUploadModal}
          setIsVisible={setIsUploadModal}
        />
      )}
      {isVisible && (
        <AddLongTermIP isVisible={isVisible} setIsVisible={setIsVisible} />
      )}

      <Modal
        mode="versions"
        footer={null}
        title="Previous Versions of Cash Allowances"
        isVisible={versionsModal}
        width={855}
        setIsVisible={setVersionsModal}
      >
        <Table
          data={[
            {
              name: "2019_salary_range.xls",
              date: "29th-may-2019",
            },
            {
              name: "2020_salary_range.xls",
              date: "11th-may-2019",
            },
          ]}
          columns={versionsColumns}
          pagination={false}
        />
      </Modal>

      <Row>
        <Col span={24}>
          <div className="main-heading">Long Term Incentive Plans</div>
        </Col>
      </Row>
      <Row className="mt-16 mb-20">
        <Col className="align-start" span={16}>
          <Button
            onClick={() => setIsUploadModal(true)}
            variant="upload_client"
          >
            Upload
          </Button>
          <Button variant="download_client">Download</Button>
          <Button
            onClick={() => setVersionsModal(true)}
            icon={false}
            variant="download_client"
          >
            LTI Data
          </Button>
          <Button
            onClick={() => setIsVisible(true)}
            variant="versions"
            icon={false}
          >
            Create LTI Plan
          </Button>
        </Col>
      </Row>
      <Row>
        <Table
          data={[
            {
              type: "RSU",
              name: "New Hire",
              grade: "All",
              holdingPeriod: "4 years",
              vestingType: "Installment",
              installmentType: "Annually",
              date: "1st April",
              equityType: "Amount",
            },
            {
              type: "RSU",
              name: "Annual",
              grade: "23, 28, 33, 39",
              holdingPeriod: "2 years",
              vestingType: "Cliff",
              installmentType: "Quaterly",
              date: "2nd April",
              equityType: "Unit",
            },
          ]}
          columns={columns}
          pagination={false}
        />
      </Row>
    </>
  );
};

export default LongTermIP;
