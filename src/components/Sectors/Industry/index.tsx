import { Button, Col, Menu, Row, TableColumnsType, Typography } from "antd";

import "../sectors.less";
import Table from "@/components/Table";
import { ReactComponent as MenuIcon } from "@assets/images/vertical-dots.svg";
import { ReactComponent as PlusIcon } from "@assets/images/plus.svg";
import AddIndustry from "./AddIndustry/AddIndustry";
import { modal_interface } from "@/interfaces";
import { FC } from "react";

const columns: TableColumnsType<TableRow> = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
    width: 50,
  },

  {
    title: "Industry",
    dataIndex: "industry",
    key: "industry",
    width: 200,
    // filters: [],
    // filterIcon: <FilterIcon className="table__filter__icon" />,
  },
  {
    title: "Sub-Industry",
    dataIndex: "subIndustry",
    key: "subIndustry",
    width: 300,
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
        <div>
          <Button className="table__action__btn" type="link">
            View
          </Button>
          <Button className="table__action__btn" type="link">
            Edit
          </Button>
          {/* <Dropdown
            overlay={menu}
            trigger={["click"]}
            className="table__action__dropdown"
          >
            <MenuIcon />
          </Dropdown> */}
        </div>
      );
    },
  },
];

type TableRow = {
  id: string;
  suBIndustry: string;
  industry: string;
};

const data: TableRow[] = [
  {
    id: "01",
    industry: "Energy Equipment & Services",
    suBIndustry: "",
  },
  {
    id: "02",
    industry: "Energy Equipment & Services",
    suBIndustry: "",
  },
  {
    id: "03",
    industry: "Energy Equipment & Services",
    suBIndustry: "",
  },
];

interface IndustryProps extends modal_interface {}

const Industry: FC<IndustryProps> = ({ isVisible, setIsVisible }) => {
  return (
    <>
      <AddIndustry isVisible={isVisible} setIsVisible={setIsVisible} />
      <Row>
        <Col span={16}>
          <Typography.Paragraph className="sectors__title industry__title">
            Sectors, Industry & Sub-Industry
          </Typography.Paragraph>
        </Col>
        <Col className="sectors__col--last" span={8}>
          <Button
            className="sectors__btn sectors__btn--addIndustry"
            type="primary"
            icon={<PlusIcon />}
            size="large"
            onClick={() => setIsVisible(true)}
          >
            <span>Add Industry</span>
          </Button>
        </Col>
      </Row>

      <Row className="sectors__table">
        <Table data={data} columns={columns} />
      </Row>
    </>
  );
};

export default Industry;
