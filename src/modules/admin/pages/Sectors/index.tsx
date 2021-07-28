import { FC, useState } from "react";
import { Col, Dropdown, Menu, Row, TableColumnsType } from "antd";
import { useHistory } from "react-router-dom";

import { ReactComponent as MenuIcon } from "@assets/images/vertical-dots.svg";
import Table from "@components/Table";
import { AddButton, DownloadButton, UploadButton } from "@components/Buttons";
import AddSector from "./AddSector";

const columns: TableColumnsType<TableRow> = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
    width: "10%",
  },
  {
    title: "Sector",
    dataIndex: "sector",
    key: "sector",
    width: "20%",
  },
  {
    title: "Industry",
    dataIndex: "industry",
    key: "industry",
    width: "55%",
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

type TableRow = {
  id: string;
  sector: string;
  industry: string;
};

const data: TableRow[] = [
  {
    id: "01",
    sector: "Energy",
    industry: "Energy Equipment & Services",
  },
  {
    id: "02",
    sector: "Energy",
    industry: "Energy Equipment & Services",
  },
  {
    id: "03",
    sector: "Energy",
    industry: "Energy Equipment & Services",
  },
];

const Sectors = () => {
  const history = useHistory();
  const [isVisible, setIsVisible] = useState(false);
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
          <UploadButton onClick={() => console.log("upload job function")}>
            Upload Industries
          </UploadButton>
          <DownloadButton onClick={() => console.log("Download Job Functions")}>
            Download Industries
          </DownloadButton>
        </Col>
        <Col className="align-end" span={8}>
          <AddButton onClick={() => setIsVisible(true)}>
            Add New Sector
          </AddButton>
        </Col>
      </Row>
      <Row>
        <Table onRowClick={onRowClick} data={data} columns={columns} />
      </Row>
    </>
  );
};

export default Sectors;
