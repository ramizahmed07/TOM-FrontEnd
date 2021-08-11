import { Col, Row, TableColumnsType } from "antd";
import { useHistory } from "react-router";

import Table from "@components/Table";
import Button from "@components/Button";
import { useFetchTARanksQuery } from "@services";

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
  const history = useHistory();
  const { data, isLoading, error } = useFetchTARanksQuery(null);

  console.log("GRADE", {
    data,
    isLoading,
    error,
  });

  const handleAddBtn = () => {
    history.push(`/grade-map-table/create-grade-company`);
  };

  const columns: TableColumnsType<TableRow> = [
    {
      title: "ta rank",
      dataIndex: "rank",
      key: "taRank",
      width: "13%",
    },
  ];

  return (
    <>
      <Row>
        <Col span={24}>
          <div className="main-heading">Companies grade map table</div>
        </Col>
      </Row>
      <Row className="mt-16 mb-20">
        <Col className="align-start" span={16}>
          <Button
            variant="upload"
            onClick={() => console.log("upload job function")}
          >
            Upload Grade Map
          </Button>
          <Button
            variant="download"
            onClick={() => console.log("Download Job Functions")}
          >
            Download Grade Map
          </Button>
        </Col>
        <Col className="align-end" span={8}>
          <Button variant="add" onClick={handleAddBtn}>
            Add new company
          </Button>
        </Col>
      </Row>
      <Row>
        <Table
          data={error ? [] : data}
          columns={columns}
          pagination={false}
          isLoading={isLoading}
        />
      </Row>
    </>
  );
};
export default GradeMapTable;
