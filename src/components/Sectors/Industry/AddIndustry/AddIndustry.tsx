import { FC, useState } from "react";
import { Button, Col, Input, Row, Select } from "antd";

import Modal from "@/components/Modal";
import { modal_interface } from "@/interfaces";
import { INDUSTRIES, Sector, SECTORS } from "../../AddSector/config";

const { Option } = Select;

interface AddIndustryProps extends modal_interface {}

const AddIndustry: FC<AddIndustryProps> = ({ isVisible, setIsVisible }) => {
  const [industries, setIndustries] = useState<any>(undefined);

  function handleChange(value: string) {
    if (value[value.length - 1] === "button") return;
    console.log({ value });
    setIndustries(value);
  }

  const addIndustry = () => {
    console.log("add industry");
  };

  return (
    <Modal
      footer={[
        <Button
          onClick={addIndustry}
          // disabled={!sector || !industries?.length}
          key="1"
          type="primary"
        >
          Done
        </Button>,
        <Button onClick={() => setIsVisible(false)} key="2">
          Cancel
        </Button>,
      ]}
      title="Create a Sector"
      isVisible={isVisible}
    >
      <>
        <Row justify="space-between" className="create__row">
          <Col span={11}>
            <label>Sector</label>
            <Input
              className="create__input"
              size="large"
              value="Energy"
              disabled
            />
          </Col>
          <Col span={11}>
            <label>Industry</label>
            <Select
              value={industries}
              size="large"
              showArrow
              className="create__dropdown"
              mode="multiple"
              placeholder="Select industry from here..."
              showSearch={false}
              // defaultValue={["a10", "c12"]}
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
        <div className="create__title">Add Sub-Industries</div>
        <Row className="create__row">
          <Col span={11}>
            <label>Select and search sub-industries</label>
            <Select
              value={industries}
              size="large"
              showArrow
              className="create__dropdown"
              mode="multiple"
              placeholder="Select industry from here..."
              showSearch={false}
              // defaultValue={["a10", "c12"]}
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

export default AddIndustry;
