import { useParams } from "react-router-dom";
import { FC, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Button, Col, Input, message, Row } from "antd";

import Modal from "@components/Modal";
import { IModal } from "@/types";
import { showSuccessPopup } from "@utils";
import {
  useCreateIndustryMutation,
  useUpdateIndustryMutation,
} from "@services";
import { IIndustry } from "@store/sectors";
import { useEffect } from "react";

interface AddIndustryProps extends IModal {
  selectedIndustry: IIndustry | null;
  setSelectedIndustry: React.Dispatch<React.SetStateAction<IIndustry | null>>;
}

const AddIndustry: FC<AddIndustryProps> = ({
  isVisible,
  setIsVisible,
  selectedIndustry,
  setSelectedIndustry,
}) => {
  const [industry, setIndustry] = useState<Partial<IIndustry>>({
    name: "",
    description: null,
  });
  const { sector_id } = useParams<{ sector_id: string }>();
  const [createIndustry, { isLoading }] = useCreateIndustryMutation();
  const [updateIndustry, { isLoading: isUpdating }] =
    useUpdateIndustryMutation();

  useEffect(() => {
    if (selectedIndustry) {
      setIndustry(selectedIndustry);
    }
    return () => {
      setSelectedIndustry(null);
    };
  }, [selectedIndustry, setSelectedIndustry]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setIndustry(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

  const handleSubmit = async () => {
    try {
      if (selectedIndustry) {
        await editIndustry();
      } else {
        await addIndustry();
      }
      setIsVisible(false);
      showSuccessPopup({
        title: selectedIndustry ? "Industry Updated!" : "New Industry Created",
        desc: `You have successfully ${
          selectedIndustry ? "updated the" : "created new"
        } industry.`,
      });
    } catch (error) {
      message.error(error?.message);
      console.log(error);
    }
  };

  const addIndustry = async () =>
    await createIndustry({ ...industry, sector_id: +sector_id }).unwrap();

  const editIndustry = async () => {
    console.log("indust", industry);
    await updateIndustry({ ...industry, sector_id }).unwrap();
  };

  return (
    <Modal
      footer={[
        <Button onClick={handleSubmit} key="1" type="primary">
          {isLoading || isUpdating ? (
            <LoadingOutlined className="spinner" />
          ) : (
            "Done"
          )}
        </Button>,
        <Button onClick={() => setIsVisible(false)} key="2">
          Cancel
        </Button>,
      ]}
      title="Create an Industry"
      isVisible={isVisible}
    >
      <>
        <Row className="modal__row">
          <Col span={11}>
            <label>Name</label>
            <Input
              size="large"
              name="name"
              value={industry.name}
              onChange={handleInputChange}
              placeholder="Enter industry name here..."
            />
          </Col>
        </Row>
        <Row className="modal__row">
          <Col span={11}>
            <label>Description</label>
            <Input
              size="large"
              name="description"
              value={industry.description || ""}
              onChange={handleInputChange}
              placeholder="Enter description here..."
            />
          </Col>
        </Row>
      </>
    </Modal>
  );
};

export default AddIndustry;
