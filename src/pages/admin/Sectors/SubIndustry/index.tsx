import { useParams } from "react-router-dom";
import { useRef, useState } from "react";
import { Col, message, Row, TableColumnsType } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import Button from "@components/Button";
import Table from "@components/Table";
import { ISubIndustry } from "@store/sectors";
import AddSubIndustry from "./AddSubIndustry";
import {
  useDeleteSubIndustryMutation,
  useFetchSubIndustriesQuery,
} from "@services";
import { checkPermission } from "@utils";
import { permissions } from "@router";

const SubIndustry = () => {
  let sub_industry_id = useRef<any>(null);
  const [page, setPage] = useState(1);
  const { industry_id: id } = useParams<{ industry_id: string }>();
  const { data, isLoading } = useFetchSubIndustriesQuery({ id, page });
  const [selectedSubIndustry, setSelectedSubIndustry] =
    useState<null | ISubIndustry>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [deleteSubIndustry, { isLoading: isDeleting }] =
    useDeleteSubIndustryMutation();
  const { data: sub_industries, pagination } = data || {};

  const editSubIndustry = (
    sub_industry: ISubIndustry,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    setSelectedSubIndustry(sub_industry);
    setIsVisible(true);
  };

  const handleDelete = async (
    id: number,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    sub_industry_id.current = id;
    try {
      await deleteSubIndustry({ id });
      message.success("Sub-Industry deleted successfully!");
    } catch (error) {
      message.error("Could not delete sub-industry.");
      console.log(error);
    }
  };

  const columns: TableColumnsType<ISubIndustry> = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      width: 100,
    },

    {
      title: "Sub-Industry",
      dataIndex: "name",
      key: "subIndustry",
      width: `calc(100% - 260px)`,
      render: (name: string) => <div className="text-wrap">{name}</div>,
    },
    ...((!checkPermission([
      permissions.UPDATE_SUB_INDUSTRY,
      permissions.DELETE_SUB_INDUSTRY,
    ])
      ? []
      : [
          {
            title: "Actions",
            key: "action",
            fixed: "right",
            width: 160,
            render: (item: ISubIndustry) => {
              return (
                <div>
                  {checkPermission(permissions.UPDATE_SUB_INDUSTRY) && (
                    <div
                      onClick={event => editSubIndustry(item, event)}
                      className="table__action__btn"
                    >
                      Edit
                    </div>
                  )}
                  {checkPermission(permissions.DELETE_SUB_INDUSTRY) && (
                    <div
                      onClick={event => handleDelete(item?.id, event)}
                      className="table__action__btn table__action__btn--delete"
                    >
                      {isDeleting && item?.id === sub_industry_id?.current ? (
                        <LoadingOutlined color="red" className="spinner" />
                      ) : (
                        "Delete"
                      )}
                    </div>
                  )}
                </div>
              );
            },
          },
        ]) as any),
  ];

  return (
    <>
      {isVisible ? (
        <AddSubIndustry
          selectedSubIndustry={selectedSubIndustry}
          setSelectedSubIndustry={setSelectedSubIndustry}
          isVisible={isVisible}
          setIsVisible={setIsVisible}
        />
      ) : null}

      <Row>
        <Col span={16}>
          <div className="main-heading">Sectors, Industry & Sub-Industry</div>
        </Col>
        <Col className="align-end" span={8}>
          {checkPermission(permissions.CREATE_SUB_INDUSTRY) && (
            <Button variant="add" onClick={() => setIsVisible(true)}>
              Add Sub-Industry
            </Button>
          )}
        </Col>
      </Row>

      <Row className="mt-20">
        <Table
          data={sub_industries}
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

export default SubIndustry;
