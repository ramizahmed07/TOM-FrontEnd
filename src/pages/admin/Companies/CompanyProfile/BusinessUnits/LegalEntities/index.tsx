import { Col, Row } from "antd";
import { useParams } from "react-router-dom";

import { useFetchLegalEntitiesQuery } from "@services";
import Table from "@components/Table";
import { columns } from "./config";

const LegalEntities = () => {
  const params = useParams<{
    business_unit_id: string;
    company_id: string;
    country_id: string;
    region_id: string;
  }>();

  const { data: legalEntities, isLoading } = useFetchLegalEntitiesQuery({
    ...params,
  });
  const { data } = legalEntities || {};
  console.log("legal", legalEntities);
  return (
    <>
      <Row className="mb-20">
        <Col span={24}>
          <div className="main-heading">Legal Entities</div>
        </Col>
      </Row>
      <Row>
        <Table isLoading={isLoading} data={data} columns={columns} />
      </Row>
    </>
  );
};

export default LegalEntities;
