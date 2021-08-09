import { useState } from "react";
import { Col, Dropdown, Menu, Row, TableColumnsType } from "antd";
import { useHistory } from "react-router-dom";

import { ReactComponent as MenuIcon } from "@assets/images/vertical-dots.svg";
import Table from "@components/Table";
import AddSector from "./AddSector";
import Button from "@components/Button";
import { useFetchSectorsQuery } from "@services";
import { IIndustry, ISector } from "@store/sectors";
import { useTypedSelector } from "@/hooks";

const columns: TableColumnsType<ISector> = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
    width: "10%",
  },
  {
    title: "Sector",
    dataIndex: "name",
    key: "sector",
    width: "20%",
  },
  {
    title: "Industry",
    dataIndex: "industries",
    key: "industry",
    width: "55%",
    render: industries => {
      const names = industries?.map((industry: IIndustry) => industry.name);
      return <span>{names.join(", ")}</span>;
    },
  },
  {
    title: <span className="align-center">Actions</span>,
    key: "action",
    fixed: "right",
    width: "15%",
    render: () => {
      const menu = (
        <Menu>
          <Menu.Item>Edit</Menu.Item>
          <Menu.Item danger>Delete</Menu.Item>
        </Menu>
      );
      return (
        <div className="table__action__menu">
          <Dropdown overlay={menu} trigger={["click"]}>
            <MenuIcon />
          </Dropdown>
        </div>
      );
    },
  },
];

const Sectors = () => {
  const history = useHistory();
  const [isVisible, setIsVisible] = useState(false);
  const { data, isLoading } = useFetchSectorsQuery(null);

  const onRowClick = (data: any) => {
    history.push(`/sectors/${data?.id}`);
  };

  return (
    <>
      <AddSector isVisible={isVisible} setIsVisible={setIsVisible} />
      <Row>
        <Col span={24}>
          <div className="main-heading">Sectors, Industry & Sub-Industry</div>
        </Col>
      </Row>
      <Row className="mt-16 mb-20">
        <Col className="align-start" span={16}>
          <Button
            variant="upload"
            onClick={() => console.log("upload job function")}
          >
            Upload Industries
          </Button>
          <Button
            variant="download"
            onClick={() => console.log("Download Job Functions")}
          >
            Download Industries
          </Button>
        </Col>
        <Col className="align-end" span={8}>
          <Button variant="add" onClick={() => setIsVisible(true)}>
            Add New Sector
          </Button>
        </Col>
      </Row>
      <Row>
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

export default Sectors;
