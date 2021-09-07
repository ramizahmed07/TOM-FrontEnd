import { Button, Col, Input, message, Row } from "antd";
import Checkbox from "antd/lib/checkbox/Checkbox";
import { FC, useRef, useState } from "react";

import "./uploadSalaryRange.less";
import Modal from "@components/Modal";
import { IModal } from "@/types";
import { showSuccessPopup, validateFile } from "@utils";

interface IUploadSalaryRange extends IModal {}

const UploadSalaryRange: FC<IUploadSalaryRange> = ({
  isVisible,
  setIsVisible,
}) => {
  const inputRef = useRef<any>(null);
  const [file, setFile] = useState<File | null>(null);

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
      title: "New Salary Range Uploaded Successfully",
      desc: "You have successfully added new salary grade",
      role: "client",
    });
  };

  return (
    <Modal
      footer={[
        <Button onClick={handleSubmit} disabled={!file} key="1" type="primary">
          Upload
        </Button>,
        <Button onClick={() => setIsVisible(false)} key="2">
          Cancel
        </Button>,
      ]}
      title="Upload Salary Range"
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
export default UploadSalaryRange;
