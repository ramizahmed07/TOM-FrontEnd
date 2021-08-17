import React, { useState } from "react";
import {
  Col,
  Row,
  Button,
  Input,
  Form,
  Select,
  DatePicker,
  Upload,
  message,
} from "antd";
import { Option } from "antd/lib/mentions";
import { GoLocation } from "react-icons/go";
import CountryPhoneInput, { ConfigProvider } from "antd-country-phone-input";
import en from "world_countries_lists/data/en/world.json";
import moment from "moment";

import "./createCompany.less";
import ImgUpload from "@assets/images/img-upload.png";
import { generateArrayOfYears } from "@/utils";

function b64toBlob(dataURI: any) {
  var byteString = atob(dataURI.split(",")[1]);
  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);

  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: "image/jpeg" });
}

function getBase64(img: any, callback: any) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file: any) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must be smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
}

const CreateCompany = () => {
  const [form] = Form.useForm();
  const [stockTrackingIds, setStockTrackingIds] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<any>(null);
  const [endDate, setEndDate] = useState<any>(null);
  const [isDisabled, setIsDisabled] = useState(true);

  function disabledDate(current: any) {
    return (
      current &&
      current < moment(form.getFieldValue("contract_start_date")).endOf("day")
    );
  }

  const handleImage = (info: any) => {
    console.log("hjello", info.file.status);
    // if (info.file.status === 'uploading') {

    //   return;
    // }
    // Get this url from response in real world.
    getBase64(info.file.originFileObj, (imageUrl: string) => {
      const blob = b64toBlob(imageUrl);
      const blobUrl = URL.createObjectURL(blob);

      console.log("blob", blobUrl);
    });
  };

  const handleStockTrackingIds = () => {
    setStockTrackingIds((prev: string[]) => [
      ...prev,
      form.getFieldValue("stock_tracking_ids"),
    ]);
    message.success("Stock tracking id added!");
  };

  return (
    <>
      <Row>
        <Col span={24} className="container">
          <h1 className="form_heading">Create new company</h1>
          <Form
            form={form}
            name="login"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            initialValues={{ remember: true }}
            onFinish={values => {
              console.log("VALUES", values);
            }}
            layout="vertical"
            className="create__company__container"
          >
            <div className="basic__information_container">
              <h1 className="section__heading basic_information_section_heading">
                Basic information
              </h1>
              <div className="form__section">
                <div className="form__section_container">
                  <Form.Item
                    className="form__item"
                    label={<label className="input__label">Company name</label>}
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Please enter company name",
                      },
                    ]}
                  >
                    <Input
                      className="form__input"
                      type="text"
                      placeholder="Enter company name here..."
                    />
                  </Form.Item>
                  <Form.Item
                    className="form__item"
                    label={<label className="input__label">Address</label>}
                    name="address"
                    rules={[
                      { required: true, message: "Please enter address" },
                    ]}
                  >
                    <Input
                      className="form__input"
                      type="text"
                      placeholder="Enter company address here..."
                      suffix={
                        // <Tooltip title="Extra information">
                        <GoLocation style={{ color: "rgba(0,0,0,.45)" }} />
                        // </Tooltip>
                      }
                    />
                  </Form.Item>

                  <Form.Item
                    className="form__item"
                    label={<label className="input__label">Postal code</label>}
                    name="postal_code"
                    rules={[
                      { required: true, message: "Please enter postal code" },
                    ]}
                  >
                    <Input
                      className="form__input"
                      type="text"
                      placeholder="Enter postal code here..."
                    />
                  </Form.Item>
                </div>
                <div className="form__section_upload">
                  <div className="form__section_upload_container">
                    <Upload
                      onChange={handleImage}
                      beforeUpload={beforeUpload}
                      showUploadList={false}
                    >
                      <img src={ImgUpload} alt="avatar" />
                    </Upload>
                    <p className="img_description_text">UPLOAD LARGE LOGO</p>
                    <p className="img_description_size">1000 x 1000</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="corporate__information_container">
              <h1 className="section__heading">Corporate Information</h1>
              <div className="form__section">
                <div className="form__section_container">
                  <Form.Item
                    className="form__item"
                    label={
                      <label className="input__label">
                        Country Headquater{" "}
                      </label>
                    }
                    name="country_headquater"
                    rules={[
                      {
                        required: true,
                        message: "Please enter country headquater",
                      },
                    ]}
                  >
                    <Input
                      className="form__input"
                      type="text"
                      placeholder="Enter name of headquater"
                    />
                  </Form.Item>

                  <Form.Item
                    className="form__item"
                    label={
                      <label className="input__label">Base Currency</label>
                    }
                    name="base_currency"
                    rules={[
                      {
                        required: true,
                        message: "Please enter base currency",
                      },
                    ]}
                  >
                    <Select placeholder="Select base base currency">
                      <Option value="AED">AED</Option>
                      <Option value="GBB">GBB</Option>
                      <Option value="GBB">GBB</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    className="form__item "
                    label={
                      <label className="input__label">Financial Year</label>
                    }
                    name="financial_year"
                    rules={[
                      {
                        required: true,
                        message: "Please enter financial year",
                      },
                    ]}
                  >
                    <Select placeholder="Select base base currency">
                      {generateArrayOfYears(30)?.map((year: number) => (
                        <Option key={year.toString()} value={year.toString()}>
                          {year}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>

                  <Form.Item
                    className="form__item"
                    label={
                      <label className="input__label">Stock tracking ID</label>
                    }
                    name="stock_tracking_ids"
                  >
                    <div className="stock_tracking_id__container">
                      <Input
                        className="form__input"
                        type="text"
                        placeholder="Enter stock ID here..."
                      />
                      <Button
                        type="primary"
                        // htmlType="submit"
                        // disabled={false}
                        size="large"
                        onClick={handleStockTrackingIds}
                      >
                        +
                      </Button>
                    </div>
                  </Form.Item>
                </div>

                <div className="form__section_upload">
                  <div className="form__section_upload_container">
                    <Upload>
                      <img src={ImgUpload} alt="avatar" />
                    </Upload>
                    <p className="img_description_text">UPLOAD SMALL LOGO</p>
                    <p className="img_description_size">260 x 260</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="contract_details_container">
              <h1 className="section__heading">Contract Details</h1>
              <div className="form__section">
                <div className="form__section_container">
                  <label className="input__label">Contract Duration</label>
                  <div className="form__section__container__row">
                    <Form.Item
                      className="form__item"
                      name="contract_start_date"
                      rules={[
                        {
                          required: true,
                          message: "Please enter contract duration",
                        },
                      ]}
                    >
                      <div className="contract__details_year_container">
                        <DatePicker
                          className="datepicker__container"
                          onChange={e => {
                            form.setFieldsValue({
                              contract_start_date: e,
                            });
                            setIsDisabled(false);
                          }}
                          placeholder="Starting Date (DD/MM/YY)"
                        />
                      </div>
                    </Form.Item>
                    <Form.Item
                      className="form__item"
                      name="contract_end_date"
                      rules={[
                        {
                          required: true,
                          message: "Please enter contract duration",
                        },
                      ]}
                    >
                      <div className="contract__details_year_container">
                        <DatePicker
                          disabled={isDisabled}
                          disabledDate={disabledDate}
                          className="datepicker__container"
                          onChange={e =>
                            form.setFieldsValue({
                              contract_end_date: e,
                            })
                          }
                          placeholder="Ending Date (DD/MM/YY)"
                        />
                      </div>
                    </Form.Item>
                  </div>
                </div>
              </div>
            </div>

            <div className="contract_details_container">
              <h1 className="section__heading">Contact person details</h1>
              <div className="form__section">
                <div className="form__section_container">
                  <div className="contact__person__sub_container">
                    <Form.Item
                      className="form__item contact__person_item"
                      name="person_name"
                      label={
                        <label className="input__label">Contact person</label>
                      }
                      rules={[
                        {
                          required: true,
                          message: "Please enter contact person",
                        },
                      ]}
                    >
                      <Input
                        className="form__input"
                        type="text"
                        placeholder="Enter name of contact person..."
                      />
                    </Form.Item>

                    <Form.Item
                      className="form__item contact__person_item"
                      label={
                        <label className="input__label">
                          Contact person’s country
                        </label>
                      }
                      name="contact_person_country"
                      rules={[
                        {
                          required: true,
                          message: "Please select contact person country",
                        },
                      ]}
                    >
                      <Select placeholder="Select country from here...">
                        <Option value="pk">Pakistan</Option>
                        <Option value="uae">UAE</Option>
                        <Option value="china">China</Option>
                      </Select>
                    </Form.Item>
                  </div>

                  <div className="contact__person__sub_container">
                    <Form.Item
                      className="form__item contact__person_item "
                      label={
                        <label className="input__label">Contact number</label>
                      }
                      name="person_number"
                      rules={[
                        {
                          required: true,
                          message: "Please enter contact number",
                        },
                      ]}
                    >
                      <ConfigProvider locale={en}>
                        <CountryPhoneInput
                          onChange={e => {
                            form.setFieldsValue({ person_number: e });
                          }}
                          value={{
                            short: "us",
                          }}
                        />
                      </ConfigProvider>
                    </Form.Item>

                    <Form.Item
                      className="form__item contact__person_item"
                      label={
                        <label className="input__label">Email address</label>
                      }
                      name="person_email"
                      rules={[
                        {
                          required: true,
                          message: "Please enter email address",
                        },
                      ]}
                    >
                      <Input
                        className="form__input"
                        type="text"
                        placeholder="Enter email address here..."
                      />
                    </Form.Item>
                  </div>
                </div>
              </div>
            </div>

            <div className="form__submit__section">
              <Form.Item wrapperCol={{ span: 24 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={false}
                  size="large"
                >
                  Create Company
                </Button>
              </Form.Item>

              <Form.Item wrapperCol={{ span: 24 }}>
                <Button className="login__btn" size="large">
                  Cancel
                </Button>
              </Form.Item>
            </div>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default CreateCompany;
