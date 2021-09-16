import React, { FC, useState, useEffect } from "react";
import { Button, Col, Input, Row } from "antd";

import { IModal } from "@types";
import Modal from "@components/Modal";
import { ErrorServices, useEditJFMutation, useListMutation } from "@services";

export interface IEditJobFunction extends IModal {
  jfItem: { [key: string]: any };
}

const EditJobFunction: FC<IEditJobFunction> = ({
  isVisible,
  setIsVisible,
  jfItem,
}) => {
  const [getJFList] = useListMutation();
  const [jobFunction, setJobFunction] = useState("");
  const [editJF, { isLoading }] = useEditJFMutation();

  useEffect(() => {
    setJobFunction(jfItem.name);
  }, [jfItem]);

  const onSubmit = async () => {
    try {
      await editJF({ id: jfItem.id, name: jobFunction }).unwrap();
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
          Update
        </Button>,
        <Button onClick={closeModal} key="2">
          Cancel
        </Button>,
      ]}
      title="Edit job function"
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

export default EditJobFunction;
