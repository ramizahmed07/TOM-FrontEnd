import React, { FC, useState, useEffect } from "react";
import { Button, Col, Input, Row } from "antd";
import { useSelector } from "react-redux";

import { IModal } from "@/types";
import Modal from "@components/Modal";
import { useEditJFMutation, useListMutation } from "@services";
import { ICombineReducerProps } from "@store";
import { IJobFunctionReducer } from "@/store/job-function/job.function.types";

export interface IEditJobFunction extends IModal {
    editJfId?: string;
}

const EditJobFunction: FC<IEditJobFunction> = ({ isVisible, setIsVisible, editJfId }) => {
    const jfReducer: IJobFunctionReducer = useSelector((state: ICombineReducerProps) => state.jobFunction);
    const [getJFList] = useListMutation();
    const [jobFunction, setJobFunction] = useState('');
    const [editJF, { isLoading }] = useEditJFMutation();

    useEffect(() => {
        setJobFunction(jfReducer.jobFunctionItem.name);
    }, [jfReducer.jobFunctionItem.name]);

    const onSubmit = async () => {
        try {
            await editJF({ id: editJfId, name: jobFunction }).unwrap();
            await getJFList('');
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
