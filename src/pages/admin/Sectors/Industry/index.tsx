import { useState } from "react";
import { Col, message, Row, TableColumnsType } from "antd";
import { useHistory, useParams } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import { useRef } from "react";

import Table from "@components/Table";
import AddIndustry from "./AddIndustry";
import Button from "@components/Button";
import { IIndustry, ISubIndustry } from "@store/sectors";
import { useDeleteIndustryMutation, useFetchIndustriesQuery } from "@services";

const Industry = () => {
  const history = useHistory();
  let industry_id = useRef<any>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState<IIndustry | null>(
    null
  );
  const [page, setPage] = useState(1);
  const { sector_id: id } = useParams<{ sector_id: string }>();
  const { data, isLoading } = useFetchIndustriesQuery({ id, page });
  const [deleteIndustry, { isLoading: isDeleting }] =
    useDeleteIndustryMutation();
  const { data: industries, pagination } = data || {};

  const onRowClick = (data: any) => {
    history.push(`/sectors/${id}/${data?.id}`);
  };

  const editIndustry = (
    industry: IIndustry,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    setSelectedIndustry(industry);
    setIsVisible(true);
  };

  const handleDeleteIndustry = async (
    id: number,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    industry_id.current = id;
    try {
      await deleteIndustry({ id });
      message.success("Industry deleted successfully!");
    } catch (error) {
      message.error("Could not delete industry.");
      console.log(error);
    }
  };

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
      render: industry => {
        return (
          <>
            <div
              onClick={event => editIndustry(industry, event)}
              className="table__action__btn"
            >
              Edit
            </div>
            <div
              onClick={event => handleDeleteIndustry(industry?.id, event)}
              className="table__action__btn table__action__btn--delete"
            >
              {isDeleting && industry?.id === industry_id?.current ? (
                <LoadingOutlined color="red" className="spinner" />
              ) : (
                "Delete"
              )}
            </div>
          </>
        );
      },
    },
  ];

  return (
    <>
      {isVisible ? (
        <AddIndustry
          selectedIndustry={selectedIndustry}
          setSelectedIndustry={setSelectedIndustry}
          isVisible={isVisible}
          setIsVisible={setIsVisible}
        />
      ) : null}
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
          data={industries}
          columns={columns}
          isLoading={isLoading}
          pagination={true}
          count={pagination?.count}
          onChangePage={setPage}
          page={page}
        />
      </Row>
    </>
  );
};

export default Industry;
