import { FC } from "react";
import { Button, Col, Row, TableColumnsType, Typography } from "antd";

import Table from "@/components/Table";
import AddIndustry from "@/components/Sectors/Industry/AddIndustry";
import { ModalInterface } from "@/types";
import { AddBtn } from "@/components/Buttons";

const columns: TableColumnsType<TableRow> = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
    width: "7%",
  },

  {
    title: "Industry",
    dataIndex: "industry",
    key: "industry",
    width: "23%",
  },
  {
    title: "Sub-Industry",
    dataIndex: "subIndustry",
    key: "subIndustry",
    width: "55%",
  },
  {
    title: <span className="settings__table__action__col">Actions</span>,
    key: "action",
    fixed: "right",
    width: "15%",
    render: () => {
      return (
        <div>
          <Button className="settings__table__action__col__btn" type="link">
            View
          </Button>
          <Button className="settings__table__action__col__btn" type="link">
            Edit
          </Button>
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

interface IndustryProps extends ModalInterface {}

const Industry: FC<IndustryProps> = ({ isVisible, setIsVisible }) => {
  return (
    <>
      <AddIndustry isVisible={isVisible} setIsVisible={setIsVisible} />
      <Row>
        <Col span={16}>
          <Typography.Paragraph className="settings__title">
            Sectors, Industry & Sub-Industry
          </Typography.Paragraph>
        </Col>
        <Col className="settings__parent__col--last" span={8}>
          <AddBtn text="Add Industry" callback={() => setIsVisible(true)} />
        </Col>
      </Row>

      <Row>
        <Table data={data} columns={columns} />
      </Row>
    </>
  );
};

export default Industry;
