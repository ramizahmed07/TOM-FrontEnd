import { useState } from "react";
import { Col, Row, TableColumnsType } from "antd";
import { useHistory, useParams } from "react-router-dom";

import Table from "@components/Table";
import AddIndustry from "./AddIndustry";
import Button from "@components/Button";
import { IIndustry, ISubIndustry } from "@store/sectors";
import { useFetchIndustriesQuery } from "@services";

const columns: TableColumnsType<IIndustry> = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
    width: "7%",
  },

  {
    title: "Industry",
    dataIndex: "name",
    key: "industry",
    width: "23%",
  },
  {
    title: "Sub-Industry",
    dataIndex: "sub_industries",
    key: "subIndustry",
    width: "55%",
    render: sub_industries => {
      const names = sub_industries?.map(
        (sub_industry: ISubIndustry) => sub_industry.name
      );
      return <span>{names.join(", ")}</span>;
    },
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

const Industry = () => {
  const history = useHistory();
  const [isVisible, setIsVisible] = useState(false);
  const { sector_id: id } = useParams<{ sector_id: string }>();
  const { data, isLoading } = useFetchIndustriesQuery({ id });

  const onRowClick = (data: any) => {
    history.push(`/sectors/${id}/${data?.id}`, { data: data?.sub_industries });
  };

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
        <Table
          onRowClick={onRowClick}
          data={data}
          columns={columns}
          isLoading={isLoading}
        />
      </Row>
    </>
  );
};

export default Industry;
