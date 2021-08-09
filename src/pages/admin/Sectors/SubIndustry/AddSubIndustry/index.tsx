import { FC, useState } from "react";
import { Button, Col, Input, message, Row } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import Modal from "@components/Modal";
import { showSuccessPopup } from "@utils";
import { IModal } from "@/types";
import {
  useCreateSectorMutation,
  useCreateSubIndustryMutation,
} from "@services";
import { useParams } from "react-router-dom";

interface AddSubIndustryProps extends IModal {}

const AddSubIndustry: FC<AddSubIndustryProps> = ({
  isVisible,
  setIsVisible,
}) => {
  const [subIndustry, setSubIndustry] = useState({
    name: "",
    description: null,
  });
  const [createSubIndustry, { isLoading }] = useCreateSubIndustryMutation();
  const { industry_id } = useParams<{ industry_id: string }>();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSubIndustry(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

  const addSubIndustry = async () => {
    try {
      await createSubIndustry({
        ...subIndustry,
        industry_id: +industry_id,
      }).unwrap();
      setIsVisible(false);
      showSuccessPopup({
        title: "New Sub-Industry Created",
        desc: "You have successfully created new sub-industry.",
      });
    } catch (error) {
      message.error(error?.message);
      console.log(error);
    }
  };

  return (
    <Modal
      footer={[
        <Button
          onClick={addSubIndustry}
          disabled={!subIndustry.name.length}
          key="1"
          type="primary"
        >
          {isLoading ? (
            <LoadingOutlined className="spinner" />
          ) : (
            "Add Sub-Industry"
          )}
        </Button>,
        <Button onClick={() => setIsVisible(false)} key="2">
          Cancel
        </Button>,
      ]}
      title="Create a Sub-Industry"
      isVisible={isVisible}
    >
      <>
        <Row className="modal__row">
          <Col span={11}>
            <label>Name</label>
            <Input
              size="large"
              name="name"
              value={subIndustry.name}
              onChange={handleInputChange}
              placeholder="Enter sub-industry name here..."
            />
          </Col>
        </Row>
        <Row className="modal__row">
          <Col span={11}>
            <label>Description</label>
            <Input
              size="large"
              name="description"
              value={subIndustry.description || ""}
              onChange={handleInputChange}
              placeholder="Enter description here..."
            />
          </Col>
        </Row>
      </>
    </Modal>
  );
};

export default AddSubIndustry;
