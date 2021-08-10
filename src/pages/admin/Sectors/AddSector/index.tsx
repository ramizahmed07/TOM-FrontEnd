import { FC, useState } from "react";
import { Button, Col, Input, message, Row } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import Modal from "@components/Modal";
import { showSuccessPopup } from "@utils";
import { IModal } from "@/types";
import { useCreateSectorMutation } from "@services";
import { ISector } from "@store/sectors";
import { useEffect } from "react";

interface AddSectorProps extends IModal {
  selectedSector: ISector | null;
}

const AddSector: FC<AddSectorProps> = ({
  isVisible,
  setIsVisible,
  selectedSector,
}) => {
  const [sector, setSector] = useState({
    name: "",
    description: null,
  });
  const [createSector, { isLoading }] = useCreateSectorMutation();

  // useEffect(() => {
  //   if(selectedSector) {
  //     setSector(selectedSector)
  //   }
  // }, [selectedSector])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSector(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  console.log("BRO", selectedSector);
  const addSector = async () => {
    try {
      await createSector(sector).unwrap();
      setIsVisible(false);
      showSuccessPopup({
        title: "New Sector Created",
        desc: "You have successfully created new sector.",
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
          onClick={addSector}
          disabled={!sector?.name?.length}
          key="1"
          type="primary"
        >
          {isLoading ? <LoadingOutlined className="spinner" /> : "Add Sector"}
        </Button>,
        <Button onClick={() => setIsVisible(false)} key="2">
          Cancel
        </Button>,
      ]}
      title="Create a Sector"
      isVisible={isVisible}
    >
      <>
        <Row className="modal__row">
          <Col span={11}>
            <label>Name</label>
            <Input
              size="large"
              name="name"
              value={sector.name}
              onChange={handleInputChange}
              placeholder="Enter sector name here..."
            />
          </Col>
        </Row>
        <Row className="modal__row">
          <Col span={11}>
            <label>Description</label>
            <Input
              size="large"
              name="description"
              value={sector.description || ""}
              onChange={handleInputChange}
              placeholder="Enter description here..."
            />
          </Col>
        </Row>
      </>
    </Modal>
  );
};

export default AddSector;
