import { FC } from "react";
import { Button, Col, Input, Row, Select } from "antd";

import { IModal } from "@/types";
import Modal from "@components/Modal";
import { showSuccessPopup } from "@/utils";

const { Option } = Select;

interface IAddShortTermIP extends IModal {}

const AddShortTermIP: FC<IAddShortTermIP> = ({ isVisible, setIsVisible }) => {
  const handleSubmit = () => {
    setIsVisible(false);
    showSuccessPopup({
      title: "Short Team Incentives Plan Created!",
      desc: "You have successfully created new short term plan.",
      role: "client",
    });
  };

  return (
    <Modal
      footer={[
        <Button onClick={handleSubmit} key="1" type="primary">
          Create
        </Button>,
        <Button onClick={() => setIsVisible(false)} key="2">
          Cancel
        </Button>,
      ]}
      title="Create a STI Plan"
      isVisible={isVisible}
    >
      <>
        <Row
          justify="space-between"
          className="modal__row modal__bottomBorder mb-24"
        >
          <Col span={11}>
            <label>Plan Name</label>
            <Input size="large" placeholder="Enter plan name here..." />
          </Col>
          <Col span={11}>
            <label>Plan Type</label>
            <Select size="large" placeholder="Select plan type from here...">
              {[{ type: "New incentive plan", id: 1 }].map(
                ({ id, type }: any) => (
                  <Option key={id} value={type}>
                    {type}
                  </Option>
                )
              )}
            </Select>
          </Col>
        </Row>
        <div className="sub-heading mb-32">Choose Salary Range Duration</div>
        <Row justify="space-between" className="modal__row">
          <Col span={11}>
            <label>Select Grades</label>
            <Select
              mode="multiple"
              size="large"
              placeholder="Select grade from here..."
            >
              {[{ grade: "12E", id: 1 }].map(({ id, grade }: any) => (
                <Option key={id} value={grade}>
                  {grade}
                </Option>
              ))}
            </Select>
          </Col>
          <Col span={11}>
            <label>Select Coverages</label>
            <Select
              mode="multiple"
              size="large"
              placeholder="Select coverage from here..."
            >
              {[{ coverage: "coverage 1", id: 1 }].map(
                ({ id, coverage }: any) => (
                  <Option key={id} value={coverage}>
                    {coverage}
                  </Option>
                )
              )}
            </Select>
          </Col>
        </Row>
      </>
    </Modal>
  );
};

export default AddShortTermIP;
