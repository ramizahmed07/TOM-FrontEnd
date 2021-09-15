import React, { FC, useState } from "react";
import { Button, Col, Input, Row } from "antd";

import { IModal } from "@types";
import Modal from "@components/Modal";
import { ErrorServices, useAddJFMutation, useListMutation } from "@/services";

const AddJobFunction: FC<IModal> = ({ isVisible, setIsVisible }) => {
  const [getJFList] = useListMutation();
  const [jobFunction, setJobFunction] = useState("");
  const [addJF, { isLoading, isSuccess }] = useAddJFMutation();

  const onSubmit = async () => {
    try {
      await addJF({ name: jobFunction }).unwrap();
      await getJFList("").unwrap();
      closeModal();
    } catch (error) {
      ErrorServices(error);
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJobFunction(e.target.value);
  };

  const closeModal = () => {
    setIsVisible(false);
    setJobFunction("");
  };

  return (
    <Modal
      width={544}
      footer={[
        <Button
          disabled={!jobFunction || isLoading}
          onClick={onSubmit}
          key="1"
          type="primary"
          loading={isLoading}
        >
          Done
        </Button>,
        <Button onClick={closeModal} key="2">
          Cancel
        </Button>,
      ]}
      title="Add new job function"
      isVisible={isVisible}
    >
      <>
        <Row justify="space-between" className="modal__row">
          <Col span={24}>
            <label>Job Function</label>
            <Input
              value={jobFunction}
              onChange={handleInput}
              size="large"
              placeholder="Name of the job function here..."
            />
          </Col>
        </Row>
      </>
    </Modal>
  );
};

export default AddJobFunction;
