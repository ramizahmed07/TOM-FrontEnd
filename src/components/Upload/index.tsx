import { Button, Col, Input, message, Row } from "antd";
import Checkbox from "antd/lib/checkbox/Checkbox";
import { FC, useRef } from "react";

import "./uploadSalaryRange.less";
import Modal from "@components/Modal";
import { IModal } from "@types";
import { validateFile } from "@utils";

interface IUpload extends IModal {
  onSubmit: any;
  file: { file: File | null; active: boolean };
  setFile: React.Dispatch<
    React.SetStateAction<{
      file: null;
      active: boolean;
    }>
  >;
}

const Upload: FC<IUpload> = ({
  isVisible,
  setIsVisible,
  onSubmit,
  file,
  setFile,
}) => {
  const inputRef = useRef<any>(null);

  const uploadFile = (event: any) => {
    var file = event?.target?.files[0];
    if (validateFile(file?.type)) {
      setFile(prev => ({ ...prev, file }));
    } else {
      message.error("Only CVS and XLS file types are supported");
    }
  };

  return (
    <Modal
      width={544}
      footer={[
        <Button
          onClick={onSubmit}
          disabled={!file?.file}
          key="1"
          type="primary"
        >
          Upload
        </Button>,
        <Button onClick={() => setIsVisible(false)} key="2">
          Cancel
        </Button>,
      ]}
      title="Upload Job Grade"
      isVisible={isVisible}
    >
      <>
        <Row justify="space-between" className="modal__row">
          <Col className="uploadSalaryRange__uploadField" span={24}>
            <label>Upload File</label>
            <Input
              size="large"
              name="name"
              readOnly
              accept=".csv, application/vnd.ms-excel"
              value={file?.file?.name || ""}
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
          <Checkbox
            checked={file?.active}
            onChange={event =>
              setFile(prev => ({ ...prev, active: event.target.checked }))
            }
          >
            Active
          </Checkbox>
        </Row>
      </>
    </Modal>
  );
};
export default Upload;
