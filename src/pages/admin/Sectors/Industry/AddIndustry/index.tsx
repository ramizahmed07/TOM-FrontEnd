import { FC, useState } from "react";
import { Button, Col, Input, Row, Select } from "antd";

import Modal from "@components/Modal";
import { IModal } from "@/types";
import { INDUSTRIES, Sector } from "../../AddSector/config";

const { Option } = Select;

interface AddIndustryProps extends IModal {}

const AddIndustry: FC<AddIndustryProps> = ({ isVisible, setIsVisible }) => {
  const [industries, setIndustries] = useState<any>(undefined);

  function handleChange(value: string) {
    if (value[value.length - 1] === "button") return;
    setIndustries(value);
  }

  const addIndustry = () => {
    console.log("add industry");
  };

  return (
    <Modal
      footer={[
        <Button onClick={addIndustry} key="1" type="primary">
          Done
        </Button>,
        <Button onClick={() => setIsVisible(false)} key="2">
          Cancel
        </Button>,
      ]}
      title="Create an Industry"
      isVisible={isVisible}
    >
      <>
        <Row justify="space-between" className="modal__row">
          <Col span={11}>
            <label>Sector</label>
            <Input size="large" value="Energy" disabled />
          </Col>
          <Col span={11}>
            <label>Industry</label>
            <Select
              value={industries}
              size="large"
              showArrow
              mode="multiple"
              placeholder="Select industry from here..."
              showSearch={false}
              onChange={handleChange}
            >
              {INDUSTRIES.map(({ title, id, value }: Sector) => (
                <Option key={id} value={value}>
                  {title}
                </Option>
              ))}
              <Option value="button">
                <div
                  className="link"
                  onMouseDown={() => console.log("Add new industry")}
                >
                  Add new industry
                </div>
              </Option>
            </Select>
          </Col>
        </Row>
        <div className="sub-heading">Add Sub-Industries</div>
        <Row className="modal__row">
          <Col span={11}>
            <label>Select and search sub-industries</label>
            <Select
              value={industries}
              size="large"
              showArrow
              mode="multiple"
              placeholder="Select industry from here..."
              showSearch={false}
              onChange={handleChange}
            >
              {INDUSTRIES.map(({ title, id, value }: Sector) => (
                <Option key={id} value={value}>
                  {title}
                </Option>
              ))}
              <Option value="button">
                <div
                  className="link"
                  onMouseDown={() => console.log("Add new industry")}
                >
                  Add new industry
                </div>
              </Option>
            </Select>
          </Col>
        </Row>
      </>
    </Modal>
  );
};

export default AddIndustry;
