import { FC } from "react";
import { Button, Col, Input, Row, Select } from "antd";

import { IModal } from "@/types";
import Modal from "@components/Modal";
import { showSuccessPopup } from "@/utils";

const { Option } = Select;

interface IAddLongTermIP extends IModal {}

const AddLongTermIP: FC<IAddLongTermIP> = ({ isVisible, setIsVisible }) => {
  const handleSubmit = () => {
    setIsVisible(false);
    showSuccessPopup({
      title: "Long Team Incentives Plan Created!",
      desc: "You have successfully created new long term plan.",
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
      title="Create LTI Plan"
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
            <label>Installments</label>
            <Select
              size="large"
              placeholder="Select installment type from here..."
            >
              {[
                { type: "Installment-1", id: 1 },
                { type: "Installment-2", id: 2 },
              ].map(({ id, type }: any) => (
                <Option key={id} value={type}>
                  {type}
                </Option>
              ))}
            </Select>
          </Col>
        </Row>
        <div className="sub-heading mb-32">Choose Stock and Vesting Type</div>
        <Row
          justify="space-between"
          className="modal__row modal__bottomBorder mb-24"
        >
          <Col span={11}>
            <label>Type of Stock</label>
            <Input size="large" placeholder="Enter stock type name here..." />
          </Col>
          <Col span={11}>
            <label>Vesting Type</label>
            <Select size="large" placeholder="Select stock type from here...">
              {[
                { type: "Type-1", id: 1 },
                { type: "Type-2", id: 2 },
              ].map(({ id, type }: any) => (
                <Option key={id} value={type}>
                  {type}
                </Option>
              ))}
            </Select>
          </Col>
        </Row>
        <div className="sub-heading mb-32">Select Grade and Equity Type</div>
        <Row justify="space-between" className="modal__row">
          <Col span={11}>
            <label>Select Grades</label>
            <Select size="large" placeholder="Select grades from here...">
              {[
                { grade: "Grade-1", id: 1 },
                { grade: "Grade-2", id: 2 },
              ].map(({ id, grade }: any) => (
                <Option key={id} value={grade}>
                  {grade}
                </Option>
              ))}
            </Select>
          </Col>
          <Col span={11}>
            <label>Equity Type</label>
            <Select size="large" placeholder="Select equity type from here...">
              {[
                { type: "Equity-1", id: 1 },
                { type: "Equity-2", id: 2 },
              ].map(({ id, type }: any) => (
                <Option key={id} value={type}>
                  {type}
                </Option>
              ))}
            </Select>
          </Col>
        </Row>
        <Row justify="space-between" className="modal__row">
          <Col span={11}>
            <label>Holding Period (In Years):</label>
            <Select
              size="large"
              placeholder="Select holding period from here..."
            >
              {[
                { period: "Period-1", id: 1 },
                { period: "Period-2", id: 2 },
              ].map(({ id, period }: any) => (
                <Option key={id} value={period}>
                  {period}
                </Option>
              ))}
            </Select>
          </Col>
          <Col span={11}>
            <label>Date of Grant</label>
            <Input size="large" placeholder="test" />
          </Col>
        </Row>
      </>
    </Modal>
  );
};

export default AddLongTermIP;
