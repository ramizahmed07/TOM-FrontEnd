import { FC } from "react";
import { Col, Dropdown, Menu, Row, TableColumnsType, Typography } from "antd";
import { useHistory } from "react-router-dom";

import { ReactComponent as MenuIcon } from "@assets/images/vertical-dots.svg";
import { ModalInterface } from "@/types";
import Table from "@components/Table";
import AddSector from "@components/Sectors/AddSector";
import { AddBtn, DownloadBtn, UploadBtn } from "@components/Buttons";

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
    title: <span className="settings__table__action__col">Actions</span>,
    key: "action",
    fixed: "right",
    width: "15%",
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

interface SectorsProps extends ModalInterface {}

const Sectors: FC<SectorsProps> = ({ isVisible, setIsVisible }) => {
  const history = useHistory();

  const onRowClick = (data: any) => {
    history.push(`/settings/sectors/${data?.id}`);
  };

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
        <Table onRowClick={onRowClick} data={data} columns={columns} />
      </Row>
    </>
  );
};

export default Sectors;
