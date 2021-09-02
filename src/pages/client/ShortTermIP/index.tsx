import { Col, Row } from "antd";
import { useState } from "react";

import Modal from "@components/Modal";
import Table from "@components/Table";
import Button from "@components/Button";
import { versionsColumns, columns } from "./config";
import AddShortTermIP from "./AddShortTermIP";
import UploadShortTermIP from "./UploadShortTermIP";

const ShortTermIP = () => {
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
        <AddShortTermIP isVisible={isVisible} setIsVisible={setIsVisible} />
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
          <div className="main-heading">Short Term Incentive Plans</div>
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
            STI Data
          </Button>
          <Button
            onClick={() => setIsVisible(true)}
            variant="versions"
            icon={false}
          >
            Create STI Plan
          </Button>
        </Col>
      </Row>
      <Row>
        <Table
          data={[
            {
              type: "Annual Bonus",
              name: "EIP",
              gradeEligibility: "14, 18, 24B, 24G, 21E",
              coverage: "Global",
            },
            {
              type: "Annual Bonus",
              name: "Paymix",
              gradeEligibility: "All",
              coverage: "Australia | Korea",
            },
            {
              type: "Annual Bonus",
              name: "Commision",
              gradeEligibility: "24G, 21E",
              coverage: "Australia | Korea",
            },
          ]}
          columns={columns}
          // scroll={1300}
          pagination={false}
        />
      </Row>
    </>
  );
};

export default ShortTermIP;
