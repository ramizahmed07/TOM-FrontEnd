import { FC, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Col, Input, Row } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import { IModal } from "@/types";
import Modal from "@components/Modal";
import {
  ErrorServices,
  useCreateLegalEntityMutation,
  useUpdateLegalEntityMutation,
} from "@services";
import { showSuccessPopup } from "@utils";
import { IParams } from "../config";
import { ILegalEntity } from "@store/companies";

interface IAddLegalEntity extends IModal {
  selectedEntity: ILegalEntity | null;
  setSelectedEntity: React.Dispatch<React.SetStateAction<ILegalEntity | null>>;
}

const AddLegalEntity: FC<IAddLegalEntity> = ({
  isVisible,
  setIsVisible,
  setSelectedEntity,
  selectedEntity,
}) => {
  const [name, setName] = useState("");
  const { region_id, country_id, business_unit_id, company_id } =
    useParams<IParams>();
  const [createLegalEntity, { isLoading: isCreating }] =
    useCreateLegalEntityMutation();

  const [updateLegalEntity, { isLoading: isUpdating }] =
    useUpdateLegalEntityMutation();

  useEffect(() => {
    if (selectedEntity) {
      setName(selectedEntity?.name);
    }
    return () => {
      setSelectedEntity(null);
    };
  }, [selectedEntity, setSelectedEntity]);

  const onSubmit = async () => {
    try {
      if (selectedEntity) {
        await editLegalEntity();
      } else {
        await addLegalEntity();
      }
      setIsVisible(false);
      showSuccessPopup({
        title: selectedEntity ? "Industry Updated!" : "New Industry Created",
        desc: `You have successfully ${
          selectedEntity ? "updated the" : "created new"
        } industry.`,
      });
    } catch (error) {
      ErrorServices(error);
      console.log(error);
    }
  };

  const addLegalEntity = async () =>
    await createLegalEntity({
      body: {
        region_id: +region_id,
        country_id: +country_id,
        business_unit_id: +business_unit_id,
        name,
      },
      company_id: +company_id,
    }).unwrap();

  const editLegalEntity = async () =>
    await updateLegalEntity({
      name,
      id: selectedEntity?.id,
      company_id,
    }).unwrap();

  return (
    <Modal
      footer={[
        <Button disabled={!name} onClick={onSubmit} key="1" type="primary">
          {isCreating || isUpdating ? (
            <LoadingOutlined className="spinner" />
          ) : (
            "Add"
          )}
        </Button>,
        <Button onClick={() => setIsVisible(false)} key="2">
          Cancel
        </Button>,
      ]}
      title="Add Legal Entity"
      isVisible={isVisible}
    >
      <>
        <Row className="modal__row">
          <Col span={11}>
            <label>Name of Legal Entity</label>
            <Input
              onChange={e => setName(e.target.value)}
              size="large"
              value={name}
              name="name"
              placeholder="Enter legal entity name here..."
            />
          </Col>
        </Row>

        <Row justify="space-between" className="modal__row ">
          <Col span={11}>
            <label>Business Unit</label>
            <Input size="large" disabled />
          </Col>
          <Col span={11}>
            <label>Region</label>
            <Input size="large" disabled />
          </Col>
        </Row>
        <Row className="modal__row">
          <Col span={11}>
            <label>Country</label>
            <Input size="large" disabled />
          </Col>
        </Row>
      </>
    </Modal>
  );
};

export default AddLegalEntity;
