import React, { FC, useState } from "react";
import { Button, Col, Input, Row } from "antd";

import { IModal } from "@/types";
import Modal from "@components/Modal";
import { useAddJFMutation, useAddJSFMutation, useListMutation } from "@/services";
export interface IAddJobSubFunction extends IModal {
    job_function_id: string | number;
    updateList: () => void;
}

const AddJobSubFunction: FC<IAddJobSubFunction> = ({ isVisible, setIsVisible, job_function_id, updateList }) => {
    const [getJFList] = useListMutation();
    const [jobFunction, setJobFunction] = useState("");
    const [addJSF, { isLoading, isSuccess }] = useAddJSFMutation();
    const onSubmit = async () => {
        try {
            await addJSF({ name: jobFunction, job_function_id }).unwrap();
            await getJFList('');
            updateList();
            closeModal();
        } catch (e) {
            console.log(e);
        }
    };

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setJobFunction(e.target.value);
    };

    const closeModal = () => {
        setIsVisible(false);
        setJobFunction("");
    }

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
            title="Add new job sub function"
            isVisible={isVisible}
        >
            <>
                <Row justify="space-between" className="modal__row">
                    <Col span={24}>
                        <label>Job Sub Function</label>
                        <Input
                            value={jobFunction}
                            onChange={handleInput}
                            size="large"
                            placeholder="Name of the job sub function here..."
                        />
                    </Col>
                </Row>
            </>
        </Modal>
    );
};

export default AddJobSubFunction;
