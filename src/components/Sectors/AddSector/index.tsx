import { FC, useState } from "react";
import { Button, Col, Row, Select } from "antd";

import Modal from "@/components/Modal";
import { INDUSTRIES, Sector, SECTORS } from "./config";
import { showSuccessPopup } from "@/utils";
import { modal_interface } from "@/interfaces";

const { Option } = Select;

interface AddSectorProps extends modal_interface {}

const AddSector: FC<AddSectorProps> = ({ isVisible, setIsVisible }) => {
  const [sector, setSector] = useState<undefined | string>(undefined);
  const [industries, setIndustries] = useState<any>(undefined);

  function onChange(value: string) {
    if (value === "button") return;
    setSector(value);
  }

  function handleChange(value: string) {
    if (value[value.length - 1] === "button") return;
    console.log({ value });
    setIndustries(value);
  }

  const addSector = () => {
    setIsVisible(false);
    showSuccessPopup({
      title: "New Sector Created",
      desc: "You have successfully created new sector.",
    });
  };

  return (
    <Modal
      footer={[
        <Button
          onClick={addSector}
          disabled={!sector || !industries?.length}
          key="1"
          type="primary"
        >
          Add Sector
        </Button>,
        <Button onClick={() => setIsVisible(false)} key="2">
          Cancel
        </Button>,
      ]}
      title="Create a Sector"
      isVisible={isVisible}
    >
      <>
        <Row className="create__row">
          <Col span={11}>
            <label>Select a sector</label>
            <Select
              value={sector}
              size="large"
              className="create__dropdown"
              placeholder="Select sector from here..."
              onChange={onChange}
            >
              {SECTORS.map(({ title, id, value }: Sector) => (
                <Option
                  key={id}
                  className="create__dropdown__option"
                  value={value}
                >
                  {title}
                </Option>
              ))}
              <Option value="button">
                <div
                  className="create__dropdown__option create__dropdown__option--btn"
                  onMouseDown={() => console.log("Add new industry")}
                >
                  Add new industry
                </div>
              </Option>
            </Select>
          </Col>
        </Row>
        <div className="create__title">Choose Industry</div>
        <Row className="create__row">
          <Col span={11}>
            <label>Select industry</label>
            <Select
              value={industries}
              size="large"
              showArrow
              className="create__dropdown"
              mode="multiple"
              placeholder="Select industry from here..."
              showSearch={false}
              onChange={handleChange}
            >
              {INDUSTRIES.map(({ title, id, value }: Sector) => (
                <Option
                  key={id}
                  className="create__dropdown__option"
                  value={value}
                >
                  {title}
                </Option>
              ))}
              <Option value="button">
                <div
                  className="create__dropdown__option create__dropdown__option--btn"
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

export default AddSector;
