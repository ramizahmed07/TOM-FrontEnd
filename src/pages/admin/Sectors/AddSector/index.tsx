import { FC, useState, useEffect } from "react";
import { Button, Col, Input, message, Row } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import Modal from "@components/Modal";
import { showSuccessPopup } from "@utils";
import { IModal } from "@/types";
import { useCreateSectorMutation, useUpdateSectorMutation } from "@services";
import { ISector } from "@store/sectors";

interface AddSectorProps extends IModal {
  selectedSector: ISector | null;
  setSelectedSector: React.Dispatch<React.SetStateAction<ISector | null>>;
}

const AddSector: FC<AddSectorProps> = ({
  isVisible,
  setIsVisible,
  selectedSector,
  setSelectedSector,
}) => {
  const [sector, setSector] = useState<Partial<ISector>>({
    name: "",
    description: null,
  });
  const [createSector, { isLoading }] = useCreateSectorMutation();
  const [updateSector, { isLoading: isUpdating }] = useUpdateSectorMutation();

  useEffect(() => {
    if (selectedSector) {
      setSector(selectedSector as ISector);
    }
    return () => {
      setSelectedSector(null);
    };
  }, [selectedSector, setSelectedSector]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSector(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

  const handleSubmit = async () => {
    try {
      if (selectedSector) {
        await editSector();
      } else {
        await addSector();
      }
      setIsVisible(false);
      showSuccessPopup({
        title: selectedSector ? "Sector Updated" : "New Sector Created",
        desc: `You have successfully ${
          selectedSector ? "updated the" : "created new"
        } sector.`,
      });
    } catch (error) {
      message.error(error?.message);
      console.log(error);
    }
  };

  const addSector = async () => await createSector(sector).unwrap();

  const editSector = async () => await updateSector(sector).unwrap();

  return (
    <Modal
      footer={[
        <Button
          onClick={handleSubmit}
          disabled={!sector?.name?.length}
          key="1"
          type="primary"
        >
          {isLoading || isUpdating ? (
            <LoadingOutlined className="spinner" />
          ) : selectedSector ? (
            "Update Sector"
          ) : (
            "Add Sector"
          )}
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
      </>
    </Modal>
  );
};

export default AddSector;
