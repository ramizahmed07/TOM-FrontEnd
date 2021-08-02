import { Button, Col, Row } from "antd";
import { NavLink } from "react-router-dom";

import "./companyProfile.less";
import UnileverLogo from "@assets/images/unilever-logo.png";
import { COMPANY_DETAILS, CONTACT_INFO, TABS } from "./config";

const CompanyProfile = () => {
  return (
    <div className="companyProfile">
      <Row>
        <Col span={24}>
          <div className="main-heading mb-16">Company details</div>
        </Col>
      </Row>
      <Row>
        {TABS.map(({ id, path, title }) => (
          <NavLink
            className="companyProfile__tab"
            activeClassName="tab--active"
            key={id}
            to={path}
          >
            {title}
          </NavLink>
        ))}
      </Row>
      <div className="companyProfile__content">
        <Row className="companyProfile__content__header">
          <div className="companyProfile__content__header__leftCol">
            <img src={UnileverLogo} alt="Unilever Logo" />
            <div className="companyProfile__content__header__leftCol__info">
              <div className="main-heading">UNILEVER</div>
              <div className="main-heading">United States of America</div>
              <p>74 Elizabeth Drive Ridgewood, NJ </p>
            </div>
          </div>

          <Button type="primary">Edit Company Details</Button>
        </Row>
        <Row className="companyProfile__content__row">
          <Col span={24}>
            <div className="sub-heading">Company details</div>
          </Col>
          {Object.keys(COMPANY_DETAILS).map((key: string) => (
            <div key={key}>
              <div className="companyProfile__content__row__field">
                <div className="companyProfile__content__row__field__key">
                  {key}
                </div>
                <div className="companyProfile__content__row__field__value">
                  {COMPANY_DETAILS[key]}
                </div>
              </div>
            </div>
          ))}
        </Row>
        <Row className="companyProfile__content__row">
          <Col span={24}>
            <div className="sub-heading">Contact Person</div>
          </Col>
          {Object.keys(CONTACT_INFO).map((key: string) => (
            <div key={key}>
              <div className="companyProfile__content__row__field">
                <div className="companyProfile__content__row__field__key">
                  {key}
                </div>
                <div className="companyProfile__content__row__field__value">
                  {CONTACT_INFO[key]}
                </div>
              </div>
            </div>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default CompanyProfile;
