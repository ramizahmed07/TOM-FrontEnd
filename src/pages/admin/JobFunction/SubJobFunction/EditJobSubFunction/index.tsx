import React, { FC, useState, useEffect } from "react";
import { Button, Col, Input, message, Row } from "antd";
import { useSelector } from "react-redux";

import { IModal } from "@/types";
import Modal from "@components/Modal";
import { useEditJFMutation, useEditJSFMutation, useListMutation } from "@services";
import { ICombineReducerProps } from "@store";
import { IJobFunctionReducer } from "@/store/job-function/job.function.types";
import { ISubJobFunctionReducer } from "@/store/sub-job-function/sub.job.function.types";

export interface IEditJobSubFunction extends IModal {
    editJsfId?: string;
    job_function_id: string | number;
}

const id = 21

const EditJobSubFunction: FC<IEditJobSubFunction> = ({ isVisible, setIsVisible, editJsfId }) => {
    const jfsReducer: ISubJobFunctionReducer = useSelector((state: ICombineReducerProps) => state.subJobFunction);
    const [getJFList] = useListMutation();
    const [jobFunction, setJobFunction] = useState('');
    const [editJSF, { isLoading }] = useEditJSFMutation();

    useEffect(() => {
        setJobFunction(jfsReducer.jsf.name);
    }, [jfsReducer.jsf.name]);

    const onSubmit = async () => {
        try {
            await editJSF({ id: jfsReducer.jsf.id, job_function_id: id, name: jobFunction }).unwrap();
            await getJFList('');
            closeModal();
            message.success('Job Sub Function successfully updated')
        } catch (error) {
            // console.log(e);
            message.error(error?.message);
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

export default EditJobSubFunction;
