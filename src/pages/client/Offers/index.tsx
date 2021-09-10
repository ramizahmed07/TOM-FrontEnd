import { useHistory } from "react-router-dom";
import { Col, Row } from "antd";

import Button from "@components/Button";
import Table from "@components/Table";
import { data, columns } from "./config";
import { paths } from "@router";

const Offers = () => {
  const history = useHistory();
  return (
    <>
      <Row>
        <Col span={24}>
          <div className="main-heading">Offers</div>
        </Col>
      </Row>
      <Row className="mt-16 mb-20">
        <Col className="align-start" span={16}>
          <Button
            onClick={() => history.push(paths.client.offers.create)}
            variant="upload_client"
          >
            Create Offer
          </Button>
        </Col>
      </Row>
      <Row>
        <Table data={data} columns={columns} scroll={1300} pagination={false} />
      </Row>
    </>
  );
};

export default Offers;
