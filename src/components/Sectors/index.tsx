import { Dispatch, FC, SetStateAction, useState } from "react";
import {
  Button,
  Col,
  Dropdown,
  Menu,
  Row,
  TableColumnsType,
  Typography,
} from "antd";
import { Link, Route } from "react-router-dom";

import "./sectors.less";
import { ReactComponent as UploadIcon } from "@assets/images/upload.svg";
import { ReactComponent as DownloadIcon } from "@assets/images/download.svg";
import { ReactComponent as PlusIcon } from "@assets/images/plus.svg";
import { ReactComponent as MenuIcon } from "@assets/images/vertical-dots.svg";
import { ReactComponent as FilterIcon } from "@assets/images/filter.svg";
import Table from "../Table";
import Modal from "../Modal";
import AddSector from "./AddSector";

const columns: TableColumnsType<TableRow> = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
    width: 50,
  },
  {
    title: "Sector",
    dataIndex: "sector",
    key: "sector",
    width: 100,
    render: (sector, { id }) => {
      return (
        <Link className="table__sector__text" to={`/settings/sectors/${id}`}>
          {sector}
        </Link>
      );
    },
  },
  {
    title: "Industry",
    dataIndex: "industry",
    key: "industry",
    width: 280,
    // filters: [],
    // filterIcon: <FilterIcon className="table__filter__icon" />,
  },
  {
    title: <span className="table__action__col">Actions</span>,
    key: "action",
    fixed: "right",
    width: 80,
    render: () => {
      const menu = (
        <Menu>
          <Menu.Item className="table__action__item">Edit</Menu.Item>
          <Menu.Item danger className="table__action__item">
            Delete
          </Menu.Item>
        </Menu>
      );
      return (
        <div className="table__action__menu">
          <Dropdown
            overlay={menu}
            trigger={["click"]}
            className="table__action__dropdown"
          >
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

interface SectorsProps {
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
}

const Sectors: FC<SectorsProps> = ({ isVisible, setIsVisible }) => {
  return (
    <>
      <AddSector isVisible={isVisible} setIsVisible={setIsVisible} />

      <Row>
        <Col span={24}>
          <Typography.Paragraph className="sectors__title">
            Sectors, Industry & Sub-Industry
          </Typography.Paragraph>
        </Col>
      </Row>
      <Row>
        <Col className="sectors__col" span={16}>
          <Button
            className="sectors__btn sectors__btn--upload"
            type="primary"
            icon={<UploadIcon />}
            size="large"
          >
            <span>Upload Industries</span>
          </Button>
          <Button
            className="sectors__btn sectors__btn--download"
            icon={<DownloadIcon />}
            size="large"
          >
            <span>Download Industries</span>
          </Button>
        </Col>
        <Col className="sectors__col--last" span={8}>
          <Button
            onClick={() => setIsVisible(true)}
            className="sectors__btn sectors__btn--add"
            type="primary"
            icon={<PlusIcon />}
            size="large"
          >
            <span>Add New Sector</span>
          </Button>
        </Col>
      </Row>
      <Row className="sectors__table">
        <Table data={data} columns={columns} />
      </Row>
    </>
  );
};

export default Sectors;
