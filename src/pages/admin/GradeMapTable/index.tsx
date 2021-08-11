import { Col, Row } from "antd";
import { useHistory } from "react-router";

import Table from "@components/Table";
import Button from "@components/Button";
import {
  useFetchAllGradeCompaniesQuery,
  useFetchTARanksQuery,
} from "@services";
import { IGradeCompany } from "@store/grade";
import { getRows } from "@utils";
import { Paths } from "@/router";

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
  const { data: taRanks, error } = useFetchTARanksQuery(null);
  const {
    data: companies,
    isLoading: isLoadingCompanies,
    error: companiesError,
  } = useFetchAllGradeCompaniesQuery(null);

  const handleTableCell = (e: any) => {
    const id = e.currentTarget.dataset.id;
    const grade_company = companies.find(
      (company: IGradeCompany) => +company?.id === +id
    );

    history.push(Paths.Settings.grade_map_table.edit_grade_company, {
      grade_company: {
        ...grade_company,
        grade_company_ranks: grade_company?.grade_company_ranks
          .slice()
          .reverse(),
      },
    });
  };

  const additional_cols: any =
    (!error &&
      companies?.map((company: IGradeCompany) => ({
        title: (
          <div data-id={company.id} onClick={handleTableCell}>
            {company.name}
          </div>
        ),
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
    history.push(Paths.Settings.grade_map_table.create_grade_company);
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
