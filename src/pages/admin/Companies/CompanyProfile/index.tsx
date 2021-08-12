import { Col, Row } from "antd";

import "./companyProfile.less";
import Tabs from "./Tabs";

import BusinessUnits from "./BusinessUnits";
import CompanyDetails from "./CompanyDetails";
import { Route, Switch } from "react-router-dom";

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
        {/**
         * @TODO Add proper routes, Ramiz
         */}

        <Switch>
          <Route exact path="/profile/details">
            <CompanyDetails />
          </Route>
          <Route exact path="/profile/business-units">
            <BusinessUnits />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default CompanyProfile;
