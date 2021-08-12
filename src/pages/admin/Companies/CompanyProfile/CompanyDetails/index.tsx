import { Button, Col, Row } from "antd";

import "./companyDetails.less";
import UnileverLogo from "@assets/images/unilever-logo.png";
import { COMPANY_DETAILS, CONTACT_INFO } from "./config";

const CompanyDetails = () => {
  return (
    <div className="companyDetails">
      <Row className="companyDetails__header">
        <div className="companyDetails__header__leftCol">
          <img src={UnileverLogo} alt="Unilever Logo" />
          <div className="companyDetails__header__leftCol__info">
            <div className="main-heading">UNILEVER</div>
            <div className="main-heading">United States of America</div>
            <p>74 Elizabeth Drive Ridgewood, NJ </p>
          </div>
        </div>

        <Button type="primary">Edit Company Details</Button>
      </Row>
      <Row className="companyDetails__row">
        <Col span={24}>
          <div className="sub-heading">Company details</div>
        </Col>
        {Object.keys(COMPANY_DETAILS).map((key: string) => (
          <div key={key}>
            <div className="companyDetails__row__field">
              <div className="companyDetails__row__field__key">{key}</div>
              <div className="companyDetails__row__field__value">
                {COMPANY_DETAILS[key]}
              </div>
            </div>
          </div>
        ))}
      </Row>
      <Row className="companyDetails__row">
        <Col span={24} className="companyDetails__row__col">
          <div className="sub-heading">Contact Person</div>
          <Button type="primary">Edit Details</Button>
        </Col>
        {Object.keys(CONTACT_INFO).map((key: string) => (
          <div key={key}>
            <div className="companyDetails__row__field">
              <div className="companyDetails__row__field__key">{key}</div>
              <div className="companyDetails__row__field__value">
                {CONTACT_INFO[key]}
              </div>
            </div>
          </div>
        ))}
      </Row>
    </div>
  );
};

export default CompanyDetails;
