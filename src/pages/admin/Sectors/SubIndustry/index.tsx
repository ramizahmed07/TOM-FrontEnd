import { useRef, useState } from "react";
import { Col, message, Row, TableColumnsType } from "antd";

import Button from "@components/Button";
import Table from "@components/Table";
import { ISubIndustry } from "@store/sectors";
import { useLocation } from "react-router-dom";
import AddSubIndustry from "./AddSubIndustry";
import { useDeleteSubIndustryMutation } from "@/services";
import { LoadingOutlined } from "@ant-design/icons";

const SubIndustry = () => {
  let sub_industry_id = useRef<any>(null);
  const [selectedSubIndustry, setSelectedSubIndustry] =
    useState<null | ISubIndustry>(null);
  const [isVisible, setIsVisible] = useState(false);
  const {
    state: { data },
  } = useLocation<{ data: ISubIndustry[] }>();
  const [deleteSubIndustry, { isLoading: isDeleting }] =
    useDeleteSubIndustryMutation();

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
      render: item => {
        return (
          <div>
            <div
              onClick={event => editSubIndustry(item, event)}
              className="table__action__btn"
            >
              Edit
            </div>
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
          </div>
        );
      },
    },
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
          <Button variant="add" onClick={() => setIsVisible(true)}>
            Add Sub-Industry
          </Button>
        </Col>
      </Row>

      <Row className="mt-20">
        <Table data={data} columns={columns} isLoading={true} />
      </Row>
    </>
  );
};

export default SubIndustry;
