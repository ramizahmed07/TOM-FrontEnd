import { Col, Row } from "antd";
import { FC } from "react";

import "./companyProfile.less";
import Tabs from "./Tabs";
import { IRoute, Paths, Routes } from "@router";
import { matchPath } from "react-router-dom";

interface ICompanyProfile {
  routes: IRoute[];
}

const CompanyProfile: FC<ICompanyProfile> = ({ routes }) => {
  const match = matchPath(window.location.pathname, {
    path: Paths.Users.companies.profile.business_unit,
  });

  return (
    <div className="companyProfile">
      <Row>
        <Col span={24}>
          <div className="main-heading mb-16">Company details</div>
        </Col>
      </Row>
      {match ? null : <Tabs />}
      <div className="companyProfile__content">
        <Routes routes={routes} />
      </div>
    </div>
  );
};

export default CompanyProfile;
