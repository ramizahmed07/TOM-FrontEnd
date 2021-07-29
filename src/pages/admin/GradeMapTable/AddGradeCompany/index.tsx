import Table from "@/components/Table";
import { Col, Input, Row, Select, TableColumnsType } from "antd";
import { useMemo, useState } from "react";

import "./addGradeCompany.less";
import { columns, COMPANIES, data, ICompany } from "./config";

const { Option } = Select;

const AddGradeCompany = () => {
  const [companies, setCompanies] = useState<string[]>(["hrbs", "mercerCl"]);
  const [companyName, setCompanyName] = useState("");

  const cols = useMemo(() => {
    return columns
      .filter(column => companies.includes(column.dataIndex))
      .sort(function (a, b) {
        return companies.indexOf(a.dataIndex) - companies.indexOf(b.dataIndex);
      })
      .map((col, i) => ({
        ...col,
        width: i !== companies.length - 1 ? "13%" : "",
      }));
  }, [companies]);

  const tableData = useMemo(() => {
    return data.map(x => {
      const obj: any = { ...x };
      Object.keys(x).forEach(key => companies.includes(key) || delete obj[key]);
      return obj;
    });
  }, [companies]);

  const handleDropdown = (value: string[]) => {
    setCompanies(value);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyName(e.target.value);
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
          <div className="sub-heading addGradeCompany__table__title">
            Create Grade Table
          </div>

          <Table
            pagination={false}
            columns={cols || columns}
            data={tableData}
          />
        </Row>
      </div>
    </>
  );
};

export default AddGradeCompany;
