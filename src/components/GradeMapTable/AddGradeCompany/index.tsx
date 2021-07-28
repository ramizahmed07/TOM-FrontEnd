import { Col, Row, Typography } from "antd";

import "./addGradeCompany.less";

const AddGradeCompany = () => {
  return (
    <>
      <Row>
        <Col span={24}>
          <Typography.Paragraph className="settings__title">
            Add new company
          </Typography.Paragraph>
        </Col>
      </Row>
      <div className="addGradeCompany">
        <Row className="addGradeCompany__header">
          <div className="create__title">Basic information</div>
        </Row>
      </div>
    </>
  );
};

export default AddGradeCompany;
