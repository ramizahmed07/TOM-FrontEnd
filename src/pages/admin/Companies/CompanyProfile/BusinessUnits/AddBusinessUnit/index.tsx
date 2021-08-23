import React from "react";
import { Button, Col, Input, Row, Select } from "antd";

import "./addBusinessUnit.less";
import Modal from "@components/Modal";
import { IModal } from "@/types";

const { Option } = Select;
export interface Sector {
  id: string;
  name: string;
}

export type dropdown = string | undefined;

export interface IBusinessUnit extends IModal {
  sectorList: Array<Sector>;
  industryList: Array<Sector>;
  subIndustryList: Array<Sector>;
}

const AddBusinessUnit: React.FC<IBusinessUnit> = ({
  isVisible,
  setIsVisible,
  sectorList,
  industryList,
  subIndustryList,
}) => {
  const [sector, setSector] = React.useState<dropdown>(undefined);
  const [industry, setIndustry] = React.useState<dropdown>(undefined);
  const [subIndustry, setSubIndustry] = React.useState<dropdown>(undefined);
  const [unitName, setUnitName] = React.useState("");

  const onSubmit = () => {
    const payload = {
      sector,
      industry,
      subIndustry,
      unitName,
    };
    console.log(payload);
  };

  return (
    <Modal
      footer={[
        <Button
          // onClick={addSector}
          disabled={!sector || !industry || !unitName || !subIndustry}
          key="1"
          type="primary"
          onClick={() => onSubmit()}
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
              {sectorList.map(({ id, name }: Sector) => (
                <Option key={id} value={name}>
                  {name}
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
              {industryList.map(({ id, name }: Sector) => (
                <Option key={id} value={name}>
                  {name}
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
              {subIndustryList.map(({ id, name }: Sector) => (
                <Option key={id} value={name}>
                  {name}
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
