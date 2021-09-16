import { FC, useState } from "react";
import { Button, Col, Input, message, Row } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import Modal from "@components/Modal";
import { showSuccessPopup } from "@utils";
import {
  useCreateSubIndustryMutation,
  useUpdateSubIndustryMutation,
} from "@services";
import { useParams } from "react-router-dom";
import { ISubIndustry, IModal } from "@types";
import { useEffect } from "react";

interface AddSubIndustryProps extends IModal {
  selectedSubIndustry: ISubIndustry | null;
  setSelectedSubIndustry: React.Dispatch<
    React.SetStateAction<ISubIndustry | null>
  >;
}

const AddSubIndustry: FC<AddSubIndustryProps> = ({
  isVisible,
  setIsVisible,
  selectedSubIndustry,
  setSelectedSubIndustry,
}) => {
  const [subIndustry, setSubIndustry] = useState<Partial<ISubIndustry>>({
    name: "",
  });
  const [createSubIndustry, { isLoading }] = useCreateSubIndustryMutation();
  const [updateSubIndustry, { isLoading: isUpdating }] =
    useUpdateSubIndustryMutation();
  const { industry_id } = useParams<{ industry_id: string }>();

  useEffect(() => {
    if (selectedSubIndustry) {
      setSubIndustry(selectedSubIndustry);
    }
    return () => {
      setSelectedSubIndustry(null);
    };
  }, [selectedSubIndustry, setSelectedSubIndustry]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSubIndustry(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

  const handleSubmit = async () => {
    console.log(subIndustry);

    try {
      if (selectedSubIndustry) {
        await editSubIndustry();
      } else {
        await addSubIndustry();
      }
      setIsVisible(false);
      showSuccessPopup({
        title: selectedSubIndustry
          ? "Sub-Industry Updated!"
          : "New Sub-Industry Created",
        desc: `You have successfully ${
          selectedSubIndustry ? "updated the" : "created new"
        } sub-industry.`,
      });
    } catch (error) {
      message.error(error?.message);
      console.log(error);
    }
  };

  const addSubIndustry = async () =>
    await createSubIndustry({
      ...subIndustry,
      industry_id: +industry_id,
    }).unwrap();

  const editSubIndustry = async () =>
    await updateSubIndustry({
      ...subIndustry,
      industry_id: +industry_id,
    }).unwrap();

  return (
    <Modal
      width={544}
      footer={[
        <Button
          onClick={handleSubmit}
          disabled={!subIndustry?.name?.length}
          key="1"
          type="primary"
        >
          {isLoading || isUpdating ? (
            <LoadingOutlined className="spinner" />
          ) : selectedSubIndustry ? (
            "Update Sub-Industry"
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
          <Col span={24}>
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
      </>
    </Modal>
  );
};

export default AddSubIndustry;
