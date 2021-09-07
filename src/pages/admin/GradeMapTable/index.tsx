import { Col, message, Row } from "antd";
import { useHistory } from "react-router";
import { useRef, useState } from "react";

import "./gradeMapTable.less";
import Table from "@components/Table";
import Button from "@components/Button";
import {
  useDownloadGradeTableQuery,
  useFetchAllGradeCompaniesQuery,
  useFetchTARanksQuery,
  useUploadGradeTableMutation,
} from "@services";
import { IGradeCompany } from "@/types";
import { getRows } from "@utils";
import { paths } from "@router";

const default_cols = [
  {
    title: <div className="text-wrap">ta rank</div>,
    dataIndex: "rank",
    key: "taRank",
    width: 300,
  },
];

const GradeMapTable = () => {
  const history = useHistory();
  const inputRef = useRef<any>(null);
  const [download, setDownload] = useState(false);
  const [uploadGradeTable, { isLoading: isUploading }] =
    useUploadGradeTableMutation();
  const { isLoading: isDownloading } = useDownloadGradeTableQuery(null, {
    skip: !download,
  });
  const { data: taRanksData, error } = useFetchTARanksQuery(null);
  const { data: taRanks } = taRanksData || {};
  const {
    data: companiesData,
    isLoading: isLoadingCompanies,
    error: companiesError,
  } = useFetchAllGradeCompaniesQuery(null);
  const { data: companies } = companiesData || {};

  const handleTableCell = (e: any) => {
    const id = e.currentTarget.dataset.id;
    const grade_company = companies.find(
      (company: IGradeCompany) => +company?.id === +id
    );

    history.push(paths.admin.settings.grade_map_table.edit_grade_company, {
      grade_company: {
        ...grade_company,
        grade_company_ranks: grade_company?.grade_company_ranks,
      },
    });
  };

  const additional_cols: any =
    (!error &&
      companies?.map((company: IGradeCompany) => ({
        title: (
          <div
            className="grade__header__row__btn text-wrap"
            data-id={company.id}
            onClick={handleTableCell}
          >
            {company.name}
          </div>
        ),
        dataIndex: company.name.replace(" ", ""),
        key: company.id,
        width: 300,
      }))) ||
    [];
  const columns = [...default_cols, ...additional_cols];

  const rows =
    !error && !companiesError && companies?.length && taRanks?.length
      ? getRows(taRanks, companies)
      : [];

  const handleAddBtn = () => {
    history.push(paths.admin.settings.grade_map_table.create_grade_company);
  };

  const uploadFile = async (event: any) => {
    event.stopPropagation();
    event.preventDefault();
    var file = event?.target?.files[0];
    try {
      const formData = new FormData();
      formData.append("attachment", file, file.name);
      await uploadGradeTable(formData).unwrap();
      message.success("CSV Data Uploaded Successfully");
    } catch (error) {
      message.error(error?.message);
      console.log(error);
    }
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
          <input
            id="myInput"
            type="file"
            ref={inputRef}
            hidden={true}
            onChange={uploadFile}
          />
          <Button
            isLoading={isUploading}
            variant="upload"
            onClick={() => inputRef?.current?.click()}
          >
            Upload Grade Map
          </Button>
          <Button
            variant="download"
            onClick={() => setDownload(true)}
            isLoading={isDownloading}
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
      <Row className="pb-16">
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
