import React from "react";
import { Button, Col, Input, Row, Select } from "antd";

import "./addBusinessUnit.less";
import Modal from "@components/Modal";
import { IModal } from "@/types";

const { Option } = Select;

export interface Industry {
  id: string;
  name: string;
  sub_industries: Array<{}>;
}

export interface Sector {
  id: string;
  name: string;
  industries: Array<Industry>;
}

export type dropdown = string | undefined;

type Payload = {
  name: string;
  sector_id?: number;
  industry_id?: number;
  sub_industry_id?: number;
};

export interface IBusinessUnit extends IModal {
  allSectorList: [];
}

const AddBusinessUnit: React.FC<IBusinessUnit> = ({
  isVisible,
  setIsVisible,
  allSectorList,
}) => {
  const [sector, setSector] = React.useState<any>(undefined);
  const [industry, setIndustry] = React.useState<dropdown>(undefined);
  const [industryList, setIndustryList] = React.useState<[]>([]);
  const [subIndustry, setSubIndustry] = React.useState<dropdown>(undefined);
  const [subIndustryList, setSubIndustryList] = React.useState<[]>([]);
  const [name, setName] = React.useState("");

  const onSubmit = () => {
    if (name.length) {
      const payload: Payload = {
        name,
      };
      sector &&
        sector.length &&
        (payload.sector_id = Number(JSON.parse(sector).id));
      industry &&
        industry.length &&
        (payload.industry_id = Number(JSON.parse(industry).id));
      subIndustry &&
        subIndustry.length &&
        (payload.sub_industry_id = Number(JSON.parse(subIndustry).id));
    }
  };

  React.useEffect(() => {
    if (sector && sector.length) {
      const { id } = JSON.parse(sector);
      allSectorList.find((sector: any) => {
        if (sector.id == id) {
          setIndustryList(sector.industries);
          setSubIndustryList([]);
          setIndustry(undefined);
          setSubIndustry(undefined);
        }
      });
    }
  }, [sector]);

  React.useEffect(() => {
    if (sector && sector.length && industry && industry.length) {
      const { sub_industries } = JSON.parse(industry);
      setSubIndustryList(sub_industries);
      setSubIndustry(undefined);
    }
  }, [industry]);

  return (
    <Modal
      footer={[
        <Button disabled={!name} key="1" type="primary" onClick={onSubmit}>
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
              onChange={e => {
                // setNameError(false)
                setName(e.target.value);
              }}
              placeholder="Enter business unit name here..."
              size="large"
              value={name}
            />
            {/* {nameError ? <span>Name is required</span> : null} */}
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
              {allSectorList.map(({ id, name, industries }: Sector) => (
                <Option
                  key={id}
                  value={JSON.stringify({ id, name, industries })}
                >
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
              {industryList.map(({ id, name, sub_industries }: Industry) => (
                <Option
                  key={id}
                  value={JSON.stringify({ id, name, sub_industries })}
                >
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
                <Option key={id} value={JSON.stringify({ id, name })}>
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
