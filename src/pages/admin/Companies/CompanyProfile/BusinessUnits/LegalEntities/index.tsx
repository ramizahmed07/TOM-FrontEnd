import { Col, Row } from "antd";
import { useState } from "react";
import { useParams } from "react-router-dom";

import { useFetchLegalEntitiesQuery } from "@services";
import Table from "@components/Table";
import Button from "@components/Button";
import { columns } from "./config";
import AddLegalEntity from "./AddLegalEntity";

const LegalEntities = () => {
  const [isVisible, setIsVisible] = useState(false);
  const params = useParams<{
    business_unit_id: string;
    company_id: string;
    country_id: string;
    region_id: string;
  }>();

  const { data: legalEntities, isLoading } = useFetchLegalEntitiesQuery({
    ...params,
  });
  const { data, pagination } = legalEntities || {};
  console.log("legal", legalEntities);

  return (
    <>
      {isVisible ? (
        <AddLegalEntity isVisible={isVisible} setIsVisible={setIsVisible} />
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
