import { Button, Col, Input, Row, Select } from "antd";
import { FC, useState } from "react";

import { ModalInterface } from "@/types";
import Modal from "@/components/Modal";
import {
  SUB_JOB_FUNCTIONS,
  SubJobFunction,
} from "@components/JobFunction/AddJobFunction/config";

const { Option } = Select;

const AddJobFunction: FC<ModalInterface> = ({ isVisible, setIsVisible }) => {
  const [subJobFunctions, setSubJobFunctions] = useState<string[]>([]);
  const [jobFunction, setJobFunction] = useState("");

  const addIndustry = () => {
    console.log("added!");
    setIsVisible(false);
  };

  const handleDropdown = (value: string[]) => {
    setSubJobFunctions(value);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJobFunction(e.target.value);
  };

  return (
    <Modal
      width={544}
      footer={[
        <Button
          disabled={!jobFunction || !subJobFunctions.length}
          onClick={addIndustry}
          key="1"
          type="primary"
        >
          Done
        </Button>,
        <Button onClick={() => setIsVisible(false)} key="2">
          Cancel
        </Button>,
      ]}
      title="Add new job function"
      isVisible={isVisible}
    >
      <>
        <Row justify="space-between" className="create__row">
          <Col span={24}>
            <label>Job Function</label>
            <Input
              value={jobFunction}
              onChange={handleInput}
              className="create__input"
              size="large"
              placeholder="Name of the job function here..."
            />
          </Col>
        </Row>
        <div className="create__title">Add Sub-Job Function</div>
        <Row className="create__row">
          <Col span={24}>
            <label>Select and Search Sub-job Function</label>
            <Select
              value={subJobFunctions}
              size="large"
              showArrow
              className="create__dropdown"
              mode="multiple"
              placeholder="Select or search sub-job function from here..."
              showSearch={false}
              onChange={handleDropdown}
            >
              {SUB_JOB_FUNCTIONS.map(({ title, id, value }: SubJobFunction) => (
                <Option
                  key={id}
                  className="create__dropdown__option"
                  value={value}
                >
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

export default AddJobFunction;
