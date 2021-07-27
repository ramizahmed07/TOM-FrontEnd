import { Col, Row, Typography } from "antd";
import { AddBtn, DownloadBtn, UploadBtn } from "../Buttons";

const JobFunction = () => {
  return (
    <>
      <Row>
        <Col span={24}>
          <Typography.Paragraph className="settings__title">
            Job Function & Sub-Function
          </Typography.Paragraph>
        </Col>
      </Row>
      <Row>
        <Col className="settings__parent__col" span={16}>
          <UploadBtn
            text="Upload Job Functions"
            callback={() => console.log("upload job function")}
          />
          <DownloadBtn
            text="Download Job Functions"
            callback={() => console.log("Download Job Functions")}
          />
        </Col>
        <Col className="settings__parent__col--last" span={8}>
          <AddBtn text="Add New Job" callback={() => console.log("Clicked")} />
        </Col>
      </Row>
    </>
  );
};

export default JobFunction;
