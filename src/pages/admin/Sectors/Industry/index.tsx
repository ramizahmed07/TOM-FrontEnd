import { useState, useRef } from "react";
import { Col, message, Row, TableColumnsType } from "antd";
import { useHistory, useParams } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";

import Table from "@components/Table";
import AddIndustry from "./AddIndustry";
import Button from "@components/Button";
import { IIndustry, ISubIndustry } from "@store/sectors";
import { useDeleteIndustryMutation, useFetchIndustriesQuery } from "@services";
import { checkPermission } from "@utils";
import { permissions } from "@router";

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
      width: 100,
    },

    {
      title: "Industry",
      dataIndex: "name",
      key: "industry",
      width: `calc(50% - 260px)`,
      render: (name: string) => <div className="text-wrap">{name}</div>,
    },
    {
      title: "Sub-Industry",
      dataIndex: "sub_industries",
      key: "subIndustry",
      width: `calc(50% - 260px)`,
      render: sub_industries => {
        const names = sub_industries?.map(
          (sub_industry: ISubIndustry) => sub_industry.name
        );
        return <span className="text-wrap">{names.join(", ")}</span>;
      },
    },
    ...((!checkPermission([
      permissions.UPDATE_INDUSTRY,
      permissions.DELETE_INDUSTRY,
    ])
      ? []
      : [
          {
            title: "Actions",
            key: "action",
            fixed: "right",
            width: 160,
            render: (industry: IIndustry) => {
              return (
                <>
                  {checkPermission(permissions.UPDATE_INDUSTRY) && (
                    <div
                      onClick={event => editIndustry(industry, event)}
                      className="table__action__btn"
                    >
                      Edit
                    </div>
                  )}

                  {checkPermission(permissions.DELETE_INDUSTRY) && (
                    <div
                      onClick={event =>
                        handleDeleteIndustry(industry?.id, event)
                      }
                      className="table__action__btn table__action__btn--delete"
                    >
                      {isDeleting && industry?.id === industry_id?.current ? (
                        <LoadingOutlined color="red" className="spinner" />
                      ) : (
                        "Delete"
                      )}
                    </div>
                  )}
                </>
              );
            },
          },
        ])! as any),
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
