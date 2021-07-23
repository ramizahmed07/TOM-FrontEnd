import { Button, Col, Row, Select } from "antd";
import { Dispatch, FC, SetStateAction, useState } from "react";

import "./addSector.less";
import Modal from "@/components/Modal";
import { INDUSTRIES, Sector, SECTORS } from "./config";
import { showSuccessPopup } from "@/utils";

const { Option } = Select;

interface AddSectorProps {
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
}

const AddSector: FC<AddSectorProps> = ({ isVisible, setIsVisible }) => {
  const [sector, setSector] = useState<undefined | string>(undefined);
  const [industries, setIndustries] = useState<any>(undefined);

  function onChange(value: string) {
    if (value === "button") return;
    setSector(value);
  }

  function handleChange(value: string) {
    if (value[value.length - 1] === "button") return;
    console.log({ value });
    setIndustries(value);
  }

  const addSector = () => {
    setIsVisible(false);
    showSuccessPopup({
      title: "New Sector Created",
      desc: "You have successfully created new sector.",
    });
    // setIsPopup(true);
    // info();
  };
  // function onBlur() {
  //   console.log("blur");
  // }

  // function onFocus() {
  //   console.log("focus");
  // }

  return (
    <>
      {/* <SuccessPopup
        isVisible={isPopup}
        setIsVisible={setIsPopup}
        title="New Sector Created"
        desc="You have successfully created new sector."
      /> */}

      <Modal
        footer={[
          <Button
            onClick={addSector}
            disabled={!sector || !industries?.length}
            key="1"
            type="primary"
          >
            Add Sector
          </Button>,
          <Button onClick={() => setIsVisible(false)} key="2">
            Cancel
          </Button>,
        ]}
        title="Create a Sector"
        isVisible={isVisible}
      >
        <>
          <Row className="addSector__row">
            <Col span={12}>
              <label>Select a sector</label>
              <Select
                value={sector}
                size="large"
                className="addSector__dropdown"
                placeholder="Select sector from here..."
                onChange={onChange}
                // onFocus={onFocus}
                // onBlur={onBlur}
              >
                {SECTORS.map(({ title, id, value }: Sector) => (
                  <Option
                    key={id}
                    className="addSector__dropdown__option"
                    value={value}
                  >
                    {title}
                  </Option>
                ))}
                <Option value="button">
                  <div
                    className="addSector__dropdown__option addSector__dropdown__option--btn"
                    onMouseDown={() => console.log("Add new industry")}
                  >
                    Add new industry
                  </div>
                </Option>
              </Select>
            </Col>
          </Row>
          <div className="addSector__title">Choose Industry</div>
          <Row className="addSector__row">
            <Col span={12}>
              <label>Select industry</label>
              <Select
                value={industries}
                size="large"
                showArrow
                className="addSector__dropdown"
                mode="multiple"
                placeholder="Select industry from here..."
                showSearch={false}
                // defaultValue={["a10", "c12"]}
                onChange={handleChange}
              >
                {INDUSTRIES.map(({ title, id, value }: Sector) => (
                  <Option
                    key={id}
                    className="addSector__dropdown__option"
                    value={value}
                  >
                    {title}
                  </Option>
                ))}
                <Option value="button">
                  <div
                    className="addSector__dropdown__option addSector__dropdown__option--btn"
                    onMouseDown={() => console.log("Add new industry")}
                  >
                    Add new industry
                  </div>
                </Option>
              </Select>
            </Col>
          </Row>
        </>
      </Modal>
    </>
  );
};

export default AddSector;
