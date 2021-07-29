import { Col, Row, Typography } from "antd";

import "./addGradeCompany.less";

const AddGradeCompany = () => {
  return (
    <>
      <Row>
        <Col span={24}>
          <div className="main-heading mb-16">Add new company</div>
        </Col>
      </Row>
      <div className="addGradeCompany">
        <Row className="addGradeCompany__header">
          <div className="create__title">Basic information</div>
        </Row>
        <Row></Row>
      </div>
    </>
  );
};

export default AddGradeCompany;
