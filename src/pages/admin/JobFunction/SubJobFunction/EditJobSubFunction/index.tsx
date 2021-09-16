import React, { FC, useState, useEffect } from "react";
import { Button, Col, Input, message, Row } from "antd";

import { IModal } from "@types";
import Modal from "@components/Modal";
import { ErrorServices, useEditJSFMutation } from "@services";
import { useParams } from "react-router-dom";

export interface IEditJobSubFunction extends IModal {
  jsfItem: { [key: string]: any };
  job_function_id: string | number;
  updateList: () => void;
}

const EditJobSubFunction: FC<IEditJobSubFunction> = ({
  isVisible,
  setIsVisible,
  jsfItem,
  updateList,
}) => {
  const [jobFunction, setJobFunction] = useState("");
  const [editJSF, { isLoading }] = useEditJSFMutation();
  const params: { job_id: string } = useParams();
  const id = Number(params?.job_id);

  useEffect(() => {
    setJobFunction(jsfItem.name);
  }, [jsfItem]);

  const onSubmit = async () => {
    try {
      await editJSF({
        id: jsfItem.id,
        job_function_id: id,
        name: jobFunction,
      }).unwrap();
      updateList();
      closeModal();
      message.success("Job Sub Function successfully updated");
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

export default EditJobSubFunction;
