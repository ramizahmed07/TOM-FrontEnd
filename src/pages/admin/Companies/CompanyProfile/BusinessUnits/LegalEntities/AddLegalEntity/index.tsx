import { FC, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Col, Input, Row } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import { IModal } from "@/types";
import Modal from "@components/Modal";
import { ErrorServices, useCreateLegalEntityMutation } from "@services";
import { showSuccessPopup } from "@utils";

interface IAddLegalEntity extends IModal {
  // selectedIndustry: IIndustry | null;
  // setSelectedIndustry: React.Dispatch<React.SetStateAction<IIndustry | null>>;
}
type Params = {
  region_id: string;
  country_id: string;
  business_unit_id: string;
  company_id: string;
};

const AddLegalEntity: FC<IAddLegalEntity> = ({ isVisible, setIsVisible }) => {
  const [name, setName] = useState("");
  const { region_id, country_id, business_unit_id, company_id } =
    useParams<Params>();
  const [createLegalEntity, { isLoading: isCreating }] =
    useCreateLegalEntityMutation();

  const onSubmit = async () => {
    const data = {
      body: {
        region_id: +region_id,
        country_id: +country_id,
        business_unit_id: +business_unit_id,
        name,
      },
      company_id: +company_id,
    };
    try {
      await addLegalEntity(data);
      setIsVisible(false);
      showSuccessPopup({
        title: false ? "Industry Updated!" : "New Industry Created",
        desc: `You have successfully ${
          false ? "updated the" : "created new"
        } industry.`,
      });
    } catch (error) {
      ErrorServices(error);
      console.log(error);
    }
  };

  const addLegalEntity = async (data: any) =>
    await createLegalEntity(data).unwrap();

  //   const editLegalEntity = async (data) => {
  //     await up({ ...industry, sector_id }).unwrap();

  return (
    <Modal
      footer={[
        <Button disabled={!name} onClick={onSubmit} key="1" type="primary">
          {isCreating ? <LoadingOutlined className="spinner" /> : "Add"}
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
