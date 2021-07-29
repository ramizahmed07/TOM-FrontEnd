import { Col, Row, TableColumnsType } from "antd";
import { useState } from "react";

import { AddButton, DownloadButton, UploadButton } from "@components/Buttons";
import Table from "@components/Table";
import { useHistory } from "react-router";

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
  const history = useHistory();

  const handleAddBtn = () => {
    history.push(`/grade-map-table/create-grade-company`);
  };

  return (
    <>
      <Row>
        <Col span={24}>
          <div className="main-heading">Companies grade map table</div>
        </Col>
      </Row>
      <Row className="mt-16 mb-20">
        <Col className="align-start" span={16}>
          <UploadButton onClick={() => console.log("upload job function")}>
            Upload Grade Map
          </UploadButton>
          <DownloadButton onClick={() => console.log("Download Job Functions")}>
            Download Grade Map
          </DownloadButton>
        </Col>
        <Col className="align-end" span={8}>
          <AddButton onClick={handleAddBtn}>Add new company</AddButton>
        </Col>
      </Row>
      <Row>
        <Table data={data} columns={columns} />
      </Row>
    </>
  );
};
export default GradeMapTable;
