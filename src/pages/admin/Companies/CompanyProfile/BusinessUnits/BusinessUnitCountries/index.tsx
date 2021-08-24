import { Col, Row } from "antd";
import { useParams } from "react-router-dom";

import Table from "@/components/Table";
import { useFetchRegionQuery } from "@services";
import { columns } from "./config";

const BusinessUnitCountries = () => {
  const { company_id, region_id: id } =
    useParams<{ company_id: string; region_id: string }>();
  const { data: region, isLoading } = useFetchRegionQuery({ company_id, id });
  const { data } = region || {};
  console.log("::::", region);
  return (
    <>
      <Row className="mb-20">
        <Col span={24}>
          <div className="main-heading">{data?.name}</div>
        </Col>
      </Row>
      <Row>
        <Table isLoading={isLoading} data={data?.countries} columns={columns} />
      </Row>
    </>
  );
};

export default BusinessUnitCountries;
