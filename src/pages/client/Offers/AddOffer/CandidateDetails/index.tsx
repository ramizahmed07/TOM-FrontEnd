import { Button, Col, Input, Row, Select } from "antd";
import { FC } from "react";

const { Option } = Select;

const CandidateDetails: FC<{
  setStep: React.Dispatch<React.SetStateAction<number>>;
}> = ({ setStep }) => {
  return (
    <>
      <Row className="offers__form__header">
        <div className="sub-heading">Candidate Details</div>
      </Row>
      <div className="offers__form__fields">
        <Row justify="space-between" className="mb-32">
          <Col span={7}>
            <label>Candidate Name</label>
            <Input placeholder="Enter candidate name here..." size="large" />
          </Col>
          <Col span={7}>
            <label>Gender</label>
            <Select
              size="large"
              showArrow
              placeholder="Select gender from here..."
              showSearch={false}
            >
              <Option value={"male"}>Male</Option>
              <Option value={"femail"}>Female</Option>
            </Select>
          </Col>
          <Col span={7}>
            <label>Candidate Company Name</label>
            <Input
              size="large"
              placeholder="Enter candidate company name here..."
            />
          </Col>
        </Row>

        <Row justify="space-between" className="mb-32">
          <Col span={7}>
            <label>Current Grade</label>
            <Input placeholder="Enter current grade here..." size="large" />
          </Col>
          <Col span={7}>
            <label>Country</label>
            <Select
              size="large"
              showArrow
              placeholder="Select country from here..."
              showSearch={false}
            >
              <Option value="pk">Pakistan</Option>
              <Option value="ca">Canada</Option>
            </Select>
          </Col>
          <Col span={7}>
            <label>Current Function</label>
            <Select
              size="large"
              showArrow
              placeholder="Select current function name from here..."
              showSearch={false}
            >
              <Option value="pk">func-1</Option>
              <Option value="ca">func-2</Option>
            </Select>
          </Col>
        </Row>
        <Row justify="space-between" className="mb-32">
          <Col span={7}>
            <label>Location</label>
            <Select
              size="large"
              showArrow
              placeholder="Select location from here..."
              showSearch={false}
            >
              <Option value="khi">Khi</Option>
              <Option value="isl">Islamabad</Option>
            </Select>
          </Col>
          <Col span={7}>
            <label>Current Sub-Function</label>
            <Select
              size="large"
              showArrow
              placeholder="Select current sub-function from here..."
              showSearch={false}
            >
              <Option value="pk">Pakistan</Option>
              <Option value="ca">Canada</Option>
            </Select>
          </Col>
          <Col span={7}>
            <label>Business Title</label>
            <Input size="large" placeholder="Enter business title here..." />
          </Col>
        </Row>
        <Row justify="space-between" className="mb-32">
          <Col span={7}>
            <label>Current Business Unit</label>
            <Select
              size="large"
              showArrow
              placeholder="Select business unit from here..."
              showSearch={false}
            >
              <Option value="usd">Business unit 1</Option>
              <Option value="pkr">Business unit 2</Option>
            </Select>
          </Col>
          <Col span={7}>
            <label>Current Currency</label>
            <Select
              size="large"
              showArrow
              placeholder="Select current currency from here..."
              showSearch={false}
            >
              <Option value="usd">USD</Option>
              <Option value="pkr">PKR</Option>
            </Select>
          </Col>
          <Col span={7}>
            <label>Industry</label>
            <Select
              size="large"
              showArrow
              placeholder="Select industry from here..."
              showSearch={false}
            >
              <Option value="usd">Industry 1</Option>
              <Option value="pkr">Industry 2</Option>
            </Select>
          </Col>
        </Row>

        <Row justify="space-between" className="mb-32">
          <Col span={7}>
            <label>Sub-Industry</label>
            <Select
              size="large"
              showArrow
              placeholder="Select sub-industry from here..."
              showSearch={false}
            >
              <Option value="usd">Sub-Industry 1</Option>
              <Option value="pkr">Sub-Industry 2</Option>
            </Select>
          </Col>

          <Col span={7}>
            <label>Sector</label>
            <Select
              size="large"
              showArrow
              placeholder="Select sector from here..."
              showSearch={false}
            >
              <Option value="usd">Sector 1</Option>
              <Option value="pkr">Sector 2</Option>
            </Select>
          </Col>
          <Col span={7}>
            <label>Total Experience</label>
            <Input size="large" placeholder="Enter total experience here..." />
          </Col>
        </Row>
        <Row justify="space-between" className="mb-32">
          <Col span={7}>
            <label>Relevant Experience</label>
            <Input
              size="large"
              placeholder="Enter relevant experience here..."
            />
          </Col>
          <Col span={7}>
            <label>Critical Skills</label>
            <Input size="large" placeholder="Enter critical skills here..." />
          </Col>
          <Col span={7}>
            <label>Referral</label>
            <Input size="large" placeholder="Enter referral here..." />
          </Col>
        </Row>
        <Row className="offers__form__fields__btns">
          <Button
            onClick={() => setStep(prev => prev + 1)}
            size="large"
            type="primary"
          >
            Next
          </Button>
          <Button size="large" className="secondary-btn">
            Cancel
          </Button>
        </Row>
      </div>
    </>
  );
};

export default CandidateDetails;
