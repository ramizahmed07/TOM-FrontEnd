import { FC, useState } from "react";
import { Button, Col, Input, Row } from "antd";

import { IModal } from "@/types";
import Modal from "@components/Modal";

interface IAddLegalEntity extends IModal {
  // selectedIndustry: IIndustry | null;
  // setSelectedIndustry: React.Dispatch<React.SetStateAction<IIndustry | null>>;
}

const AddLegalEntity: FC<IAddLegalEntity> = ({ isVisible, setIsVisible }) => {
  const [name, setName] = useState("");
  return (
    <Modal
      footer={[
        <Button disabled={!name} key="1" type="primary">
          {/* {isLoading || isUpdating ? (
          <LoadingOutlined className="spinner" />
        ) : ( */}
          Add
          {/* )} */}
        </Button>,
        <Button onClick={() => setIsVisible(false)} key="2">
          Cancel
        </Button>,
      ]}
      title="Add Legal Entity"
      isVisible={isVisible}
    >
      <>
        <Row className="modal__row">
          <Col span={11}>
            <label>Name of Legal Entity</label>
            <Input
              onChange={e => setName(e.target.value)}
              size="large"
              value={name}
              name="name"
              placeholder="Enter legal entity name here..."
            />
          </Col>
        </Row>

        <Row justify="space-between" className="modal__row ">
          <Col span={11}>
            <label>Business Unit</label>
            <Input size="large" disabled />
          </Col>
          <Col span={11}>
            <label>Region</label>
            <Input size="large" disabled />
          </Col>
        </Row>
        <Row className="modal__row">
          <Col span={11}>
            <label>Country</label>
            <Input size="large" disabled />
          </Col>
        </Row>
      </>
    </Modal>
  );
};

export default AddLegalEntity;
