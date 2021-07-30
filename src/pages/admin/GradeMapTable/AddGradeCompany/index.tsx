import Table from "@/components/Table";
import { Col, Input, Row, Select, TableColumnsType } from "antd";
import { useMemo, useState } from "react";

import "./addGradeCompany.less";
import { ReactComponent as PlusIcon } from "@assets/images/plus.svg";
import { columns, COMPANIES, data, ICompany } from "./config";

const { Option } = Select;

const AddGradeCompany = () => {
  const [companies, setCompanies] = useState<string[]>(["hrbs", "mercerCl"]);
  const [companyName, setCompanyName] = useState("");
  const [companyCol, setCompanyCol] = useState(Array(data.length).fill(""));
  const [tableData, setTableData] = useState(data);
  const cols = useMemo(() => {
    return columns
      .filter(
        column =>
          companies.includes(column.dataIndex) || column.dataIndex === "name"
      )
      .sort(function (a, b) {
        if (a.dataIndex === "name") return 1;
        return companies.indexOf(a.dataIndex) - companies.indexOf(b.dataIndex);
      });
  }, [companies]);
  console.log(data, "data");
  // const tableData = useMemo(() => {
  //   return data.map(x => {
  //     const obj: any = { ...x };
  //     Object.keys(x).forEach(key => companies.includes(key) || delete obj[key]);
  //     return obj;
  //   });
  // }, [companies, companyCol]);

  const handleDropdown = (value: string[]) => {
    setCompanies(value);

    setTableData(
      data.map((item: any) => {
        const obj: any = {};
        value.forEach((x: any) => (obj[x] = item[x]));
        return obj;
      })
    );
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyName(e.target.value);
  };

  const addGrade = () => {
    setTableData((prev: any) => [
      ...prev,
      { id: Math.floor(Math.random() * 100) },
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
            <Input
              value={companyName}
              onChange={handleInput}
              placeholder="Enter company name here..."
              size="large"
            />
          </Col>
          <Col span={9}>
            <label>
              Choose company{" "}
              <span className="addGradeCompany__fields--optional">
                (optional)
              </span>
            </label>
            <Select
              value={companies}
              size="large"
              showArrow
              mode="multiple"
              placeholder="Select industry from here..."
              showSearch={false}
              onChange={handleDropdown}
            >
              {COMPANIES.map(({ title, id, value }: ICompany) => (
                <Option key={id} value={value}>
                  {title}
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
