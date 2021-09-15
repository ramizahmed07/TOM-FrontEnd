import { Col, message, Row } from "antd";
import { useRef, useState } from "react";
import { useParams } from "react-router-dom";

import {
  ErrorServices,
  useDeleteLegalEntityMutation,
  useFetchLegalEntitiesQuery,
} from "@services";
import { getColumns, IParams } from "./config";
import { ILegalEntity } from "@types";
import Table from "@components/Table";
import Button from "@components/Button";
import AddLegalEntity from "./AddLegalEntity";

const LegalEntities = () => {
  const params = useParams<IParams>();
  let entity_id = useRef<any>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState<ILegalEntity | null>(
    null
  );
  const { data: legalEntities, isLoading } = useFetchLegalEntitiesQuery({
    ...params,
  });
  const [deleteLegalEntity, { isLoading: isDeleting }] =
    useDeleteLegalEntityMutation();
  const { data, pagination } = legalEntities || {};

  const handleDelete = async (id: number) => {
    try {
      entity_id.current = id;
      await deleteLegalEntity({ company_id: +params?.company_id, id }).unwrap();
      message.success("Industry deleted successfully!");
    } catch (error) {
      ErrorServices(error);
      console.log(error);
    }
  };

  const handleUpdate = (legalEntity: ILegalEntity) => {
    setSelectedEntity(legalEntity);
    setIsVisible(true);
  };

  const columns = getColumns({
    handleDelete,
    isDeleting,
    entity_id,
    handleUpdate,
  });

  return (
    <>
      {isVisible ? (
        <AddLegalEntity
          setSelectedEntity={setSelectedEntity}
          selectedEntity={selectedEntity}
          isVisible={isVisible}
          setIsVisible={setIsVisible}
        />
      ) : null}
      <Row className="mb-20">
        <Col span={16}>
          <div className="main-heading">Legal Entities</div>
        </Col>
        <Col className="align-end" span={8}>
          <Button variant="add" onClick={() => setIsVisible(true)}>
            Add Legal Entity
          </Button>
        </Col>
      </Row>
      <Row>
        <Table isLoading={isLoading} data={data} columns={columns} />
      </Row>
    </>
  );
};

export default LegalEntities;
