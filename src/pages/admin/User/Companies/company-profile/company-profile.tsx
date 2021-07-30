import React from "react";
import { Col, Row, Tabs } from "antd";

import Layout from "@/components/Layout";

const CompanyProfile = () => {
  const { TabPane } = Tabs;
  return (
    <>
      <Layout>
        <Row>
          <Col span={24}>
            <h1 className="page__heading">Companies Profile</h1>
            <Tabs defaultActiveKey="1">
              <TabPane tab="Company details" key="1">
                Content of Tab Pane 1
              </TabPane>
              <TabPane tab="Business units" key="2">
                Content of Tab Pane 2
              </TabPane>
              <TabPane tab="Regions" key="3">
                Content of Tab Pane 3
              </TabPane>
              <TabPane tab="Legal entities" key="3">
                Content of Legal entities
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </Layout>
    </>
  );
};

export default CompanyProfile;
