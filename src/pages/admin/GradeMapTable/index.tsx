import { Col, Row, TableColumnsType } from "antd";
import { useHistory } from "react-router";

import Table from "@components/Table";
import Button from "@components/Button";
import {
  useFetchAllGradeCompaniesQuery,
  useFetchTARanksQuery,
} from "@services";
import { IGradeCompany } from "@store/grade";

const getRows = (taRanks: any, companies: IGradeCompany[]) => {
  console.log("GRADE", {
    taRanks,
    companies,
  });
  const data = [];
  let companies_ranks: any = {};
  for (let i = 0; i < companies?.length; i++) {
    const current = companies[i];
    companies_ranks[current.name.replace(" ", "")] =
      current.grade_company_ranks;
  }

  for (let i = 0; i < taRanks?.length; i++) {
    const rank = taRanks[i];
    let row: any = {
      rank: rank.rank,
    };
    Object.keys(companies_ranks).forEach(key => {
      const company_ranks = companies_ranks[key].slice().reverse();
      row[key] = company_ranks[i].rank;
    });
    data.push(row);
  }
  return data;
};

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
        dataIndex: company.name.replace(" ", ""),
        key: company.id,
        width: "15%",
      }))) ||
    [];
  const columns = [...default_cols, ...additional_cols];

  const rows =
    !error && !companiesError && companies?.length && taRanks?.length
      ? getRows(taRanks, companies)
      : [];

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
          data={rows}
          columns={columns}
          pagination={false}
          isLoading={isLoadingCompanies}
        />
      </Row>
    </>
  );
};
export default GradeMapTable;
