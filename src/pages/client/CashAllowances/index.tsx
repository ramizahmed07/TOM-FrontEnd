import { Col, Row } from "antd";
import { useState } from "react";

import Button from "@components/Button";
import Table from "@components/Table";
import Modal from "@components/Modal";
import UploadCashAllowance from "./UploadCashAllowance";
import { columns, versionsColumns } from "./config";

const CashAllowances = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [versionsModal, setVersionsModal] = useState(false);
  return (
    <>
      {isVisible && (
        <UploadCashAllowance
          isVisible={isVisible}
          setIsVisible={setIsVisible}
        />
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
          <div className="main-heading">Cash Allowances</div>
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
              grade: "12",
              name: "Meal",
              amount_percentage: "Percentage",
              basic: "Yes",
              value: "80%",
            },
            {
              country: "Afghanistan",
              city: "Kabul",
              grade: "11E",
              name: "Meal",
              amount_percentage: "Amount",
              basic: "80000",
              value: "Yes",
            },
            {
              country: "Pakistan",
              city: "Karachi",
              grade: "12",
              name: "Meal",
              amount_percentage: "Amount",
              basic: "Yes",
              value: "80%",
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
export default CashAllowances;
