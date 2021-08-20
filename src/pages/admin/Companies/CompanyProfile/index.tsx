import { Col, Row } from "antd";
import { FC } from "react";
import { Route, Switch } from "react-router-dom";

import "./companyProfile.less";
import Tabs from "./Tabs";
import BusinessUnits from "./BusinessUnits";
import CompanyDetails from "./CompanyDetails";
import { IRoute, Routes } from "@router";

interface ICompanyProfile {
  routes: IRoute[];
}

const CompanyProfile: FC<ICompanyProfile> = ({ routes }) => {
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

        <Routes routes={routes} />
      </div>
    </div>
  );
};

export default CompanyProfile;
