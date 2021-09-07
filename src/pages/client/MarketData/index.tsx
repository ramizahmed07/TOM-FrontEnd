import { Col, Row } from "antd";

import Button from "@components/Button";

const MarketData = () => {
  return (
    <>
      <Row>
        <Col span={24}>
          <div className="main-heading">Market Data</div>
        </Col>
      </Row>
      <Row className="mt-16 mb-20">
        <Col className="align-start" span={16}>
          <Button variant="upload_client">Upload</Button>
          <Button variant="download_client">Download</Button>
        </Col>
      </Row>
    </>
  );
};

export default MarketData;
