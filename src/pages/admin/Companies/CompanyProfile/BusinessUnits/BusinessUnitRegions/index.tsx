import { Link, useParams } from "react-router-dom";
import { Col, Row, TableColumnsType } from "antd";

import Table from "@components/Table";
import { useFetchBusinessUnitQuery } from "@services";

const columns: TableColumnsType<any> = [
  {
    title: "id",
    dataIndex: "id",
    key: "id",
    width: 100,
  },
  {
    title: "Region",
    key: "name",
    dataIndex: "name",
    width: `calc(100% - 300px)`,
  },

  {
    title: "Actions",
    key: "action",
    width: 200,
    align: "center",
    render: (item: any) => (
      <Link
        to={`${window.location.pathname}/${item?.id}`}
        className="table__action__btn"
      >
        View
      </Link>
    ),
  },
];

const BusinessUnitRegions = () => {
  const { company_id, business_unit_id: id } =
    useParams<{ company_id: string; business_unit_id: string }>();
  const { data: businessUnit, isLoading } = useFetchBusinessUnitQuery({
    company_id,
    id,
  });
  const { data } = businessUnit || {};
  const regions = data?.region_business_units?.map(({ region }: any) => region);

  const onRowClick = (data: any) => console.log("onRowClick");
  console.log("data", regions);
  return (
    <>
      <Row className="mb-20">
        <Col span={24}>
          <div className="main-heading">Financial Services</div>
        </Col>
      </Row>
      <Row>
        <Table
          onRowClick={onRowClick}
          isLoading={isLoading}
          data={regions}
          columns={columns}
        />
      </Row>
    </>
  );
};

export default BusinessUnitRegions;
