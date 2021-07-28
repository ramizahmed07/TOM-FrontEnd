import { Col, Row, TableColumnsType, Typography } from "antd";
import { useState } from "react";

import { AddBtn, DownloadBtn, UploadBtn } from "@components/Buttons";
import Table from "@components/Table";

const columns: TableColumnsType<TableRow> = [
  {
    title: "tc rank",
    dataIndex: "tcRank",
    key: "tcRank",
    width: "13%",
  },
  {
    title: "hrbs",
    dataIndex: "hrbs",
    key: "hrbs",
    width: "13%",
  },
  {
    title: "mercer pc",
    dataIndex: "mercerPc",
    key: "mercerPc",
    width: "13%",
  },
  {
    title: "mercer cl",
    dataIndex: "mercerCl",
    key: "mercerCl",
    width: "13%",
  },
  {
    title: "tw grade",
    dataIndex: "twGrade",
    key: "twGrade",
    // width: ,
  },
];

type TableRow = {
  id: string;
  tcRank: string;
  hrbs: string;
  mercerPc: string;
  mercerCl: string;
  twGrade: string;
};

const data: TableRow[] = [
  {
    id: "01",
    tcRank: "01",
    hrbs: "12",
    mercerPc: "-",
    mercerCl: "14",
    twGrade: "11",
  },
  {
    id: "02",
    tcRank: "02",
    hrbs: "27",
    mercerPc: "-",
    mercerCl: "27",
    twGrade: "17",
  },
  {
    id: "03",
    tcRank: "03",
    hrbs: "38",
    mercerPc: "27",
    mercerCl: "38",
    twGrade: "31",
  },
  {
    id: "04",
    tcRank: "04",
    hrbs: "40",
    mercerPc: "27",
    mercerCl: "12",
    twGrade: "35",
  },
  {
    id: "05",
    tcRank: "05",
    hrbs: "20",
    mercerPc: "37",
    mercerCl: "42",
    twGrade: "15",
  },
];

const GradeMapTable = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <Row>
        <Col span={24}>
          <Typography.Paragraph className="settings__title">
            Companies grade map table
          </Typography.Paragraph>
        </Col>
      </Row>
      <Row>
        <Col className="settings__parent__col" span={16}>
          <UploadBtn
            text="Upload Grade Map"
            callback={() => console.log("upload job function")}
          />
          <DownloadBtn
            text="Download Grade Map"
            callback={() => console.log("Download Job Functions")}
          />
        </Col>
        <Col className="settings__parent__col--last" span={8}>
          <AddBtn text="Add new company" callback={() => setIsVisible(true)} />
        </Col>
      </Row>
      <Row className="settings__table">
        <Table data={data} columns={columns} />
      </Row>
    </>
  );
};
export default GradeMapTable;
