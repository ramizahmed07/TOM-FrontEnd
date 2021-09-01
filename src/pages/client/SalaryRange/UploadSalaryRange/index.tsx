import { Button, Col, DatePicker, Input, message, Row } from "antd";
import { FC, useRef, useState } from "react";
import moment from "moment";

import "./uploadSalaryRange.less";
import Modal from "@components/Modal";
import { IModal } from "@/types";
import { disabledDates, showSuccessPopup, validateFile } from "@utils";

interface IUploadSalaryRange extends IModal {}

const UploadSalaryRange: FC<IUploadSalaryRange> = ({
  isVisible,
  setIsVisible,
}) => {
  const inputRef = useRef<any>(null);
  const [file, setFile] = useState<File | null>(null);
  const [duration, setDuration] = useState<any>({ start: null, end: null });
  const [isDisabled, setIsDisabled] = useState(true);

  const uploadFile = (event: any) => {
    var file = event?.target?.files[0];
    if (validateFile(file?.type)) {
      console.log("file", file.type);
      setFile(file);
    } else {
      message.error("Only CVS and XLS file types are supported");
    }
  };

  const disabledDate = (current: any) =>
    disabledDates(current, moment(duration["start"]).endOf("day"));

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
        <Button
          onClick={handleSubmit}
          disabled={!file || !duration["start"] || !duration["end"]}
          key="1"
          type="primary"
        >
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
        <Row className="modal__row">
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
        <div className="sub-heading mb-32">Choose Salary Range Duration</div>
        <Row className="modal__row">
          <Col className="uploadSalaryRange__col" span={15}>
            {/* <label>Name</label> */}
            <DatePicker
              className="uploadSalaryRange__datepicker"
              onChange={e => {
                setDuration((prev: any) => ({ ...prev, start: e }));
                setIsDisabled(false);
              }}
              placeholder="Starting Date (DD/MM/YY)"
            />
            <span className="uploadSalaryRange__separator">-</span>
            <DatePicker
              className="uploadSalaryRange__datepicker"
              disabled={isDisabled}
              disabledDate={disabledDate}
              onChange={e => {
                setDuration((prev: any) => ({ ...prev, end: e }));
                setIsDisabled(false);
              }}
              placeholder="Starting Date (DD/MM/YY)"
            />
          </Col>
        </Row>
      </>
    </Modal>
  );
};
export default UploadSalaryRange;
