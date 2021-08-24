import { Col, Row, TableColumnsType } from "antd";

import Table from "@components/Table";
import { Link } from "react-router-dom";

const columns: TableColumnsType<any> = [
  {
    title: "id",
    dataIndex: "id",
    key: "id",
    width: "10%",
  },
  {
    title: "Region",
    key: "region",
    dataIndex: "region",
    width: "70%",
    render: () => "Regionnn",
  },

  {
    title: "Actions",
    key: "action",
    fixed: "right",
    width: "20%",
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

const data = [
  {
    id: 1,
    region: "USA",
  },
  {
    id: 2,
    region: "PK",
  },
  {
    id: 3,
    region: "UK",
  },
];

const BusinessUnitRegions = () => {
  const onRowClick = (data: any) => console.log("onRowClick");

  return (
    <>
      <Row className="mb-20">
        <Col span={24}>
          <div className="main-heading">Financial Services</div>
        </Col>
      </Row>
      <Row>
        <Table onRowClick={onRowClick} data={data} columns={columns} />
      </Row>
    </>
  );
};

export default BusinessUnitRegions;
