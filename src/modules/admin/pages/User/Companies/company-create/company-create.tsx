import React from "react";
import Layout from "@/components/Layout";
import {
  Col,
  Row,
  Table,
  Dropdown,
  Menu,
  TableColumnsType,
  Switch,
  Tag,
  Button,
  Input,
  Form,
  Select,
  DatePicker,
  Upload,
} from "antd";
import { Option } from "antd/lib/mentions";
import { UploadOutlined } from "@ant-design/icons";
import "./style.less";

import ImgUpload from "@assets/images/img-upload.png";

const CompanyCreate = () => {
  return (
    <>
      <Layout>
        <Row>
          <Col span={24} className="container">
            <h1>Create new company</h1>
            <Form
              name="login"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              initialValues={{ remember: true }}
              onFinish={() => {}}
              layout="vertical"
              className="create__company__container"
            >
              <div className="basic__information_container">
                <h1 className="section__heading">Basic information</h1>
                <div className="form__section">
                  <div className="form__section_container">
                    <Form.Item
                      className="form__item"
                      label={
                        <label className="input__label">Company name</label>
                      }
                      name="company_name"
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
                      label={<label className="input__label">Location</label>}
                      name="location"
                      rules={[
                        { required: true, message: "Please enter location" },
                      ]}
                    >
                      <Select>
                        <Option value="khi">Karachi</Option>
                        <Option value="lhr">Lahore</Option>
                        <Option value="isl">Islamabad</Option>
                      </Select>
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
                      />
                    </Form.Item>

                    <Form.Item
                      className="form__item"
                      label={
                        <label className="input__label">Postal code</label>
                      }
                      name="address"
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
                    <Upload>
                      <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
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
                      <Select>
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
                      <div className="financial_year_container">
                        <DatePicker
                          className="datepicker__container"
                          onChange={() => console.log("Start Date")}
                          placeholder="Starting Date (DD/MM/YY)"
                        />
                        {" - "}
                        <DatePicker
                          className="datepicker__container"
                          onChange={() => console.log("Start Date")}
                          placeholder="Starting Date (DD/MM/YY)"
                        />
                      </div>
                    </Form.Item>

                    <Form.Item
                      className="form__item"
                      label={
                        <label className="input__label">
                          Stock tracking ID
                        </label>
                      }
                      name="stock_tracking_id"
                      rules={[
                        {
                          required: true,
                          message: "Please enter stock tracking id",
                        },
                      ]}
                    >
                      <Input
                        className="form__input"
                        type="text"
                        placeholder="Enter stock ID here..."
                      />
                    </Form.Item>
                  </div>

                  <div className="form__section_upload">
                    <div className="form__section_upload_container">
                      <Upload>
                        <img src={ImgUpload} alt="avatar" />
                      </Upload>
                      <p className='img_description_text'>UPLOAD LARGE LOGO</p>
                      <p className='img_description_size'>1000 x 1000</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="contact_details_container">
                <h1 className="section__heading">Contract Details</h1>
                <div className="form__section">
                  <div className="form__section_container">
                    <Form.Item
                      className="form__item"
                      label={
                        <label className="input__label">
                          Contract Duration
                        </label>
                      }
                      name="contract_duration"
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
                          onChange={() => console.log("Start Date")}
                          placeholder="Starting Date (DD/MM/YY)"
                        />
                        {" - "}
                        <DatePicker
                          className="datepicker__container"
                          onChange={() => console.log("Start Date")}
                          placeholder="Starting Date (DD/MM/YY)"
                        />
                      </div>
                    </Form.Item>
                  </div>
                </div>
              </div>

              <Form.Item wrapperCol={{ span: 24 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login__btn"
                  size="large"
                  onClick={() => {
                    console.log("Create Company");
                  }}
                >
                  Create Company
                </Button>
              </Form.Item>
            </Form>
            {/* </div> */}
          </Col>
        </Row>
      </Layout>
    </>
  );
};

export default CompanyCreate;
