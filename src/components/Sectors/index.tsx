import { FC } from "react";
import {
  Button,
  Col,
  Dropdown,
  Menu,
  Row,
  TableColumnsType,
  Typography,
} from "antd";
import { Link } from "react-router-dom";

import "./sectors.less";
import { ReactComponent as UploadIcon } from "@assets/images/upload.svg";
import { ReactComponent as DownloadIcon } from "@assets/images/download.svg";
import { ReactComponent as PlusIcon } from "@assets/images/plus.svg";
import { ReactComponent as MenuIcon } from "@assets/images/vertical-dots.svg";
import { modal_interface } from "@/interfaces";
import Table from "@components/Table";
import AddSector from "./AddSector";
import { AddBtn, DownloadBtn, UploadBtn } from "../Buttons";

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

interface SectorsProps extends modal_interface {}

const Sectors: FC<SectorsProps> = ({ isVisible, setIsVisible }) => {
  return (
    <>
      <AddSector isVisible={isVisible} setIsVisible={setIsVisible} />

      <Row>
        <Col span={24}>
          <Typography.Paragraph className="settings__title">
            Sectors, Industry & Sub-Industry
          </Typography.Paragraph>
        </Col>
      </Row>
      <Row>
        <Col className="settings__parent__col" span={16}>
          <UploadBtn
            text="Upload Industries"
            callback={() => console.log("upload btn")}
          />
          <DownloadBtn
            text="Download Industries"
            callback={() => console.log("download btn")}
          />
        </Col>
        <Col className="settings__parent__col--last" span={8}>
          <AddBtn text="Add New Sector" callback={() => setIsVisible(true)} />
        </Col>
      </Row>
      <Row className="settings__table">
        <Table data={data} columns={columns} />
      </Row>
    </>
  );
};

export default Sectors;
