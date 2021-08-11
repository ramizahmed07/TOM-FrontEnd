import { Col, Row, TableColumnsType } from "antd";
import { useHistory } from "react-router";

import Table from "@components/Table";
import Button from "@components/Button";
import {
  useFetchAllGradeCompaniesQuery,
  useFetchTARanksQuery,
} from "@services";
import { IGradeCompany } from "@store/grade";

const default_cols = [
  {
    title: "ta rank",
    dataIndex: "rank",
    key: "taRank",
    width: "10%",
  },
];
const GradeMapTable = () => {
  const history = useHistory();
  const { data: taRanks, isLoading, error } = useFetchTARanksQuery(null);
  const {
    data: companies,
    isLoading: isLoadingCompanies,
    error: companiesError,
  } = useFetchAllGradeCompaniesQuery(null);

  const additional_cols: any =
    (!error &&
      companies?.map((company: IGradeCompany) => ({
        title: company.name,
        dataIndex: "rank",
        key: company.id,
        width: "15%",
      }))) ||
    [];

  const columns = [...default_cols, ...additional_cols];

  console.log("GRADE", {
    taRanks,
    companies,
    isLoadingCompanies,
    companiesError,
  });

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
          data={error ? [] : taRanks}
          columns={columns}
          pagination={false}
          isLoading={isLoadingCompanies}
        />
      </Row>
    </>
  );
};
export default GradeMapTable;
