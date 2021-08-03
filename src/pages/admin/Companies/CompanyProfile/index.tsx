import { Col, Row } from "antd";

import "./companyProfile.less";
import Tabs from "./Tabs";

import CompanyDetails from "./CompanyDetails";
import BusinessUnits from "./BusinessUnits";

const CompanyProfile = () => {
  return (
    <div className="companyProfile">
      <Row>
        <Col span={24}>
          <div className="main-heading mb-16">Company details</div>
        </Col>
      </Row>
      <Tabs />
      <div className="companyProfile__content">
        {/* <CompanyDetails /> */}
        <BusinessUnits />
      </div>
    </div>
  );
};

export default CompanyProfile;
