import { Button, Col, DatePicker, Input, Row, Select } from "antd";
import Checkbox from "antd/lib/checkbox/Checkbox";
import TextArea from "antd/lib/input/TextArea";
import { FC } from "react";

const { Option } = Select;

const OfferedPositionDetails: FC<{
  setStep: React.Dispatch<React.SetStateAction<number>>;
}> = ({ setStep }) => {
  return (
    <>
      <Row className="offers__form__header">
        <div className="sub-heading">Offered Position Details</div>
      </Row>
      <div className="offers__form__fields">
        <Row justify="space-between" className="mb-32">
          <Col span={7}>
            <label>Candidate Type</label>
            <Select
              size="large"
              showArrow
              placeholder="Select candidate type from here..."
              showSearch={false}
            >
              <Option value={1}>Type 1</Option>
            </Select>
          </Col>
          <Col span={7}>
            <label>Select Job Function</label>
            <Select
              size="large"
              showArrow
              placeholder="Select job function type from here..."
              showSearch={false}
            >
              <Option value={1}>Job Function 1</Option>
            </Select>
          </Col>
          <Col span={7}>
            <label>Business Unit</label>
            <Select
              size="large"
              showArrow
              placeholder="Select business unit from here..."
              showSearch={false}
            >
              <Option value={1}>Business Unit 1</Option>
            </Select>
          </Col>
        </Row>
        <Row justify="space-between" className="mb-32">
          <Col span={7}>
            <label>Region</label>
            <Select
              size="large"
              showArrow
              placeholder="Select region from here..."
              showSearch={false}
            >
              <Option value={1}>region 1</Option>
            </Select>
          </Col>
          <Col span={7}>
            <label>Country</label>
            <Select
              size="large"
              showArrow
              placeholder="Select country from here..."
              showSearch={false}
            >
              <Option value={1}>Country 1</Option>
            </Select>
          </Col>
          <Col span={7}>
            <label>Grade</label>
            <Select
              size="large"
              showArrow
              placeholder="Select grade from here..."
              showSearch={false}
            >
              <Option value={1}>Grade 1</Option>
            </Select>
          </Col>
        </Row>
        <Row>
          <Col span={7}>
            <label>Proposed Joining Date</label>
            <DatePicker
              size="large"
              className="offers__form__fields__picker"
              placeholder="Starting Date (DD/MM/YY)"
            />
          </Col>
        </Row>
      </div>
      <div className="offers__form__fields">
        <div className="sub-heading">Other Details</div>
        <Row justify="space-between" className="mt-24 mb-24">
          <Col span={7}>
            <label>Job Title</label>
            <Input size="large" placeholder="Enter job title here..." />
          </Col>
          <Col span={7}>
            <label>Position Owner</label>
            <Input size="large" placeholder="Enter position owner here..." />
          </Col>
          <Col span={7}>
            <label>Job Grade Type</label>
            <Select
              size="large"
              showArrow
              placeholder="Select grade type from here..."
              showSearch={false}
            >
              <Option value={1}>Grade Type 1</Option>
            </Select>
          </Col>
        </Row>

        <Row justify="space-between" className="mb-24">
          <Col span={7}>
            <label>Date Created (From system)</label>
            <DatePicker
              size="large"
              className="offers__form__fields__picker"
              placeholder="Starting Date (DD/MM/YY)"
            />
          </Col>
          <Col span={7}>
            <label>Reporting to Grade</label>
            <Select
              size="large"
              showArrow
              placeholder="Select reporting grade from here..."
              showSearch={false}
            >
              <Option value={1}>Reporting 1</Option>
            </Select>
          </Col>
          <Col span={7}>
            <label>Cost Centre</label>
            <Input size="large" placeholder="Enter cost here..." />
            <br />
            <Checkbox className="offers__form__fields__checkbox mt-24">
              Critical Role?
            </Checkbox>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <label>Position Comment</label>
            <TextArea rows={5} placeholder="Enter your comment here..." />
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

export default OfferedPositionDetails;
