import { useState } from "react";
import { Col, Row, TableColumnsType } from "antd";

import Table from "@components/Table";
import AddIndustry from "./AddIndustry";
import Button from "@components/Button";

const columns: TableColumnsType<TableRow> = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
    width: "7%",
  },

  {
    title: "Industry",
    dataIndex: "industry",
    key: "industry",
    width: "23%",
  },
  {
    title: "Sub-Industry",
    dataIndex: "subIndustry",
    key: "subIndustry",
    width: "55%",
  },
  {
    title: "Actions",
    key: "action",
    fixed: "right",
    width: "15%",
    render: () => {
      return (
        <div>
          <span className="table__action__btn">View</span>
          <span className="table__action__btn">Edit</span>
        </div>
      );
    },
  },
];

type TableRow = {
  id: string;
  suBIndustry: string;
  industry: string;
};

const data: TableRow[] = [
  {
    id: "01",
    industry: "Energy Equipment & Services",
    suBIndustry: "",
  },
  {
    id: "02",
    industry: "Energy Equipment & Services",
    suBIndustry: "",
  },
  {
    id: "03",
    industry: "Energy Equipment & Services",
    suBIndustry: "",
  },
];

const Industry = () => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <>
      <AddIndustry isVisible={isVisible} setIsVisible={setIsVisible} />
      <Row>
        <Col span={16}>
          <div className="main-heading">Sectors, Industry & Sub-Industry</div>
        </Col>
        <Col className="align-end" span={8}>
          <Button variant="add" onClick={() => setIsVisible(true)}>
            Add Industry
          </Button>
        </Col>
      </Row>

      <Row className="mt-20">
        <Table data={data} columns={columns} />
      </Row>
    </>
  );
};

export default Industry;
