import { Col, Row, Select } from "antd";
import { useMemo, useState } from "react";

import "./addGradeCompany.less";
import Table from "@components/Table";
import { ReactComponent as PlusIcon } from "@assets/images/plus.svg";
import { columns, data, ICompany, CompanyName, IData } from "./config";
import {
  useFetchGradeClientCompaniesQuery,
  useFetchGradeCompaniesQuery,
} from "@/services";

const { Option } = Select;

const AddGradeCompany = () => {
  const [companies, setCompanies] = useState<CompanyName[]>([
    "hrbs",
    "mercerCl",
  ]);
  const { data: gradeClientCompanies, isLoading: isLoadingClientCompanies } =
    useFetchGradeClientCompaniesQuery(null);
  const { data: gradeCompanies, isLoading: isLoadingGradeCompanies } =
    useFetchGradeCompaniesQuery(null);
  const [companyName, setCompanyName] = useState<string>("");
  // const [companyCol, setCompanyCol] = useState(Array(data.length).fill(""));
  const [tableData, setTableData] = useState<Partial<IData>[]>(data);

  /**
   * The purpose below is to show/hide and sort the columns
   * it relies on companies dropdown
   */
  const cols = useMemo(() => {
    return columns
      .filter(
        column =>
          companies.includes(column.dataIndex as CompanyName) ||
          column.dataIndex === "name"
      )
      .sort(function (a, b) {
        if (a.dataIndex === "name") return 1;
        return (
          companies.indexOf(a.dataIndex) -
          companies.indexOf(b.dataIndex as CompanyName)
        );
      });
  }, [companies]);

  const handleDropdown = (value: CompanyName[]) => {
    setCompanies(value);

    setTableData(
      data.map(item => {
        const obj: Partial<Record<CompanyName, string>> = {};
        value.forEach((x: CompanyName) => (obj[x] = item[x]));
        return obj;
      })
    );
  };

  const addGrade = () => {
    setTableData(prev => [
      ...prev,
      { id: Math.floor(Math.random() * 100).toString() },
    ]);
  };

  return (
    <>
      <Row>
        <Col span={24}>
          <div className="main-heading mb-16">Add new company</div>
        </Col>
      </Row>
      <div className="addGradeCompany">
        <Row className="addGradeCompany__header">
          <div className="sub-heading">Basic information</div>
        </Row>
        <Row justify="space-between" className="addGradeCompany__fields">
          <Col span={9}>
            <label>Company name</label>
            <Select
              loading={isLoadingClientCompanies}
              value={companyName.length ? companyName : undefined}
              size="large"
              showArrow
              placeholder="Select company name from here..."
              showSearch={false}
              onChange={(name: string) => setCompanyName(name)}
            >
              {gradeClientCompanies?.map(({ name, id }: ICompany) => (
                <Option key={id} value={name}>
                  {name}
                </Option>
              ))}
            </Select>
          </Col>
          <Col span={9}>
            <label>
              Choose company{" "}
              <span className="addGradeCompany__fields--optional">
                (optional)
              </span>
            </label>
            <Select
              loading={isLoadingGradeCompanies}
              value={companies}
              size="large"
              showArrow
              mode="multiple"
              placeholder="Select industry from here..."
              showSearch={false}
              onChange={handleDropdown}
            >
              {gradeCompanies?.map(({ name, id }: ICompany) => (
                <Option key={id} value={name}>
                  {name}
                </Option>
              ))}
            </Select>
          </Col>
          <Col span={3} />
        </Row>
        <Row>
          <div className="sub-heading addGradeCompany__title">
            Create Grade Table
          </div>

          <Table
            pagination={false}
            columns={cols || columns}
            data={tableData}
          />
          <div className="addGradeCompany__lastRow">
            <div
              onClick={addGrade}
              className="addGradeCompany__lastRow__button"
            >
              <PlusIcon fill="#2f49d1" />
              Add Grade
            </div>
          </div>
        </Row>
      </div>
    </>
  );
};

export default AddGradeCompany;
