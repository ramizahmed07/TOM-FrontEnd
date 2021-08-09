import { useState } from "react";
import { Col, Row, TableColumnsType } from "antd";

import Button from "@components/Button";
import Table from "@components/Table";
import { ISubIndustry } from "@store/sectors";
import { useLocation } from "react-router-dom";
import AddSubIndustry from "./AddSubIndustry";

const columns: TableColumnsType<ISubIndustry> = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
    width: "7%",
  },

  {
    title: "Sub-Industry",
    dataIndex: "name",
    key: "subIndustry",
    width: "23%",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
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

const SubIndustry = () => {
  const [isVisible, setIsVisible] = useState(false);
  const {
    state: { data },
  } = useLocation<{ data: ISubIndustry[] }>();

  return (
    <>
      <AddSubIndustry isVisible={isVisible} setIsVisible={setIsVisible} />
      <Row>
        <Col span={16}>
          <div className="main-heading">Sectors, Industry & Sub-Industry</div>
        </Col>
        <Col className="align-end" span={8}>
          <Button variant="add" onClick={() => setIsVisible(true)}>
            Add Sub-Industry
          </Button>
        </Col>
      </Row>

      <Row className="mt-20">
        <Table data={data} columns={columns} />
      </Row>
    </>
  );
};

export default SubIndustry;
