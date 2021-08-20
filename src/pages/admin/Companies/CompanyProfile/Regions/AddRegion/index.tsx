import React, { useState } from "react";
import { Button, Col, Input, Row, Select } from "antd";

import Modal from "@components/Modal";
import { IModal } from "@/types";
import { Sector, SECTORS, INDUSTRIES } from "./config";
import { useTypedSelector } from "@hooks";
import { ICountry } from "@/store/countries";

const { Option } = Select;

const AddRegion: React.FC<IModal> = ({ isVisible, setIsVisible }) => {
  const [name, setName] = useState("");
  const [countries, setCountries] = useState<string[]>([]);
  const [businessUnits, setBusinessUnits] = useState<string[]>([]);
  const { countries: countriesList } = useTypedSelector(
    state => state.countries
  );
  console.log(countriesList);

  return (
    <Modal
      footer={[
        <Button disabled={!name.length} key="1" type="primary">
          Create Region
        </Button>,
        <Button key="2" onClick={() => setIsVisible(false)}>
          Cancel
        </Button>,
      ]}
      title="Create a Region"
      isVisible={isVisible}
    >
      <>
        <Row className="modal__row">
          <Col span={11}>
            <label>Name of a region</label>
            <Input
              onChange={e => setName(e.target.value)}
              placeholder="Enter business unit name here..."
              size="large"
              value={name}
            />
          </Col>
        </Row>
        <div className="sub-heading mb-32">
          Add Countries and Business Units
        </div>

        <Row justify="space-between">
          <Col span={11}>
            <label>Select and search countries</label>
            <Select
              value={countries}
              size="large"
              showArrow
              mode="multiple"
              placeholder="Select countries from here..."
              showSearch={false}
              onChange={val => setCountries(val)}
            >
              {countriesList.map(({ name, id }: ICountry) => (
                <Option key={id} value={name}>
                  {name}
                </Option>
              ))}
            </Select>
          </Col>
          <Col span={11}>
            <label>Select business units</label>
            <Select
              value={businessUnits}
              size="large"
              showArrow
              mode="multiple"
              placeholder="Select business units from here..."
              showSearch={false}
              onChange={val => setBusinessUnits(val)}
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

export default AddRegion;
