import { Button, Col, Input, message, Row } from "antd";
import { useRef, useState, FC } from "react";
import Checkbox from "antd/lib/checkbox/Checkbox";

import Modal from "@components/Modal";
import { IModal } from "@/types";
import { showSuccessPopup, validateFile } from "@utils";

const UploadShortTermIP: FC<IModal> = ({ isVisible, setIsVisible }) => {
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<any>(null);

  const uploadFile = (event: any) => {
    var file = event?.target?.files[0];
    if (validateFile(file?.type)) {
      console.log("file", file.type);
      setFile(file);
    } else {
      message.error("Only CVS and XLS file types are supported");
    }
  };

  const handleSubmit = () => {
    setIsVisible(false);
    showSuccessPopup({
      title: "Short Term Incentive Data Uploaded",
      desc: "You have successfully uploaded short term incentive data.",
      role: "client",
    });
  };

  return (
    <Modal
      footer={[
        <Button onClick={handleSubmit} key="1" type="primary">
          Upload
        </Button>,
        <Button onClick={() => setIsVisible(false)} key="2">
          Cancel
        </Button>,
      ]}
      title="Upload STI Plan"
      isVisible={isVisible}
    >
      <>
        <Row justify="space-between" className="modal__row">
          <Col className="uploadSalaryRange__uploadField" span={11}>
            <label>Upload File</label>
            <Input
              size="large"
              name="name"
              readOnly
              accept=".csv, application/vnd.ms-excel"
              value={file?.name || ""}
              placeholder="CVS and XLS are supported"
            />
            <Button
              className="uploadSalaryRange__uploadField__btn"
              type="primary"
              onClick={() => inputRef?.current?.click()}
            >
              Upload
            </Button>
            <input
              id="myInput"
              type="file"
              ref={inputRef}
              hidden={true}
              onChange={uploadFile}
            />
          </Col>
        </Row>
        <Row className="mb-20">
          <Checkbox>Active</Checkbox>
        </Row>
      </>
    </Modal>
  );
};

export default UploadShortTermIP;
