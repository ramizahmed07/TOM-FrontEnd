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
    path: Paths.Users.companies.profile.business_units.regions,
  });

  return (
    <div className="companyProfile">
      {match ? null : (
        <>
          <Row>
            <Col span={24}>
              <div className="main-heading mb-16">Company details</div>
            </Col>
          </Row>
          <Tabs />
        </>
      )}

      <div className="companyProfile__content">
        <Routes routes={routes} />
      </div>
    </div>
  );
};

export default CompanyProfile;
