import { useState, useRef } from "react";
import { Col, message, Row } from "antd";
import { useHistory, useParams } from "react-router-dom";

import Table from "@components/Table";
import AddIndustry from "./AddIndustry";
import Button from "@components/Button";
import { IIndustry } from "@types";
import { useDeleteIndustryMutation, useFetchIndustriesQuery } from "@services";
import { checkPermission } from "@utils";
import { permissions } from "@router";
import { getColumns } from "./config";

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

  const columns = getColumns({
    isDeleting,
    industry_id,
    editIndustry,
    handleDeleteIndustry,
  });

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
          {checkPermission(permissions.CREATE_INDUSTRY) && (
            <Button variant="add" onClick={() => setIsVisible(true)}>
              Add Industry
            </Button>
          )}
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
