import React from "react";
import { Button, Col, Input, Row, Select } from "antd";

import "./addBusinessUnit.less";
import Modal from "@components/Modal";
import { IModal } from "@/types";
import { Sector, SECTORS, INDUSTRIES, dropdown } from "./config";

const { Option } = Select;

const AddBusinessUnit: React.FC<IModal> = ({ isVisible, setIsVisible }) => {
  const [sector, setSector] = React.useState<dropdown>(undefined);
  const [industry, setIndustry] = React.useState<dropdown>(undefined);
  const [subIndustry, setSubIndustry] = React.useState<dropdown>(undefined);
  const [unitName, setUnitName] = React.useState("");

  return (
    <Modal
      footer={[
        <Button
          // onClick={addSector}
          disabled={!sector || !industry || !unitName || !subIndustry}
          key="1"
          type="primary"
        >
          Add Sector
        </Button>,
        <Button key="2" onClick={() => setIsVisible(false)}>
          Cancel
        </Button>,
      ]}
      title="Create a Business Unit"
      isVisible={isVisible}
    >
      <>
        <Row className="modal__row">
          <Col span={11}>
            <label>Name of a business unit</label>
            <Input
              onChange={e => setUnitName(e.target.value)}
              placeholder="Enter business unit name here..."
              size="large"
              value={unitName}
            />
          </Col>
        </Row>
        <div className="sub-heading mb-32">Choose Sector & Industry</div>
        <Row className="mb-32">
          <Col span={11}>
            <label>Select a sector</label>
            <Select
              value={sector}
              size="large"
              placeholder="Select sector from here..."
              onChange={val => setSector(val)}
            >
              {SECTORS.map(({ title, id, value }: Sector) => (
                <Option key={id} value={value}>
                  {title}
                </Option>
              ))}
            </Select>
          </Col>
        </Row>
        <Row justify="space-between">
          <Col span={11}>
            <label>Select industry</label>
            <Select
              value={industry}
              size="large"
              showArrow
              placeholder="Select industry from here..."
              showSearch={false}
              onChange={val => setIndustry(val)}
            >
              {INDUSTRIES.map(({ title, id, value }: Sector) => (
                <Option key={id} value={value}>
                  {title}
                </Option>
              ))}
            </Select>
          </Col>
          <Col span={11}>
            <label>Select Sub-Industry</label>
            <Select
              value={subIndustry}
              size="large"
              showArrow
              placeholder="Select sub-industry from here..."
              showSearch={false}
              onChange={val => setSubIndustry(val)}
            >
              {INDUSTRIES.map(({ title, id, value }: Sector) => (
                <Option key={id} value={value}>
                  {title}
                </Option>
              ))}
            </Select>
          </Col>
        </Row>
      </>
    </Modal>
  );
};

export default AddBusinessUnit;
