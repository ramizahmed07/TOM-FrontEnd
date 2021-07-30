import React from "react";
import { Col, Row, Tabs } from "antd";

import "./style.less";
import Layout from "@/components/Layout";
import CompanyDetails from "./company-details/company-details";

const CompanyProfile = () => {
  const { TabPane } = Tabs;
  return (
    <>
      <Layout>
        <Row>
          <Col span={24}>
            <h1 className="page__heading">Company details</h1>
            <Tabs defaultActiveKey="1" type="card">
              <TabPane tab="Company details" key="1">
                <CompanyDetails />
              </TabPane>
              <TabPane tab="Business units" key="2">
                Business units
              </TabPane>
              <TabPane tab="Regions" key="3">
                Regions
              </TabPane>
              <TabPane tab="Legal entities" key="4">
                Legal entities
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </Layout>
    </>
  );
};

export default CompanyProfile;
