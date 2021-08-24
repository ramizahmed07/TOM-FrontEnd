import { useParams } from "react-router-dom";
import { Col, Row } from "antd";

import Table from "@components/Table";
import { useFetchBusinessUnitQuery } from "@services";
import { columns } from "./config";

const BusinessUnitRegions = () => {
  const { company_id, business_unit_id: id } =
    useParams<{ company_id: string; business_unit_id: string }>();
  const { data: businessUnit, isLoading } = useFetchBusinessUnitQuery({
    company_id,
    id,
  });
  const { data } = businessUnit || {};
  const regions = data?.region_business_units?.map(({ region }: any) => region);

  return (
    <>
      <Row className="mb-20">
        <Col span={24}>
          <div className="main-heading">{data?.name}</div>
        </Col>
      </Row>
      <Row>
        <Table isLoading={isLoading} data={regions} columns={columns} />
      </Row>
    </>
  );
};

export default BusinessUnitRegions;
